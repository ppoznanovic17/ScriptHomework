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

const sema = Joi.object().keys({
    username: Joi.string().trim().min(3).max(12).required()
})

route.use(express.json())

route.get('/', (req, res) => {

    //console.log(auth(req, res))
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.get('/:id', (req, res) => {

    let query = 'select * from user where Wid=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
    })
})

route.put('/:id', (req, res) => {
    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)
    else {
        let query = "update user set username=? where id=?"
        let formated = mysql.format(query, [req.body.username, req.params.id])

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage)
            else {
                query = 'select * from user where id=?'
                formated = mysql.format(query, [req.params.id ])

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
