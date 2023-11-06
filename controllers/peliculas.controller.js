import { model } from 'mongoose'
import models from '../models/peliculas.model.js'
import handleError from '../utils/handleError.js'
import { mongoToObj } from '../utils/mongoToObj.js'

const list = async (req, res) => {
    
    const nombre = req.user?.name
    const email = req.user?.email
    try{
        let peliculas = await models.getAllPeliculas()
        peliculas = mongoToObj(peliculas)
        res.status(200).render('list', {titulo: "Listado de peliculas", peliculas, nombre, email}) // Siempre a handlebars le tengo que pasar un objeto en el segundo argumento
    }
    catch (error){
        handleError(res, 'Error [list]: No se pudo leer las peliculas', error)
    }
}

const formCreate= (req, res) =>{
    const nombre = req.user?.name
    res.status(200).render('peliculas/create', {titlo: 'Formulario de creación', nombre})
}

const formEdit= async (req, res) =>{
    const nombre = req.user?.name
    const id = req.params.id
    try {
        
        let pelicula = await models.getOneByIdPelicula(id)

        if(!pelicula){
            return res.status(404).send('No está la película')
        }
        pelicula = mongoToObj(pelicula)
        res.status(200).render('peliculas/edit', {titulo: 'Formulario de edición', pelicula, nombre})

    
    } catch (error) {
        handleError(res, 'ERROR [formEdit]: No se pudo traer la película', error)
    }

}

const read =  async (req,res) => {
    const id = req.params.id

    console.log(req.name)

    const nombre = req.user?.name
    const email = req.user?.email
    


    try {
        if ( id ) {
            // Llama a las funciones que estan en models
            const pelicula = await models.getOneByIdPelicula(id)
            res.status(200).json({ok: true, pelicula})
           
        } else{
            let peliculas = await models.getAllPeliculas()
            peliculas = mongoToObj(peliculas)
            res.status(200).render('peliculas/list-private', {titulo: 'Listado peliculas privado', peliculas, nombre, email})
        }
        
    
    } catch (error) {
        handleError(res, 'Error [list]: No se pudo listar las película/s', error)
    }
}

const create = async (req,res) => {
   const pelicula = req.body
   const nombre = req.user?.name
   
   try {
    const peliculaCreada = await models.createPelicula(pelicula)
    
    
        if ( !peliculaCreada) {
        throw new Error('No se pudo crear la pelicula')
        }
    req.flash('mensaje_exito', 'Película Creada con éxito!')
    res.status(201).render('peliculas/show', { pelicula: mongoToObj(peliculaCreada), nombre})
   }

   
   catch (error) {
    handleError(res, 'Error [create]: No se pudo crear la pelicula', error)    
    
   }
}

const update = async (req,res) => {
    const id = req.params.id
    const pelicula = req.body

    try {
        const isEdited = await models.updatePelicula(id, pelicula)

        if(!isEdited){
            return res.status(404).send('No se pudo actualizar')
        }
        req.flash('mensaje_exito', 'Película actualizada con éxito!')
        res.redirect('/')
    } catch (error) {
        handleError(res, 'ERROR [update: No se pudo actualizar la pelicula', error)
    }
}

const remove = async (req,res) => {
    const id = req.params.id

    try {
        const isDeleted = await models.deletePelicula(id)

        if (!isDeleted) {
            return res.status(404).send('No se encontró la película que se quiere eliminar')
        }
        req.flash('mensaje_exito', 'Película eliminada con éxito!')
        res.redirect('/api/peliculas')
    } catch (error) {
        handleError(res,'[deletePelicula]: Error al eliminar una película', error, )
    }
}


const show = async (req, res) => {
    const id = req.params.id
    const nombre = req.user?.name
    try {

        const peliculaMostrar = await models.getOneByIdPelicula(id)

        if(!peliculaMostrar) {
            throw new Error('No se pudo mostrar la pelicula')
        }
        res.status(200).render('peliculas/show', {pelicula: mongoToObj(peliculaMostrar)})
        
    } catch (error) {
        handleError(res, 'Error [show]: No se pudo mostrar la pelicula')
    }


}


export default {
    read,
    create,
    update,
    remove,
    list,
    formCreate,
    formEdit,
    show
}