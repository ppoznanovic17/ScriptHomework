const express = require('express')
const Joi = require('joi')
const mysql = require('mysql')
const auth = require('../verifyJWT')

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'SJispit'
})

const sema = Joi.object().keys({
    content: Joi.string().trim().min(4).max(34).required(),
    title: Joi.string().trim().max(13).required(),
})

const route = express.Router()
route.use(express.json())


route.get('/',auth, (req, res) => {

    //console.log(auth(req, res))
    pool.query('select * from hello', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.post('/', (req, res) => {

    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string



        let query = "insert into hello (content, title) values (?, ?)"
        let formated = mysql.format(query, [req.body.content, req.body.title])

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from hello where id=?'
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


module.exports = route
