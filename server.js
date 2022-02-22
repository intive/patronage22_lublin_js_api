require('express-async-errors');
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// origin: 'mysql51.mydevil.net',

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//Routes for frontend without Authorization
const externalProductRouter = require('./routes/productExternalRouter.js')
app.use('/api/products', externalProductRouter)

//Router for categories
const categoryRouter = require('./routes/categoryRouter.js')
app.use('/api/categories', categoryRouter)

// Router for products, auth
const router = require('./routes/productRouter.js')
const authRouter = require('./routes/authRouter.js')
const authMiddleware = require('./middleware/auth')
app.use('/api/products', authMiddleware, router)
app.use('/api/auth', authRouter)

//Router for uploading images
const uploadRouter = require('./routes/uploadRouter.js')
app.use('/api/upload', uploadRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
