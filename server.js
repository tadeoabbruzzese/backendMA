//IMPORTS
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import path from 'node:path'
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'

import routerUsuarios from './routers/usuarios.router.js'
import routerPeliculas from './routers/peliculas.router.js'
import * as passportStrategy from './config/passport.js'
import routerPublic from './routers/public.router.js'



//CONFIGS
const PORT = process.env.PORT
const app = express()

// * Configuración Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', path.join('views'))

// Conectar con mongo
// !Conexion DB
const conectarMongo = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Conexion a Mongo DB establecida con éxito!')
    } catch (error) {
        console.log('Error al conectar con Mongo DB', error)
    }
}

// conectarMongo(process.env.URI_MONGO_LOCAL)
const uriMongo = process.env.URI_MONGO_REMOTA // process.env.URI_LOCAL
const palabraSecreta = process.env.SESSION_SECRET
conectarMongo(process.env.URI_MONGO_REMOTA)



// Middleware
app.use(express.urlencoded({extended: true})) // decodifica el body cuando llega por url
app.use(express.json()) // decodifica el body cuando llega por json
app.use(methodOverride('_method'))

/* ------ EXPRESS SESSION ------ */
app.use(session({
    secret: palabraSecreta,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: uriMongo})
}))

/* ----- PASSPORT ----- */
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

app.use((req, res, next) => {
    res.locals.mensaje_exito = req.flash('mensaje_exito')
    res.locals.mensaje_error = req.flash('mensaje_error')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    console.log(res.locals)
    next()
})



// ! Rutas
app.use('/', routerPublic)
app.use('/api/peliculas', routerPeliculas)
app.use('/api/auth', routerUsuarios)

app.all('*', (req,res) => {
    const {method, url} = req
    res.status(404).json(
        {status: 404,
        url,
        method,
        mensaje: 'No se encontro la ruta'}
    )
})


//PUERTO ESCUCHANDO
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto: ${PORT}`)
})