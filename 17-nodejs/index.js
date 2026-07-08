const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./database');
const auth = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname) || '.jpg';
        cb(null, `${file.fieldname}-${timestamp}${ext}`);
    }
});

const upload = multer({ storage });
app.use('/uploads', express.static(uploadsDir));

const SECRET_KEY = 'your_secret';
const PORT = 3000;

const resources = {
    characters: {
        singular: 'character',
        columns: ['photo_url', 'name', 'real_name', 'age', 'role', 'ability', 'alignment', 'enemy', 'city', 'team', 'history'],
        required: ['name'],
        uploadField: 'photo',
        imageColumn: 'photo_url'
    },
    cities: {
        singular: 'city',
        columns: ['photo_url', 'name', 'state', 'country', 'population_characters', 'population_count'],
        required: ['name'],
        uploadField: 'photo',
        imageColumn: 'photo_url'
    },
    teams: {
        singular: 'team',
        columns: ['image_url', 'name', 'type', 'headquarters', 'members'],
        required: ['name'],
        uploadField: 'image',
        imageColumn: 'image_url'
    }
};

const getMissingFields = (body, fields) => fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');

const normalizeValue = (value) => {
    if (Array.isArray(value) || (value && typeof value === 'object')) {
        return JSON.stringify(value);
    }

    return value ?? null;
};

const getValues = (body, columns) => columns.map((column) => normalizeValue(body[column]));

const publicUserColumns = 'id, username, name, email, phone';

const sendDbError = (res, err, message = 'Server error') => {
    if (err && err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Record already exists or required data is missing' });
    }

    return res.status(500).json({ error: message });
};

const apiRouter = express.Router();

app.get('/', (req, res) => {
    res.send('APIDOG backend is running. Use /api/register or /api/login');
});

// Auth endpoints
apiRouter.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'APIDOG API is running. Use POST /register or POST /login.' });
});

apiRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
        function (err) {
            if (err) return sendDbError(res, err, 'Could not register user');

            const token = jwt.sign({ id: this.lastID, email }, SECRET_KEY, { expiresIn: '1h' });
            res.status(201).json({ message: 'User registered', id: this.lastID, token });
        }
    );
});

apiRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return sendDbError(res, err);
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({
            message: 'Successfully logged in',
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    });
});

apiRouter.get('/me', auth, (req, res) => {
    db.get(`SELECT ${publicUserColumns} FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err) return sendDbError(res, err);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    });
});

apiRouter.put('/me', auth, (req, res) => {
    const columns = ['username', 'name', 'email', 'phone'];
    const updates = columns.filter((column) => req.body[column] !== undefined);

    if (updates.length === 0) {
        return res.status(400).json({ error: 'Send at least one field: username, name, email or phone' });
    }

    const updateSet = updates.map((column) => `${column} = ?`).join(', ');
    const values = updates.map((column) => req.body[column]);

    db.run(
        `UPDATE users SET ${updateSet} WHERE id = ?`,
        [...values, req.user.id],
        function (err) {
            if (err) return sendDbError(res, err, 'Could not update user');
            if (this.changes === 0) return res.status(404).json({ error: 'User not found' });

            db.get(`SELECT ${publicUserColumns} FROM users WHERE id = ?`, [req.user.id], (selectErr, user) => {
                if (selectErr) return sendDbError(res, selectErr);
                res.json({ message: 'User updated', user });
            });
        }
    );
});

apiRouter.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logged out' });
});

apiRouter.delete('/users/:id', auth, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return sendDbError(res, err, 'Could not delete user');
        if (this.changes === 0) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User deleted' });
    });
});

Object.entries(resources).forEach(([table, config]) => {
    const fields = config.columns.join(', ');
    const placeholders = config.columns.map(() => '?').join(', ');
    const updateSet = config.columns.map((column) => `${column} = ?`).join(', ');

    apiRouter.get(`/${table}`, (req, res) => {
        db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
            if (err) return sendDbError(res, err);
            res.json(rows);
        });
    });

    apiRouter.get(`/${table}/:id`, (req, res) => {
        const { id } = req.params;

        db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
            if (err) return sendDbError(res, err);
            if (!row) return res.status(404).json({ error: `${config.singular} not found` });
            res.json(row);
        });
    });

    const uploadMiddleware = config.uploadField ? upload.single(config.uploadField) : (req, res, next) => next();
    const setUploadedImageUrl = (req) => {
        if (req.file && config.imageColumn) {
            req.body[config.imageColumn] = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }
    };

    apiRouter.post(`/${table}`, uploadMiddleware, (req, res) => {
        setUploadedImageUrl(req);

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

    apiRouter.put(`/${table}/:id`, uploadMiddleware, (req, res) => {
        const { id } = req.params;
        setUploadedImageUrl(req);

        const updates = config.columns.filter((column) => req.body[column] !== undefined);

        if (updates.length === 0) {
            return res.status(400).json({ error: 'Send at least one field to update' });
        }

        const partialUpdateSet = updates.map((column) => `${column} = ?`).join(', ');
        const partialValues = updates.map((column) => normalizeValue(req.body[column]));

        if (config.imageColumn) {
            db.get(`SELECT ${config.imageColumn} FROM ${table} WHERE id = ?`, [id], (err, current) => {
                if (err) return sendDbError(res, err);
                if (!current) return res.status(404).json({ error: `${config.singular} not found` });

                db.run(
                    `UPDATE ${table} SET ${partialUpdateSet} WHERE id = ?`,
                    [...partialValues, id],
                    function (updateErr) {
                        if (updateErr) return sendDbError(res, updateErr);
                        if (this.changes === 0) return res.status(404).json({ error: `${config.singular} not found` });

                        if (req.file && current[config.imageColumn] && current[config.imageColumn].includes('/uploads/')) {
                            const oldPath = path.join(uploadsDir, path.basename(current[config.imageColumn]));
                            fs.unlink(oldPath, () => {});
                        }

                        res.json({ message: `${config.singular} updated` });
                    }
                );
            });
            return;
        }

        db.run(
            `UPDATE ${table} SET ${partialUpdateSet} WHERE id = ?`,
            [...partialValues, id],
            function (err) {
                if (err) return sendDbError(res, err);
                if (this.changes === 0) return res.status(404).json({ error: `${config.singular} not found` });
                res.json({ message: `${config.singular} updated` });
            }
        );
    });

    apiRouter.delete(`/${table}/:id`, (req, res) => {
        const { id } = req.params;

        db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function (err) {
            if (err) return sendDbError(res, err);
            if (this.changes === 0) return res.status(404).json({ error: `${config.singular} not found` });
            res.json({ message: `${config.singular} deleted` });
        });
    });
});

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} and http://192.168.1.16:${PORT}`));
