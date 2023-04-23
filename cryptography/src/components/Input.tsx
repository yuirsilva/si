import { FC } from "react"
import { FormData } from "../types";

interface InputProps {
    label: string;
    name: string;
    type: 'text' | 'radio';
    value: string;
    setValue: React.Dispatch<React.SetStateAction<FormData>>;
}

const Input: FC<InputProps> = ({ label, name, type, value, setValue }) => {

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target

        setValue(prev => {
            return { ...prev, [name]: value }
        })
    }

    return <label className={
        type === 'text'
            ?
            `flex flex-col gap-3 mb-6 last:mb-0`
            :
            `flex flex-row-reverse justify-end items-center gap-2`
    }>
        <span>{label}</span>
        <input
            type={type}
            name={name}
            autoComplete="off"
            required
            className={
                type === 'text'
                    ?
                    `bg-transparent outline-none border border-solid
                border-indigo-400/40 p-2 rounded-lg hover:bg-zinc-800 focus:border-transparent
                focus:outline-2 focus:outline-indigo-500`
                    :
                    `appearance-none bg-white w-4 h-4 rounded-full border-4 border-zinc-950
                grid place-content-center before:w-2.5 before:h-2.5 before:rounded-full before:scale-0
                before:transition-transform before:duration-[120ms] before:ease-in-out
                before:bg-indigo-600 checked:before:scale-100`
            }

            value={value}
            onChange={handleInputChange}
        />
    </label>
}

export default Input
