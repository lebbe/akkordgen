#!/usr/bin/env node

import { parseProgression } from './parseProgression.js'
import { validateProgression } from './validateProgression.js'
import { writeChordsToMidi } from './writeChordsToMidi.js'

const [, , rawInput, outputFilename = 'progresjon.mid'] = process.argv

if (!rawInput) {
  console.error('🚫 You must provide a chord progression as an argument.')
  console.error(
    '👉 Example: node index.js "A♭maj7:4 | Fm7:4 | D♭7:4 | G♭maj7:4 ||"'
  )
  process.exit(1)
}

try {
  validateProgression(rawInput)

  const chords = parseProgression(rawInput)

  writeChordsToMidi(chords, outputFilename)
} catch (err) {
  console.error('🚫 Error:', err.message)
  process.exit(1)
}
