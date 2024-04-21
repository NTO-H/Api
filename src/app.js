const conexion=require('./conexion')



const obtenerDatos=async()=>{
    const [query]=await conexion.execute('SELECT  * FROM   bdproyectoiot1.tblsensorclima')
return query;
}

module.exports=obtenerDatos;