import { server } from "./server.js"

const form = document.querySelector("#form_principal")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "A URL informada não se refere à um Short. Por favor, verifique e tente novamente!")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [posIdVideo] = params.split("?si")

  content.textContent = "Gerando o texto do áudio, aguarde..."

  const transcription = await server.get("/summary/" + posIdVideo)

  content.textContent = "Realizando o resumo, aguarde..."
  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
