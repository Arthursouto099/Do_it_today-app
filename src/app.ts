import express, {Request} from 'express'
import helmet from 'helmet'
import path from 'path'
import 'dotenv/config'
import router from './routes/router'
import session from 'express-session'
import methodOverride from 'method-override'




const app = express()


app.use(express.json())
app.use(methodOverride('_method'))

type User = {
    id: number,
    email: string,
    name: string
}

type Board = {
    id: number
}


app.use(session({
    secret: process.env.SESSION_SECRET || 'DEFAULT_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))


declare module "express-session" {
    interface SessionData {
        user: User,
        board: Board
    }
}








app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(helmet())


const port = process.env.PORT  || 10000


app.listen(port, () => {
    console.log("I working in port http://localhost:" + port)
})
