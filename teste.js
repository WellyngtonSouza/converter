import Ffmpeg from "fluent-ffmpeg";
import path from "path"
import fs from "fs"



const command = fs.createReadStream(Ffmpeg(path.join(process.cwd(), "uploads/video.mp4")))
    .format("mp3")
    .save(path.join(process.cwd(), "salvos/salvo.mp3"))



