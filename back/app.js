const express = require('express')
const authRoute = require('./routes/auth')
const themeRoute = require('./routes/theme')
const commentRoute = require('./routes/comment')
const userRoute = require('./routes/user')


const cors = require('cors')
const history = require('connect-history-api-fallback')
const path = require('path')

const app = express()
app.use(cors())
app.use('/auth', authRoute)
app.use('/theme', themeRoute)
app.use('/comment', commentRoute)
app.use('/user', userRoute)

const staticMiddleware = express.static(path.join(__dirname, 'dist'))

app.use(staticMiddleware)
app.use(history())
app.use(staticMiddleware)


app.listen(8085)

