import express from "express"
let router = express.Router()
import fs, { stat } from "fs"
import multer from "multer"
import path from "path"
import Ffmpeg from "fluent-ffmpeg"

let dirname = process.cwd()


router.get("/", (req, res) => {
    res.render("all")
})


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "uploads"))
    },

    filename: function (req, file, cb) {
        // const uniqueSuffix = `${Date.now()} - ${Math.round(Math.random() * 1E9 )}`
        // cb(null, `${file.fieldname} - ${uniqueSuffix}`)
        console.log(file)
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage })

router.post("/download", upload.single("music"), (req, res, next) => {

    const inputFile = path.resolve(dirname, `uploads/${req.file.originalname}`);
    const outputFile = path.join(dirname, `salvos/musica.mp3`)

    let writeStream = fs.createWriteStream(outputFile)

    let fileName = req.file.originalname.replace(".mp4", ".mp3")
    
    Ffmpeg(inputFile)
        .format("mp3")
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .pipe(writeStream)
        .on("error", (err) => {
            console.log(err)
        })
        .on("finish", () => {

            let stats = fs.statSync(outputFile)

            console.log(stats)
            console.log("arquivo carregado")


            res.download(outputFile, fileName, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("download concluído")
                }
            })

            

            //tem esse jeito alternativo => 

            //let read = fs.createReadStream(outputFile)
            // res.setHeader('Content-Disposition', `attachment; filename=musicas.mp3`);
            // res.setHeader("content-type", "audio/mpeg")

            // read.pipe(res)

        })

})

export { router }
