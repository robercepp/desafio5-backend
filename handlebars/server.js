//librerías requeridas
const express = require('express');
const {engine} = require('express-handlebars');
const app = express();

//engine handlebars
app.engine('hbs', engine({
    defaultLayout: false
}))

//middlewares
app.set("view engine", "hbs");
app.set("views", "./views")
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
    res.render('main', {titulo: 'Engine Handlebars'})
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