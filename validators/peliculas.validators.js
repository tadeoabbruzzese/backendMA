import { check } from "express-validator"
import peliculaMiddleware from "../middlewares/peliculas.middlewares.js"
const peliculaShowValidator = [
    // Tengo que tener un array de Middleware
    check('id')
        .isMongoId()
        .withMessage('Envio información incorrecta para mostrar el producto'),
    peliculaMiddleware // <== define si paso o no paso al siguiente middleware
]

const peliculaCreateValidatos = [
    check('title')
        .notEmpty()
        .withMessage('El campo título es obligatorio'),
        peliculaMiddleware
]

export default {
    peliculaShowValidator,
    peliculaCreateValidatos
}