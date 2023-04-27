import { log } from "console"
import fs from "fs"

let file = "qualquer coisa"

console.log(file)

fs.unlink("./arquivo/teste", (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("apagado")
    }
})

