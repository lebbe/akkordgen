# 🎹 Akkordgen – Generate MIDI files from chord progressions

[![npm version](https://badge.fury.io/js/akkordgen.svg)](https://www.npmjs.com/package/akkordgen)

**Akkordgen** is a CLI tool for converting readable chord progressions into playable MIDI files. It supports rich chord types, Unicode and ASCII accidentals, and variable beat durations.

It pairs perfectly with **[ChordGPT](https://chatgpt.com/g/g-6824eaafa268819192101595c7f84ae3-chordgpt)**, a ChatGPT-powered assistant that helps you compose progressions in the correct format.

---

## 🚀 Installation

Requries that you have installed node/npm.

```
npm install -g akkordgen
```

You can now run `akkordgen` from anywhere in your terminal.

---

## 🧠 Format

Chord progressions must follow this grammar:

- Chords use the format: `<root><type>:<duration>`
- Bars are separated by `|`, and the progression must end with `||`
- Both Unicode and ASCII accidentals are supported:
  - `♯` or `#` for sharp
  - `♭` or `b` for flat
- Duration is in beats (e.g. `0.25`, `0.5`, `1`, `2`, `4`)

**Examples:**

```
F♯m7:4 | B7:4 | Emaj7:4 ||
Cmaj7:2 Dm7:2 | G7:4 ||
A#m7:1 G#7:1 D#m7:2 | F#maj7:4 ||
```

---

## 🧪 Usage

Basic usage:

```
akkordgen "F#m7:4 | B7:4 | Emaj7:4 ||" progression.mid
```

This generates a file called `progression.mid`.

---

## 🤖 Compose with ChordGPT

**[ChordGPT](https://chatgpt.com/g/g-6824eaafa268819192101595c7f84ae3-chordgpt)** is a ChatGPT-based assistant designed to help you:

- Compose harmonically sound progressions
- Explore keys, moods, and rhythmic structures
- Output progressions directly in Akkordgen format

**Example prompt:**

> Give me a jazzy ii–V–I in G major with 2 beats per chord.

**ChordGPT output:**

```
Am7:2 D7:2 | Gmaj7:4 ||
```

You can paste this directly into `akkordgen`.

---

## 🧑‍💻 License

MIT © Lars-Erik Bruce
