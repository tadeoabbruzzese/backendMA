import express from "express";
const routerPeliculas = express.Router()
import controller from "../controllers/peliculas.controller.js";
import validator from '../validators/peliculas.validators.js';
import peliculaCreateValidatos from '../middlewares/peliculas.middlewares.js'
import isAuthenticated from "../middlewares/usuarios.middleware.js";

/*-------------------------------------------------- */
/*              CRUD COMPLETO DE RUTAS */
/*-------------------------------------------------- */
// Renderiza la vista list.hbs


// Eenderizar el formulario de creacion de peliculas
routerPeliculas.get('/create', isAuthenticated, controller.formCreate)
routerPeliculas.get('/edit/:id', isAuthenticated, controller.formEdit)

// ! Renderizar la vista de una película 
routerPeliculas.get('/show/:id', isAuthenticated, validator.peliculaShowValidator , controller.show)


// ! Crud: C:CREATE || Método POST
// * http://localhost:8080 => CREATE
routerPeliculas.post('/', validator.peliculaCreateValidatos, controller.create )

// ! Crud: R:GET ONE / ALL || Método GET
// * http://localhost:8080 => READ ALL
// * http://localhost:8080/:id => READ ONE
routerPeliculas.get('/:id?', isAuthenticated, controller.read )
// ! Crud: U:UPDATE || Método UPDATE
// * http://localhost:8080/:id => UPDATE
routerPeliculas.put('/:id', controller.update)

// ! Crud: D:DELETE || Método DELETE
// * http://localhost:8080/:id => DELETE
routerPeliculas.delete('/:id', isAuthenticated, controller.remove)

export default routerPeliculas