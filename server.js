require('dotenv').config();
require('express-async-errors');
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const authMiddleware = require('./middleware/auth')
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const corsOptions = {
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// origin: 'mysql51.mydevil.net',

app.use(cors(corsOptions))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Routes for frontend without Authorization
const externalProductRouter = require('./routes/productExternalRouter.js')
const externalUsersRouter = require('./routes/usersExternalRouter.js')
const externalCategoriesRouter = require('./routes/categoryExternalRouter.js');
const externalPagesRouter = require('./routes/pageExternalRouter');
app.use('/api/products', externalProductRouter)
app.use('/api/categories', externalCategoriesRouter)
app.use('/api/pages', externalPagesRouter)
app.use('/api/usersExternal', externalUsersRouter)

// Router for products
const productRouter = require('./routes/productRouter.js')
app.use('/api/products', authMiddleware, productRouter);

// Router for categories
const categoryRouter = require('./routes/categoryRouter.js')
app.use('/api/categories', authMiddleware, categoryRouter)

// Router for auth
const authRouter = require('./routes/authRouter.js')
app.use('/api/auth', authRouter)

// Router for uploading images
const uploadRouter = require('./routes/uploadRouter.js')
app.use('/api/upload', authMiddleware, uploadRouter)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Router for photo table
const photosRouter = require('./routes/photosRouter.js');
const uploadPhotosRouter = require('./routes/uploadPhotosRouter.js');
app.use('/api/photos', authMiddleware, photosRouter);
app.use('/uploadPhotos', authMiddleware, uploadPhotosRouter);

// Router for pages
const pagesRouter = require('./routes/pagesRouter.js');
app.use('/api/pages', authMiddleware, pagesRouter);

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const PORT = process.env.PORT || 40286

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
