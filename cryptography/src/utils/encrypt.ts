import handlemsg from "./handlemsg"

export default function encrypt(message: string, key: string) {
    const { key: KEY_DOUBLE_VALUES, msg: MESSAGE_LETTERS_NUM, letters } = handlemsg(message, key)

    let altered_message_state = false
    let encryption_add: Array<number | string> = []

    let crypto_key: Array<number> | string = []

    if (KEY_DOUBLE_VALUES) {
        for (let i = 0; i < MESSAGE_LETTERS_NUM.length; i++) {
            let add = 0

            const TEMP_VALUE = MESSAGE_LETTERS_NUM[i] + KEY_DOUBLE_VALUES[i % KEY_DOUBLE_VALUES.length]

            let ENCRYPT_VALUE = TEMP_VALUE > 26 ? 26 : TEMP_VALUE

            if (TEMP_VALUE > 26) {
                altered_message_state = true
                if (i < 5) {
                    crypto_key.push(26 - MESSAGE_LETTERS_NUM[i])
                }
            } else {
                if (i < 5) {
                    crypto_key.push(KEY_DOUBLE_VALUES[i % KEY_DOUBLE_VALUES.length])
                }
            }

            if (isNaN(ENCRYPT_VALUE)) {
                add = crypto_key[i % crypto_key.length]
            } else {
                add = ENCRYPT_VALUE
            }

            const LETTER = Object.keys(letters).find(key => letters[key] == add)

            LETTER === undefined ? encryption_add.push(' ') : encryption_add.push(LETTER)
        }
    }

    return {
        message: encryption_add.join(''),
        key: crypto_key.map(item => {
            let str_item = String(item)

            return str_item.length === 1 ? str_item.padStart(2, '0') : str_item
        }).join(''),
        alteredMessage: altered_message_state
    }
}
