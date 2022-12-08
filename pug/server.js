const express = require('express')
const fs = require ("fs")

//servidor
const app = express()
const PORT = 8080
const server = app.listen(PORT, ()=> console.log(`El servidor está corriendo en el puerto ${server.address().port}`))
server.on("error", error => console.log(`Error en el servidor: ${error}`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//class
const Contenedor = require("./classes/classes.js")
const catalogo = new Contenedor("./productos.txt")

//implementación de pug
app.set('views','./views');
app.set('view engine', 'pug');

app.get('/',(req, res)=>{
    res.render('main',{titulo: "Engine PUG"})
})
app.get('/productos', async(req, res)=>{
    const resultado = await catalogo.getAll();
    res.render('productos', {titulo: "Vista de productos", lista: resultado})

})

app.post('/productos', async(req, res)=> {
    await catalogo.save(req.body)
    const resultado = await catalogo.getAll();
    res.render('productos', {titulo: "Vista de productos", lista: resultado})
})