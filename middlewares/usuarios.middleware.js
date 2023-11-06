
const isAuthenticated = (req, res, next) => {
    if ( req.isAuthenticated() ) {
        return next()
    }

    res.redirect('/api/auth/signin')
}

export default isAuthenticated