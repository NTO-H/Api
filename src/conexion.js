const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bdproyectoiot1'
});

// Habilita las promesas para esta conexión
// conexion.promise();

module.exports = conexion;
