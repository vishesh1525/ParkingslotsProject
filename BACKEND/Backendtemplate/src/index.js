import {app} from "./app.js";
import dotenv from "dotenv"
import connectionDB from "./db/index.js";
dotenv.config({
    path:"./.env"
})
const PORT=process.env.PORT

connectionDB()
.then(()=>{
    app.listen(PORT,()=>
        {
            console.log(`Server is running on port${PORT}`)
        })
})
.catch((err)=>{
    console.log("mongodb connection error");
})
