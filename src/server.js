const express = require("express");
const datos = require("./app");
const app = express();
const conexion=require('./conexion')
app.use(express.json());
const PORT = 3003;

app.get("/", async (req, res) => {
  const consulta = await datos();

  return res.status(201).json(consulta);
});

app.get("/recibeDatos", async (req, res) => {
    try {
        // Extraer datos de la cadena de consulta
        const { humedad, temperatura, clima, distancia, led } = req.query;

        // Verificar si alguno de los parámetros es undefined y lanzar un error específico
        if (typeof humedad === 'undefined') {
            throw new Error('El parámetro "humedad" no puede ser undefined.');
        } else if (typeof temperatura === 'undefined') {
            throw new Error('El parámetro "temperatura" no puede ser undefined.');
        } else if (typeof clima === 'undefined') {
            throw new Error('El parámetro "clima" no puede ser undefined.');
        } else if (typeof distancia === 'undefined') {
            throw new Error('El parámetro "distancia" no puede ser undefined.');
        } else if (typeof led === 'undefined') {
            throw new Error('El parámetro "led" no puede ser undefined.');
        }

        // Actualizar los datos en la base de datos
        const query = `UPDATE bdproyectoiot1.tblDatos 
                       SET humedad = ?, temperatura = ?, clima = ?, distancia = ?, led = ?
                       WHERE id = 1`;
        await conexion.execute(query, [humedad, temperatura, clima, distancia, led]);

        console.log("Datos actualizados correctamente en la base de datos.");
        res.send("Datos recibidos y actualizados correctamente en la base de datos.");
    } catch (err) {
        console.error("Error al actualizar datos en la base de datos:", err);
        res.status(500).send("Error interno del servidor.");
    }
});


app.listen(3003, () => {
  console.log("listening on port:" + PORT);
});
