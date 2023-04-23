import handlemsg from "./handlemsg"

export default function decrypt(message: string, key: string) {

    const { key: KEY_DOUBLE_VALUES, msg: MESSAGE_LETTERS_NUM, letters } = handlemsg(message, key)

    let decryption_sub: Array<number | string> = []
    if (KEY_DOUBLE_VALUES) {

        for (let i = 0; i < MESSAGE_LETTERS_NUM.length; i++) {
            const SUB = MESSAGE_LETTERS_NUM[i] - KEY_DOUBLE_VALUES[i % KEY_DOUBLE_VALUES.length]

            const LETTER = Object.keys(letters).find(key => letters[key] == SUB)
            LETTER === undefined ? decryption_sub.push(' ') : decryption_sub.push(LETTER)
        }
    }

    return decryption_sub.join('')
}
