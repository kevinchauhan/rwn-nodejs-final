import express from "express";
import categoryRouter from "./routes/category.js";
import dbConnection from "./config/db.js";
import expressEjsLayouts from "express-ejs-layouts";
import subCategoryRouter from "./routes/subcategory.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authenticate.js";
import managerRouter from "./routes/manager.js";
import authorized from "./middlewares/authorized.js";
const app = express()
const PORT = 8000

// db connection
dbConnection()

// parse body
app.use(express.urlencoded({ extended: false }))
// cookie parser
app.use(cookieParser())

// static folder
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

// express layout
app.use(expressEjsLayouts)
// view engine
app.set('view engine', 'ejs')
// set template
app.set('views', 'src/views')

// routes
app.get('/', authenticate, authorized, (req, res) => {
    res.render('pages/index')
})


app.use('/category', categoryRouter)
app.use('/subcategory', subCategoryRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/manager', managerRouter)


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})