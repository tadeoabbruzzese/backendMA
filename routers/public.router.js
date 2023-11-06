import express from 'express'
const routerPublic = express.Router()
import controller from '../controllers/public.controller.js'

routerPublic.get('/', controller.mostrarPeliculasPublic)

export default routerPublic