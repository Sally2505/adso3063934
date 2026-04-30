const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database');
const auth = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret';
const PORT = 3000;

const resources = {
    characters: {
        singular: 'character',
        columns: ['name', 'real_name', 'age', 'role', 'ability', 'alignment', 'enemy_of', 'city', 'team'],
        required: ['name']
    },
    cities: {
        singular: 'city',
        columns: ['name', 'country', 'status'],
        required: ['name']
    },
    groups: {
        singular: 'group',
        columns: ['name', 'type', 'headquarters'],
        required: ['name']
    }
};

const getMissingFields = (body, fields) => fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');

const getValues = (body, columns) => columns.map((column) => body[column] ?? null);

const sendDbError = (res, err, message = 'Server error') => {
    if (err && err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Record already exists or required data is missing' });
    }

    return res.status(500).json({ error: message });
};

// Auth endpoints
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err) {
            if (err) return sendDbError(res, err, 'Could not register user');
            res.status(201).json({ message: 'User registered', id: this.lastID });
        }
    );
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) return sendDbError(res, err);
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Successfully logged in', token });
    });
});

Object.entries(resources).forEach(([table, config]) => {
    const fields = config.columns.join(', ');
    const placeholders = config.columns.map(() => '?').join(', ');
    const updateSet = config.columns.map((column) => `${column} = ?`).join(', ');

    app.get(`/${table}`, auth, (req, res) => {
        db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
            if (err) return sendDbError(res, err);
            res.json(rows);
        });
    });

    app.get(`/${table}/:id`, auth, (req, res) => {
        const { id } = req.params;

        db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
            if (err) return sendDbError(res, err);
            if (!row) return res.status(404).json({ error: `${config.singular} not found` });
            res.json(row);
        });
    });

    app.post(`/${table}`, auth, (req, res) => {
        const missingFields = getMissingFields(req.body, config.required);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        db.run(
            `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`,
            getValues(req.body, config.columns),
            function (err) {
                if (err) return sendDbError(res, err, `Could not add ${config.singular}`);
                res.status(201).json({ message: `${config.singular} added`, id: this.lastID });
            }
        );
    });

    app.put(`/${table}/:id`, auth, (req, res) => {
        const { id } = req.params;
        const missingFields = getMissingFields(req.body, config.required);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        db.run(
            `UPDATE ${table} SET ${updateSet} WHERE id = ?`,
            [...getValues(req.body, config.columns), id],
            function (err) {
                if (err) return sendDbError(res, err);
                if (this.changes === 0) return res.status(404).json({ error: `${config.singular} not found` });
                res.json({ message: `${config.singular} updated` });
            }
        );
    });

    app.delete(`/${table}/:id`, auth, (req, res) => {
        const { id } = req.params;

        db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function (err) {
            if (err) return sendDbError(res, err);
            if (this.changes === 0) return res.status(404).json({ error: `${config.singular} not found` });
            res.json({ message: `${config.singular} deleted` });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
