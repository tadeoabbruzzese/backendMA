import express from 'express'
const routerUsuarios = express.Router()
import controller from '../controllers/usuarios.controller.js'



// Muestra el formulario de registro // http://localhost:8080/api/auth/signup
routerUsuarios.get('/signup', controller.showAuthFormSignUp)



// Va a recibir los datos del formulario de registro
routerUsuarios.post('/signup', controller.signup)



// Muestra el formulario de logueo // http://localhost:8080/api/auth/signin
routerUsuarios.get('/signin', controller.showAuthFormSignIn)



// Va a recibir los datos del formulario de logueo
routerUsuarios.post('/signin', controller.signin)



// Deslogueo de usuarios http://localhost:8080/api/auth/logout
routerUsuarios.get('/logout', controller.logout)

export default routerUsuarios