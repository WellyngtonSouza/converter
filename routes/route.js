import express from "express"
let router = express.Router()
import fs from "fs"

router.get("/", (req, res)=>{
    res.render("all")
})

router.get("/download", (req, res)=>{

    let url = "/arquivosTeste/teste.txt"

    let stats = fs.statSync(url)

    res.writeHead(200, {
        "cotent-type" : "text/plain",
        "content-lenght" : stats.size
    })

    let red = fs.createReadStream(url)

    red.pipe()   

})


export {router}
