const jwt = require('jsonwebtoken')

module.exports =  function (req, res, next) {
    const token = req.header('auth')

    if( !token ) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token, 'cop321')
          req.user = verified
            next()

    }catch (e) {
        console.log(e)
        return res.status(401).send('Access denied')
    }

}
