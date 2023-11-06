import models from '../models/usuarios.models.js'
import passport from 'passport'

const showAuthFormSignUp = (req, res) => {

  


    res.render('usuarios/signup')
}

const signup = async (req, res) => {
    try {
        const error = []
        const {name, email, password, confirm_password} = req.body
        console.log(name, email, password, confirm_password)

        if(password !== confirm_password) {
            error.push({msg: 'La contraseña no coincide'})
        }

        if(password.length < 5) {
            error.push({msg: 'La contraseña debe tener almenos 5 caracteres'})
        }

        if(error.length > 0){
            return res.render('usuarios/signup', {
                error,
                name,
                email
            })
             
        }

        const userFound = await models.getUserByEmail(email)

        if(userFound) {
            // Si el usuario ya esta registrado con el mail, entonces...
            return res.send('Ya existe el usuario en nuestros registros')
        }

        const newUser = await models.createUser({ name, email, password })
        if(!newUser){
            return res.send('No se pudo crear el usuario')
        }
        req.flash('mensaje_exitoso', `Usuario ${name} registrado correctamente!`)
        res.redirect('/api/auth/signin')
        // res.send('Todo salio bien, usuario creado')
    } catch (error) {
        res.send(error)
    }


    // res.send('Recibidos los datos del signup')
}

const showAuthFormSignIn =  (req, res) => {
    res.render('usuarios/signin')
}

const signin = passport.authenticate('local', {
    successRedirect: '/api/peliculas',
    failureRedirect: '/api/auth/signin'
})

const logout =  (req, res, next) => { 
   
    req.logout((err) => {
        if(err) return next(err)
        res.redirect('/api/auth/signin')
    })
}

export default {
    showAuthFormSignUp,
    signup,
    showAuthFormSignIn,
    signin,
    logout

}

