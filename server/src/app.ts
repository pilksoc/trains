import express from 'express';
import dfpwm from 'dfpwm';
import fs from "fs"

const app = express();
const port = 3000;

app.get('/', async (req, res) => {

    if (req.query['m'] == null) {
        res.send('Please specify your message as a parameter "m".');
        return;
    }

    try {
        const msg = req.query['m'].toString().split(" ")
        const clips = msg.map(part => `${part.toLowerCase()}.wav`);
        const buffers = clips.map((file) => fs.readFileSync(`./media/${file}`))
        const bufferLengths = buffers.map(buffer => buffer.length).reduce((total, length) => total + length);

        if (req.query['wav'] != null) {
            res.send(Buffer.concat(buffers, bufferLengths))
        } else {
            res.send(encodedData);
        }
    } catch (e) {
        res.send(e);
    }
});

app.listen(port, () => {
    return console.log(`Leo VOX is listening at http://localhost:${port}`);
});