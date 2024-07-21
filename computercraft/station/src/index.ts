import * as dfpwm from "cc.audio.dfpwm";
const speaker = peripheral.wrap("right") as SpeakerPeripheral;

const decoder = dfpwm.make_decoder();

for (const [chunk] of io.lines("scotrail.dfpwm", 16 * 1024)) {
  const buffer = decoder(chunk);

  while (!speaker.playAudio(buffer, 3)) {
    os.pullEvent("speaker_audio_empty");
  }
}
// awooga
// speaker.playSound("entity.creeper.primed");
