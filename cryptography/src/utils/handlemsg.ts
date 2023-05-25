import { Letters } from "../types"

export default function handlemsg(message: string, key: string) {
    let letters: Letters = {}

    for (let i = 0; i < 26; i++) {
        letters[String.fromCharCode(i + 65)] = i + 1
    }

    const TWO_DIGIT_REGEX = /\d{2}/g

    const MESSAGE_SPLIT = message
        .toUpperCase()
        .split('')

    const KEY_DOUBLE_VALUES = key.match(TWO_DIGIT_REGEX)?.map(value => parseInt(value))

    const MISSING_LENGTH = Math.ceil(MESSAGE_SPLIT.length / 5) * 5 - MESSAGE_SPLIT.length
    const PADDED_MESSAGE = MESSAGE_SPLIT.concat(Array.from({ length: MISSING_LENGTH }, () => ' '))

    const MESSAGE_LETTERS_NUM = PADDED_MESSAGE.map((letter: string) => letters[letter])

    return { key: KEY_DOUBLE_VALUES, msg: MESSAGE_LETTERS_NUM, letters: letters }
}
