import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio) {
  //return transcriptionExample
  try {
    console.log("Realizando a transcrição do áudio para texto...")
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )

    const transcription = await transcribe(audio, {
      chunk_length_s: 50,
      stride_length_s: 10,
      languages: "Portuguese",
      task: "transcribe",
    })

    console.log("Transcrição finalizada!")
    console.log(transcription)

    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(error)
  }
}
