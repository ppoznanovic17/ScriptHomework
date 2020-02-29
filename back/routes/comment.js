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
    content: Joi.string().trim().min(3).max(250).required(),
    user_id: Joi.string().trim().required(),
    theme_id: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    picture: Joi.string().trim().required()
})

const sema2 = Joi.object().keys({
    content: Joi.string().trim().min(3).max(250).required()

})

route.get('/', (req, res) => {

    //console.log(auth(req, res))
    pool.query('select * from comment', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})
route.get('/id/:id', (req, res) => {

    let query = 'select * from comment where id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.get('/:id', (req, res) => {

    let query = 'select * from comment where theme_id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.post('/' ,(req, res) => {

    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)  // Greska zahteva
    else {

        let today = new Date().toISOString().slice(0, 10)
        let likes = Math.floor(Math.random() * 1000)
        let dislikes = Math.floor(Math.random() * 1000)

        query = "insert into comment (content, theme_id, user_id, username, picture, date, likes, dislikes, edited) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        let formated = mysql.format(query, [req.body.content,  parseInt(req.body.theme_id), parseInt(req.body.user_id), req.body.username, req.body.picture,today, likes, dislikes, false])

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from comment where id=?'
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
    let query = 'select * from comment where id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)
        else {
            let poruka = rows[0]

            let query = 'delete from comment where id=?'
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
        let query = "update comment set content=?, edited=? where id=?"
        let formated = mysql.format(query, [req.body.content, true, req.params.id])

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                query = 'select * from comment where id=?'
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
