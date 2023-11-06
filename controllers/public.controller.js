import models from '../models/peliculas.model.js'
import handleError from '../utils/handleError.js'
import { mongoToObj } from '../utils/mongoToObj.js'

const mostrarPeliculasPublic = async (req, res) => {
    const nombre = req.user?.name
        try{
            let peliculas = await models.getAllPeliculas()
            peliculas = mongoToObj(peliculas)
            res.render('list', {titulo: 'Página pública', peliculas, nombre})
        }
        catch (error){
            handleError(res, 'Error [list]: No se pudo leer las peliculas', error)
        }
    }

   


export default {
    mostrarPeliculasPublic
}