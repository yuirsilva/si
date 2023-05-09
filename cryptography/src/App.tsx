import { useRef, useState } from "react"
import { gsap } from "gsap"
import { Canvas } from '@react-three/fiber'

import decrypt from "./utils/decrypt"
import encrypt from "./utils/encrypt"
import ease from "./utils/ease"

import Input from "./components/Input"
import Message from "./components/Message"
import Experience from "./components/Experience"
import OTP from "./components/OTP"

import { FormData } from "./types"

export default function App() {
    const form = useRef<HTMLFormElement>(null)
    const formContainer = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [messageChanged, setMessageChanged] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [otp, setOtp] = useState(new Array(5).fill(''))

    const [tl, setTl] = useState<gsap.core.Timeline>(gsap.timeline())

    const [formData, setFormData] = useState<FormData>({
        key: '',
        message: '',
        operation: 'encrypt'
    })

    const clicked = () => {
        const newTl = gsap.timeline()
        setTl(newTl)

        gsap.context(() => {
            newTl.to(form.current, {
                translateY: '-100%',
                duration: 1.2,
                autoAlpha: 0,
                ease
            })
        }, formContainer)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const { message, operation } = formData

        const tempObj = { decrypt, encrypt }

        const RESULT_MESSAGE = tempObj[operation](message, otp.join(''))
        console.log(RESULT_MESSAGE)

        setMessage(RESULT_MESSAGE.message)
        setMessageChanged(RESULT_MESSAGE.alteredMessage)

        setFormData(prev => {
            return {
                ...prev,
                key: RESULT_MESSAGE.key
            }
        })

        clicked()

        setIsSubmitted(true)
    }

    return <>
        <h1>encrypt, decrypt.</h1>
        <div ref={formContainer} className="w-full max-w-sm relative">
            <form ref={form} onSubmit={handleSubmit} className="bg-neutral-900 p-8 rounded-lg text-white flex flex-col w-full h-full">
                <Input type="text" name="message" label="Message" value={formData.message} setValue={setFormData} />
                <OTP otp={otp} setOtp={setOtp} />
                <fieldset className="flex gap-4">
                    <Input type="radio" name="operation" label="encrypt" value="encrypt" setValue={setFormData} />
                    <Input type="radio" name="operation" label="decrypt" value="decrypt" setValue={setFormData} />
                </fieldset>
                <button type="submit" className="rounded-full bg-indigo-600 font-semibold py-2 px-4 mt-6 hover:bg-indigo-800 active:bg-indigo-900">submit</button>
            </form>

            {isSubmitted && <Message setIsSubmitted={setIsSubmitted} timeline={tl} message={message} cle={formData.key} messageChanged={messageChanged} />}
        </div>
        <div id="indigo">
            <Canvas
                camera={{
                    fov: 70
                }}
            >
                <Experience />
            </Canvas>
        </div>
    </>
}
