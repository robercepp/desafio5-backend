//librerías requeridas
const express = require('express');
const app = express();

//middlewares
app.set('views','./views');
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//servidor
const PORT = 8080
const server = app.listen(PORT, ()=> console.log(`El servidor está corriendo en el puerto ${server.address().port}`))
server.on("error", error => console.log(`Error en el servidor: ${error}`))

//class
const Contenedor = require("./classes/classes.js")
const catalogo = new Contenedor("./productos.txt")

app.get('/', (req, res) =>{
    res.render('pages/main', {titulo: 'Engine EJS'})
})

app.get('/productos', async(req, res)=>{
    const resultado = await catalogo.getAll();
    res.render('pages/productos', {titulo: "Vista de productos", lista: resultado})

})

app.post('/productos', async(req, res)=> {
    await catalogo.save(req.body)
    const resultado = await catalogo.getAll();
    res.render('pages/productos', {titulo: "Vista de productos", lista: resultado})
})