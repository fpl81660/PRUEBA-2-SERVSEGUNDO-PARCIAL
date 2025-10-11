const express = require("express");
const app = express();
const port =3000;

app.use(express.json());

app.get("/",(req,res)=>
{
    res.send("Hola desde mi server de express 3");
});

app.get("/nuevaruta",(req,res)=>
{
    res.send("prueba push");
});


app.get("categories/:categoryId/products/:productId", (req,res) =>{
    const {categoryId, productId}= req.params;
    res.json({
        categoryId,
        productId
    })
})

app.get('/users',(req,res)=>{
    const{username, lastname} = req.query;
    if ( username && lastname)
    {
        res.json({
            username,
            lastname
        });
    }
    else{
        res.send("No hay parametros de ruta")
    }
})

app.listen(port, ()=>
{
    console.log("My port is working on: "+port);
})






/*const express = require('express');
const routerApi = require('./routes/rutas');
const router = require('./routes/productsRouters');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my Express app!');
});

app.get('/nuevaruta', (req, res) => {
  res.send('This is a new route!');
});

/* Dar de alta */



app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.listen(port, () => {
  console.log("My port us working on: " + port);
});


/*

api.example.com/task/{id}

api.example.com/people/{id}

aoi.example.com/users/{id}/tasks/{id}
*/