const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'dcdb.sqlite'));

const addColumnIfMissing = (table, column, definition) => {
    db.all(`PRAGMA table_info(${table})`, [], (err, columns) => {
        if (err) return console.error(`Could not inspect ${table}:`, err.message);

        const exists = columns.some((item) => item.name === column);
        if (!exists) {
            db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (alterErr) => {
                if (alterErr) console.error(`Could not add ${table}.${column}:`, alterErr.message);
            });
        }
    });
};

db.serialize(() => {

    // Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT
        )
    `);

    // Characters Table
    db.run(`
        CREATE TABLE IF NOT EXISTS characters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo_url TEXT,
            name TEXT UNIQUE NOT NULL,
            real_name TEXT,
            age INTEGER,
            role TEXT,
            ability TEXT,
            alignment TEXT,
            enemy TEXT,
            city TEXT,
            team TEXT,
            history TEXT
        )
    `);

    const desiredCharacterCols = ['id', 'photo_url', 'name', 'real_name', 'age', 'role', 'ability', 'alignment', 'enemy', 'city', 'team', 'history'];
    db.all(`PRAGMA table_info(characters)`, [], (err, columns) => {
        if (err) return console.error(`Could not inspect characters:`, err.message);
        if (!Array.isArray(columns) || columns.length === 0) return;

        const existing = columns.map((item) => item.name);
        const needsMigration = existing.some((name) => !desiredCharacterCols.includes(name)) || desiredCharacterCols.some((name) => !existing.includes(name));
        if (!needsMigration) return;

        const columnList = desiredCharacterCols.join(', ');
        const selectColumns = desiredCharacterCols.map((name) => existing.includes(name) ? name : `NULL AS ${name}`).join(', ');

        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS characters_new(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                photo_url TEXT,
                name TEXT UNIQUE NOT NULL,
                real_name TEXT,
                age INTEGER,
                role TEXT,
                ability TEXT,
                alignment TEXT,
                enemy TEXT,
                city TEXT,
                team TEXT,
                history TEXT
            )`, (createErr) => {
                if (createErr) return console.error(`Could not create characters_new:`, createErr.message);

                db.run(`INSERT INTO characters_new (${columnList}) SELECT ${selectColumns} FROM characters`, (insertErr) => {
                    if (insertErr) return console.error(`Could not migrate characters data:`, insertErr.message);

                    db.run(`DROP TABLE characters`, (dropErr) => {
                        if (dropErr) return console.error(`Could not drop old characters table:`, dropErr.message);

                        db.run(`ALTER TABLE characters_new RENAME TO characters`, (renameErr) => {
                            if (renameErr) return console.error(`Could not rename characters_new:`, renameErr.message);
                        });
                    });
                });
            });
        });
    });

    // Cities Table
    db.run(`
        CREATE TABLE IF NOT EXISTS cities(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo_url TEXT,
            name TEXT UNIQUE NOT NULL,
            state TEXT,
            country TEXT,
            population_characters TEXT,
            population_count INTEGER DEFAULT 0
        )
    `);

    // Teams Table
    db.run(`
        CREATE TABLE IF NOT EXISTS teams(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_url TEXT,
            name TEXT UNIQUE NOT NULL,
            type TEXT,
            headquarters TEXT,
            members TEXT
        )
    `);

    addColumnIfMissing('users', 'name', 'TEXT');
    addColumnIfMissing('users', 'email', 'TEXT');
    addColumnIfMissing('users', 'phone', 'TEXT');
    addColumnIfMissing('characters', 'photo_url', 'TEXT');
    addColumnIfMissing('characters', 'enemy', 'TEXT');
    addColumnIfMissing('characters', 'city', 'TEXT');
    addColumnIfMissing('characters', 'team', 'TEXT');
    addColumnIfMissing('characters', 'history', 'TEXT');
    addColumnIfMissing('cities', 'photo_url', 'TEXT');
    addColumnIfMissing('cities', 'state', 'TEXT');
    addColumnIfMissing('cities', 'population_characters', 'TEXT');
    addColumnIfMissing('cities', 'population_count', 'INTEGER DEFAULT 0');
    addColumnIfMissing('teams', 'image_url', 'TEXT');
    addColumnIfMissing('teams', 'members', 'TEXT');

    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL`);

    const seedTable = (table, countSql, insertSql, rows) => {
        db.get(countSql, [], (err, row) => {
            if (err) return console.error(`Could not count ${table}:`, err.message);
            if (row && row.count === 0) {
                rows.forEach((values) => {
                    db.run(insertSql, values, (insertErr) => {
                        if (insertErr) console.error(`Could not seed ${table}:`, insertErr.message);
                    });
                });
            }
        });
    };

    seedTable(
        'cities',
        'SELECT COUNT(*) as count FROM cities',
        `INSERT INTO cities (photo_url, name, state, country, population_characters, population_count) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            ['https://example.com/gotham.jpg', 'Gotham', 'New Jersey', 'USA', 'Bruce Wayne, Barbara Gordon', 1200000],
            ['https://example.com/metropolis.jpg', 'Metropolis', 'New York', 'USA', 'Clark Kent, Lois Lane', 1500000],
            ['https://example.com/themyscira.png', 'Themyscira', 'N/A', 'Greece', 'Diana Prince', 1000]
        ]
    );

    seedTable(
        'teams',
        'SELECT COUNT(*) as count FROM teams',
        `INSERT INTO teams (image_url, name, type, headquarters, members) VALUES (?, ?, ?, ?, ?)`,
        [
            ['https://example.com/justiceleague.jpg', 'Justice League', 'Superhero', 'Hall of Justice', JSON.stringify(['Superman', 'Batman', 'Wonder Woman'])],
            ['https://example.com/teentitans.jpg', 'Teen Titans', 'Hero', 'Titan Tower', JSON.stringify(['Robin', 'Starfire', 'Beast Boy'])]
        ]
    );

});

module.exports = db;
