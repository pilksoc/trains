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
        const encoder = new dfpwm.Encoder();
        const encodedData = encoder.encode(Buffer.concat(buffers, bufferLengths));

        if (req.query['wav'] != null) {
            res.send(Buffer.concat(buffers, bufferLengths))
        } else {
            res.send(encodedData);
        }
    } catch (e) {
        if (e.code === 'ENOENT') {
            const voxLine = e.path.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, "");
            res.status(404).send({ error: "Could not find VOX line", detail: `Line "${voxLine}" does not exist.` });
        } else {
            res.status(500).send({ error: "Internal server error", detail: "An internal error has occurred whilst handling your request. Please try again later." })
        }
    }
});

app.listen(port, () => {
    return console.log(`Leo VOX is listening at http://localhost:${port}`);
});