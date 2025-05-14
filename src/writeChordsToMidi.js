import MidiWriter from 'midi-writer-js'
import fs from 'fs'

// 🎵 Funksjon som lager MIDI-fil fra akkord-array
export function writeChordsToMidi(
  chordsArray,
  filename = 'output.mid',
  bpm = 120
) {
  const track = new MidiWriter.Track()
  track.setTempo(bpm)
  track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 })) // Akustisk piano

  let currentWait = 0

  chordsArray.forEach((chord, index) => {
    const { notes, duration } = chord
    debugger
    // Lag NoteEvent for hele akkorden
    const event = new MidiWriter.NoteEvent({
      pitch: notes,
      duration: beatsToDurationString(duration),
      wait: currentWait,
      velocity: 80,
    })

    track.addEvent(event)
    currentWait = 0 // etter første akkord
  })

  const writer = new MidiWriter.Writer(track)
  fs.writeFileSync(filename, writer.buildFile())
  console.log(
    `🎼 Wrote the file "${filename}" with ${chordsArray.length} chords.`
  )
}

// 🔢 Hjelpefunksjon: oversett beats til varighet
function beatsToDurationString(beats) {
  const durationMap = {
    4: '1', // helnote
    2: '2', // halvnote
    1: '4', // kvart
    0.5: '8', // åttendedel
    0.25: '16', // sekstendelsnote
  }

  if (durationMap[beats]) return durationMap[beats]

  // Hvis ikke eksakt match, bruk ticks direkte
  return { duration: 'T' + Math.round(beats * 128) }
}
