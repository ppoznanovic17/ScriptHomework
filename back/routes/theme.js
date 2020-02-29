const express = require('express')
const  route = express.Router()

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

route.use(express.json())

const sema = Joi.object().keys({
    content: Joi.string().trim().min(3).max(200).required(),
    title: Joi.string().trim().min(3).max(13).required(),
    user_id: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    picture: Joi.string().trim().required()
})

const sema2 = Joi.object().keys({
    content: Joi.string().trim().min(3).max(200).required(),
    title: Joi.string().trim().min(3).max(13).required()
})



route.get('/', auth ,(req, res) => {



    //console.log(auth(req, res))
    pool.query('select * from theme', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.get('/:id', auth,(req, res) => {

    let query = 'select * from theme where id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows[0]        )
    })
})

route.post('/' ,(req, res) => {

    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        // username mora da bude jedinstven
        let today = new Date().toISOString().slice(0, 10)
        let likes = Math.floor(Math.random() * 1000)
        let dislikes = Math.floor(Math.random() * 1000)

        query = "insert into theme (title, content, user_id, username, picture, date, likes, dislikes) values (?, ?, ?, ?, ?, ?, ?, ?)"

        let formated = mysql.format(query, [req.body.title, req.body.content, parseInt(req.body.user_id), req.body.username,req.body.picture,today, likes, dislikes])

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from theme where id=?'
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

route.delete('/:id', (req, res) => {
    let query = 'select * from theme where id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)
        else {
            let poruka = rows[0]

            let query = 'delete from theme where id=?'
            let formated = mysql.format(query, [req.params.id])

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage)
                else
                    res.send(poruka)
            })
        }
    })
})

route.put('/:id', (req, res) => {
    let { error } = Joi.validate(req.body, sema2)

    if (error)
        res.status(400).send(error.details[0].message)
    else {
        let query = "update theme set title=?,content=? where id=?"
        let formated = mysql.format(query, [req.body.title, req.body.content, req.params.id])

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                query = 'select * from theme where id=?'
                formated = mysql.format(query, [req.params.id])

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

