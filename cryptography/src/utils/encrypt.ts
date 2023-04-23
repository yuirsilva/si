import handlemsg from "./handlemsg"

export default function encrypt(message: string, key: string) {

    const { key: KEY_DOUBLE_VALUES, msg: MESSAGE_LETTERS_NUM, letters } = handlemsg(message, key)

    let encryption_add: Array<number | string> = []

    if (KEY_DOUBLE_VALUES) {

        for (let i = 0; i < MESSAGE_LETTERS_NUM.length; i++) {
            let add = 0

            const ENCRYPT_VALUE = MESSAGE_LETTERS_NUM[i] + KEY_DOUBLE_VALUES[i % KEY_DOUBLE_VALUES.length]

            if (isNaN(ENCRYPT_VALUE)) {
                add = KEY_DOUBLE_VALUES[i % KEY_DOUBLE_VALUES.length]
            } else {
                add = ENCRYPT_VALUE
            }

            const LETTER = Object.keys(letters).find(key => letters[key] == add)

            LETTER === undefined ? encryption_add.push(' ') : encryption_add.push(LETTER)
        }
    }

    return encryption_add.join('')
}
