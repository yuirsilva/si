import { Letters } from "../types"

export default function handlemsg(message: string, key: string) {
    let letters: Letters = {}

    for (let i = 0; i < 26; i++) {
        letters[String.fromCharCode(i + 65)] = i + 1
    }

    const WHITESPACE_REGEX = /\s/g
    const TWO_DIGIT_REGEX = /\d{2}/g

    const MESSAGE = message.toUpperCase()

    const KEY = key.replace(WHITESPACE_REGEX, '')

    const KEY_DOUBLE_VALUES = KEY.match(TWO_DIGIT_REGEX)?.map(value => parseInt(value))

    const MESSAGE_SPLIT = MESSAGE.split('')

    const MISSING_LENGTH = Math.ceil(MESSAGE_SPLIT.length / 5) * 5 - MESSAGE_SPLIT.length
    if (MESSAGE_SPLIT.length % 5 !== 0) {
        for (let j = 0; j < MISSING_LENGTH; j++) {
            MESSAGE_SPLIT.push(' ')
        }
    }

    const MESSAGE_LETTERS_NUM = MESSAGE_SPLIT.map((letter: string) => letters[letter])

    return { key: KEY_DOUBLE_VALUES, msg: MESSAGE_LETTERS_NUM, letters: letters }
}
