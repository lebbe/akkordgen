const CHORD_INTERVALS = {
  '': [0, 4, 7], // C
  'm': [0, 3, 7], // Cm
  'maj': [0, 4, 7],
  'maj7': [0, 4, 7, 11],
  'm7': [0, 3, 7, 10],
  '7': [0, 4, 7, 10],
  'dim': [0, 3, 6],
  '°': [0, 3, 6],
  'ø': [0, 3, 6, 10], // half dim
  'sus2': [0, 2, 7],
  'sus4': [0, 5, 7],
  'add9': [0, 4, 7, 14],
  'madd9': [0, 3, 7, 14],
}

const NOTE_TO_SEMITONE = {
  'C': 0,
  'C#': 1,
  'C♯': 1,
  'Db': 1,
  'D♭': 1,
  'D': 2,
  'D#': 3,
  'D♯': 3,
  'Eb': 3,
  'E♭': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'F♯': 6,
  'Gb': 6,
  'G♭': 6,
  'G': 7,
  'G#': 8,
  'G♯': 8,
  'Ab': 8,
  'A♭': 8,
  'A': 9,
  'A#': 10,
  'A♯': 10,
  'Bb': 10,
  'B♭': 10,
  'B': 11,
}

function getChordMidiNotes(root, type, octave = 3) {
  const rootSemitone = NOTE_TO_SEMITONE[root]
  if (rootSemitone === undefined) {
    throw new Error(`Unknown root note: "${root}"`)
  }

  const intervals = CHORD_INTERVALS[type]
  if (!intervals) {
    throw new Error(`Unknown chord type: "${type}"`)
  }

  const baseMidi = 12 * (octave + 1) + rootSemitone
  return intervals.map((i) => baseMidi + i)
}
function splitChordSymbol(chordStr) {
  const durationSplit = chordStr.split(':')
  if (durationSplit.length !== 2) {
    throw new Error(`Missing or has multiple colons in "${chordStr}"`)
  }

  const [symbol, durationStr] = durationSplit
  const rootMatch = symbol.match(/^([A-G][♯♭]?)/)

  if (!rootMatch) {
    throw new Error(`Did not find a valid root note in "${chordStr}"`)
  }

  const root = rootMatch[1]
  const type = symbol.slice(root.length) // resten etter roten

  return { root, type, durationStr }
}

// PARSER
export function parseProgression(progStr) {
  const output = []

  // Fjern doble || på slutten, del takter
  const takter = progStr
    .replace(/\|\|$/, '')
    .split('|')
    .map((t) => t.trim())

  for (const takt of takter) {
    const akkorder = takt.split(/\s+/)

    for (const akkord of akkorder) {
      if (!akkord) continue // skip empty strings
      //const match = akkord.match(/^([A-G])([♯♭]?)([a-zA-Z°ø\d]*)(?::([\d.]+))$/)
      try {
        const { root, type, durationStr } = splitChordSymbol(akkord)
        const duration = parseFloat(durationStr)
        const notes = getChordMidiNotes(root, type)
        console.log(notes, duration)
        output.push({ notes, duration })
      } catch (err) {
        throw new Error(`Error in "${akkord}": ${err.message}`)
      }
    }
  }

  return output
}
