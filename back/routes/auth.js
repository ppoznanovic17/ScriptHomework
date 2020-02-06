const express = require('express')
const  route = express.Router()

const jwtsecret = 'cop321'
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')

const Joi = require('joi')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'SJispit'
})

const sema = Joi.object().keys({
    username: Joi.string().trim().min(1).max(12).required(),
    password: Joi.string().trim().min(1).max(300).required(),
    picture: Joi.string().trim(),
    role: Joi.string().trim().max(10)
})


route.use(express.json())



route.post('/reg' ,(req, res) => {

    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        // username mora da bude jedinstven

        query = "insert into user (username, password, role) values (?, ?, ?)"
        let password = passwordHash.generate(req.body.password)
        let formated = mysql.format(query, [req.body.username, password, 'user'])

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from user where id=?'
                formated = mysql.format(query, [response.insertId])

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage)
                    else
                        res.send(rows[0])
                })
            }
        })
    }

})



route.post('/log', (req, res) => {
    let { error } = Joi.validate(req.body, sema)

    if (error)
        return res.status(400).send(error.details[0].message)  // Greska zahteva
    else {
        query = 'select * from user where username=?'
        formated = mysql.format(query, [req.body.username])

        pool.query(formated,  (err, rows) => {
            if (err) {
                return res.status(400).send(err)

            }else {

                if( rows[0] == null ){
                    return res.status(400).send("Username doesn't exist")
                }

                if ( passwordHash.verify(req.body.password, rows[0].password)){
                    const token = jwt.sign({_id: rows[0].id}, jwtsecret)
                    return res.set({'auth':token,
                        'user': rows[0].username }).send({id: rows[0].id, token: token, username: rows[0].username,
                        picture: rows[0].picture, role: rows[0].role})

                }else{

                    return res.status(400).send("Password doesn't match")
                }


                return res.status(200).send('Login')

            }
        })




    }
})





module.exports = route
