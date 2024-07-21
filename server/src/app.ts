import express from 'express';
import dfpwm from 'dfpwm';
import fs from "fs"

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const clips = ['next_train_plat4.wav', 'swt.wav', 'warrington.wav'];
    const buffers = clips.map((file) => fs.readFileSync(`./media/${file}`))
    const bufferLengths = buffers.map(buffer => buffer.length).reduce((total, length) => total + length);
    const encoder = new dfpwm.Encoder();
    const encodedData = encoder.encode(Buffer.concat(buffers, bufferLengths));

    res.send(encodedData);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});