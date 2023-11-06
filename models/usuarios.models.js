import mongoose from "mongoose";
import bcrypt from 'bcrypt'

/* ------------------------------------------------ */
/* SCHEMA (Estructura que va a tener el documento) */
/* ------------------------------------------------ */

const UsuarioSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
    
    },
    {
        timestamps: true,
        versionKey: false
    }
)


/* ------------------------------------------------ */
// Métodos de los Schemas (Métodos de mongoose)
/* ------------------------------------------------ */

// bcrypt => Encripta y no desencripta las contraseñas. 
UsuarioSchema.methods.encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // La semilla
    return await bcrypt.hash(password, salt) // me retorna el password
}

UsuarioSchema.methods.comprobarPassword = async function(password) { // this
    return await bcrypt.compare(password, this.password) // true o false
}

const UsuariosModel = mongoose.model('usuarios', UsuarioSchema)

/* ------------------------------------------------ */
/* Métodos de iteracion con la base de datos        */
/* ------------------------------------------------ */

const getUserByEmail = async (email) => {
    try {
        const userFound = await UsuariosModel.findOne({email})
        return userFound
    } catch (error) {
        console.log('[getUserByEmail]: Error al obtener el usuario', error)
    }
}

const createUser = async (nuevoUsuario) => {
    try {
        
        const usuarioCreado = new UsuariosModel(nuevoUsuario)
        usuarioCreado.password = await usuarioCreado.encriptarPassword(nuevoUsuario.password)
        await usuarioCreado.save()

        return usuarioCreado
    } catch (error) {
        console.log('[createUser]: Error al crear el usuario', error)   
    }
}

const checkUserPassword = async (usuario, password) => {
    
    try{

        const isMatch = await usuario.comprobarPassword(password)
        return isMatch

    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (id) => {
    try{
        const usuario = await UsuariosModel.findById(id)
        return usuario
    } catch(error){
        console.log(error)
    }
}


export default {
    createUser,
    getUserByEmail,
    checkUserPassword,
    getUserById
}
