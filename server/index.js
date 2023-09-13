import cors from 'cors';
import express from 'express';

import {download} from "./download.js";

const app = express();

app.use(cors());

app.get('/summary/:id', (request, response) => {
    download(request.params.id);
    
    response.json({result: "Download do vídeo foi realizado com sucesso!"});
});

app.listen(3333, () => console.log("O servidor está sendo executado na porta 3333."));