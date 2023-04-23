import { Dispatch, SetStateAction, FC, useRef } from "react"

interface OtpProps {
    setOtp: Dispatch<SetStateAction<string[]>>;
    otp: string[];
}

const Otp: FC<OtpProps> = ({ otp, setOtp }) => {
    const inputs = useRef<HTMLInputElement[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOTP: string[] = [...otp]
        newOTP[index] = e.target.value.replace(/\D/, '')

        setOtp(newOTP)


        if (index < inputs.current.length - 1 && e.target.value.length == 2) {
            if (index == 4) { return }
            inputs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1].focus()
        }
    }

    return (
        <label className="flex flex-col gap-3 mb-6">
            <span>Key</span>
            <div className="grid grid-cols-5 gap-2 w-full" >
                {otp.map((_, i) =>
                    <input
                        type="text"
                        key={i}
                        ref={(el) => el ? inputs.current.push(el) : null}
                        maxLength={2}
                        value={otp[i]}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        pattern="[0-9]*"
                        title="Enter numbers only"
                        required
                        className="text-center flex-grow bg-transparent outline-none border
                        border-solid border-indigo-400/40 p-2 rounded-lg focus:border-transparent
                        focus:outline-2 focus:outline-indigo-500"
                    />
                )}
            </div>
        </label>
    )
}

export default Otp
