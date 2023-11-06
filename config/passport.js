import passport from "passport";
import { Strategy } from "passport-local";
import models from '../models/usuarios.models.js'

// Strategy('<field>', callback) <== lo tiene que chequear
const fieldEstrategia = { usernameField: 'email' }
const comprobacionUsuario = async (email, password, done) => {
    try {
        const usuario = await models.getUserByEmail(email)
        
        if( !usuario ) {
            return done(null, false, { message: 'Usuario no encontrado.'})
        }

        const passwordCorrecto = await models.checkUserPassword(usuario, password)
        if (!passwordCorrecto) {
            return done(null, false, {message: 'No coincide el password'})
        }
        return done(null, usuario)

    } catch (error) {
        console.log(error)
    }
}


const estrategiaLocal = new Strategy(fieldEstrategia, comprobacionUsuario )

export default passport.use(estrategiaLocal)

passport.serializeUser((usuario, done) => {
    done(null, usuario.id) // busca al usuario por id
})

passport.deserializeUser( async (id, done) => {
    // busca al usuario directamente
    const usuario = await models.getUserById(id) // crear en el modelo
    done(null, usuario)
})