const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'dcdb.sqlite'));

db.serialize(() => {

    // Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    // Characters Table
    db.run(`
        CREATE TABLE IF NOT EXISTS characters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            real_name TEXT,
            age INTEGER,
            role TEXT,
            ability TEXT,
            alignment TEXT,
            enemy_of TEXT,
            city TEXT,
            team TEXT
        )
    `);

    // Cities Table
    db.run(`
        CREATE TABLE IF NOT EXISTS cities(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            country TEXT,
            status TEXT
        )
    `);

    // Groups / Leagues Table
    db.run(`
        CREATE TABLE IF NOT EXISTS groups(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            type TEXT,
            headquarters TEXT
        )
    `);

});

module.exports = db;
