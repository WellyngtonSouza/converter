import express from "express"
let app = express()
import {router} from "./routes/route.js"


app.set("view engine", "ejs")
app.set("views", "./templates")

app.use(router)


app.listen(3000, (err)=>{
    if(err){
        console.log("ocorreu algum erro!!")
    }else{
        console.log("servidor criado com sucesso!!!")
    }
})