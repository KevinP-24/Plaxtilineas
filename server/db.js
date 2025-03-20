require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',  // Servidor de la base de datos
    user: process.env.DB_USER || 'root',       // Usuario (por defecto en XAMPP)
    password: process.env.DB_PASSWORD || '',   // Contraseña (vacía por defecto en XAMPP)
    database: process.env.DB_NAME || 'espumas_db' // Nombre de la base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión a MySQL:', err);
        return;
    }
    console.log('✅ Conexión exitosa a MySQL');
});

module.exports = connection;
