import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const video_url = "https://www.youtube.com/shorts/" + videoId

    console.log("Realizando download do vídeo " + videoId + ", aguarde!")

    ytdl(video_url, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error(
            "O vídeo informado não se enquadra nas especificações de um shorts!"
          )
        }
      })
      .on("end", () => {
        console.log("Download do vídeo foi concluído!")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro: ",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
