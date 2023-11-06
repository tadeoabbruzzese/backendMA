## Inicializacion proyecto: 
```sh
touch server.js README.md .env .env.example && npm init -y && npm i express mongoose && npm i dotenv nodemon -D && git init
```

```js
db.peliculas.insertMany([
    {
        title: "El secreto de tus ojos",
        year: "2005",
    },
    {
        title: "Oppenheimer",
        year: "2023",
    },
    {
        title: "Shrek",
        year: "2001",
    },
    {
        title: "El señor de los anillos",
        year: "2001",
    },
    {
        title: "Nueve Reinas",
        year: "2000",
    },
    {
        title: "Guerra de los mundos",
        year: "2005",
    },
])
```

## Vamos a utilizar para la autentificacion PASSPORT
Passport nos facilita la autentificacion de usuarios en nuestras aplicaciones y lo hace con diferentes estrategias, instagram, facebook, gmail, local (email, password)
<https://www.passportjs.org/packages/passport-local/>

```sh
npm i express-session passport passport-local connect-mongo
```
