const express = require('express')
const helloRoute = require('./routes/helloworld.js')
const authRoute = require('./routes/auth')
const themeRoute = require('./routes/theme')
const commentRoute = require('./routes/comment')
const cors = require('cors')


const app = express()
app.use(cors())
app.use('/hello', helloRoute)
app.use('/auth', authRoute)
app.use('/theme', themeRoute)
app.use('/comment', commentRoute)



app.listen(8085)

