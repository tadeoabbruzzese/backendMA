import mongoose from "mongoose";

/* ------------------------------------------------ */
/* SCHEMA (Estructura que va a tener el documento) */
/* ------------------------------------------------ */

const peliculaSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true /* CreateAT y UpdateAT */
    }
)


/* ------------------------------------------------ */
/* MODEL (Easado en el Schema creo el modelo) */
/* ------------------------------------------------ */

const PeliculaModel = mongoose.model('peliculas', peliculaSchema)

/* ------------------------------------------------ */
/* Métodos de iteracion con la base de datos        */
/* ------------------------------------------------ */

const getAllPeliculas = async () => {
    try {
        const peliculas = await PeliculaModel.find({})
        return peliculas
    } catch (error) {
        console.log('[getAllPeliculas]: Error al obtener las peliculas', error)
    }
}

const getOneByIdPelicula = async (id) => {
    try {
        const pelicula = await PeliculaModel.findById(id)
        return pelicula
    } catch (error) {
        console.log('[getOnePelicula]: Error al buscar una pelicula por ID', error)
    }
}

const createPelicula = async (nuevaPelicula) => {
    try {
        console.log(nuevaPelicula)
        const pelicula = new PeliculaModel(nuevaPelicula)
        console.log(pelicula)
        const peliculaCreada = await pelicula.save() // si no se crea devuelve un null
        console.log(peliculaCreada)

        return peliculaCreada
    } catch (error) {
        console.log('[ERROR]: Error al guardar una película')
        return null
    }
}

const deletePelicula = async (id) => {
    
    try {

        const isDeleted = await PeliculaModel.findByIdAndDelete(id)
        return isDeleted

    } catch (error) {
        console.log('[deletePelicula]: Error al eliminar una película', error)
    }
}

const updatePelicula = async (id, editandoPelicula) => {

    console.log(id)
    console.log(editandoPelicula)
    try {

        const options = { new: true }
        const peliculaEditada = await PeliculaModel.findByIdAndUpdate(id, editandoPelicula, options)
        return peliculaEditada
    } catch (error) {
        console.log('[deletePelicula]: Error al actualizar la película', error)
    }
}

export default {
    getAllPeliculas,
    getOneByIdPelicula,
    createPelicula,
    deletePelicula,
    updatePelicula
}