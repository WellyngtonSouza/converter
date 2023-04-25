import express from "express"
let router = express.Router()
import fs from "fs"
import  multer  from "multer"
import path from "path"
import Ffmpeg from "fluent-ffmpeg"



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

const storage = multer.diskStorage({

    destination : function (req, file, cb){
        cb(null, path.join(process.cwd(), "uploads"))
    },

    filename : function (req, file , cb){
        // const uniqueSuffix = `${Date.now()} - ${Math.round(Math.random() * 1E9 )}`
        // cb(null, `${file.fieldname} - ${uniqueSuffix}`)
        cb(null, file.originalname)
    }
})


const upload = multer({storage : storage})

router.post("/add", upload.single("music"), async (req, res)=>{

    let inputFile = path.join(process.cwd(), `uploads/${req.file.originalname}`)

    let outputFile = path.join(process.cwd(), `salvos/music.mp3`)
    


    const promise = new Promise((resolve, reject)=>{
        const command = Ffmpeg(inputFile)
        .format("mp3")
        .save(outputFile)
        resolve()
    })

    promise.then(res=>{


        console.log("salvo")
        // fs.unlink(path.join(process.cwd(), `uploads/${req.file.originalname}`), (err)=>{
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log("apagado com sucesso")
        //     }
        // })
    })    
    
    res.send("arquivo enviado com sucesso")


    

})


export {router}
