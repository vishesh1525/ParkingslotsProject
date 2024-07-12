import express from "express"
import cors from "cors"
const app=express()
import cookieParser from "cookie-parser"

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)
//common middlewares
app.use(express.json({limit:"1000kb"}))
app.use(express.urlencoded({extended:true,limit:"1000kb"}))
app.use(express.static("public"))
app.use(cookieParser())
import healthcheckRouter from "./routes/healthcheck.routes.js"
import loginroutes from "./routes/loginroutes.routes.js"
import Vechileroutes from "./routes/Vechile.routes.js"
import Parkingspotroutes from "./routes/Parkingspots.routes.js"
import Reservationroutes from "./routes/Reservation.routes.js"
import PaymentModelroutes from "./routes/Payment.routes.js"
app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1",loginroutes)
app.use("/api/v1",Vechileroutes)
app.use("/api/v1",Parkingspotroutes)
app.use("/api/v1",Reservationroutes)
app.use("/api/v1",PaymentModelroutes)
export {app}