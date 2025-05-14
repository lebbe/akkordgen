const VALID_NOTE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const VALID_ACCIDENTALS = ['♯', '♭']
const VALID_CHORD_TYPES = [
  '',
  'm',
  'maj',
  'maj7',
  'm7',
  '7',
  'dim',
  '°',
  'ø',
  'sus2',
  'sus4',
  'add9',
  'madd9',
]

// REGEX for parsing én akkord
const CHORD_REGEX = /^([A-G])([♯♭]?)([a-zA-Z°ø\d]*):([\d.]+)$/

/**
 * Sjekk at en streng representerer en gyldig akkordprogresjon.
 * Kaster en feil med leselig feilmelding hvis noe ikke stemmer.
 */
export function validateProgression(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string.')
  }

  const trimmed = input.trim()

  if (!trimmed.endsWith('||')) {
    throw new Error('The progression must end with a double bar line: "||"')
  }

  const bars = trimmed
    .slice(0, -2)
    .split('|')
    .map((bar) => bar.trim())

  if (bars.length === 0) {
    throw new Error('No bars found in the progression.')
  }

  bars.forEach((bar, barIndex) => {
    if (!bar) {
      throw new Error(`Bar ${barIndex + 1} is empty.`)
    }

    const chords = bar.split(/\s+/).filter((c) => c)
    chords.forEach((chordStr, chordIndex) => {
      const match = chordStr.match(CHORD_REGEX)
      if (!match) {
        throw new Error(
          `Error in bar ${barIndex + 1}, chord ${chordIndex + 1}: ` +
            `"${chordStr}" does not match the format <Root><Type>:<Duration>\n` +
            `Example of a valid chord: F♯m7:2`
        )
      }

      const [_, letter, accidental, type, durationRaw] = match

      if (!VALID_NOTE_LETTERS.includes(letter)) {
        throw new Error(`Invalid note letter "${letter}" in "${chordStr}"`)
      }

      if (accidental && !VALID_ACCIDENTALS.includes(accidental)) {
        throw new Error(`Invalid accidental "${accidental}" in "${chordStr}"`)
      }

      if (!VALID_CHORD_TYPES.includes(type)) {
        throw new Error(`Unknown chord type "${type}" in "${chordStr}"`)
      }

      const duration = parseFloat(durationRaw)
      if (isNaN(duration) || duration <= 0) {
        throw new Error(
          `Invalid duration "${durationRaw}" in "${chordStr}". Must be a positive number.`
        )
      }
    })
  })

  return true
}
