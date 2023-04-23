import { gsap } from "gsap"
import { FC, useLayoutEffect, useRef } from "react"

import ease from "../utils/ease"

async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text.trim())
}

interface MessageProps {
    timeline: gsap.core.Timeline;
    message: string;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message: FC<MessageProps> = ({ message, timeline, setIsSubmitted }) => {
    const msg = useRef<HTMLDivElement>(null)
    const wrap = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (msg.current) {
                timeline.set(msg.current.children, { y: "100%", autoAlpha: 0 })

                timeline.fromTo(wrap.current,
                    { autoAlpha: 0, duration: 0.2 },
                    { autoAlpha: 1, duration: 0.2 })

                timeline.fromTo(msg.current.children,
                    { y: "100%", skewX: 70, skewY: 70, autoAlpha: 0, duration: 0.1 },
                    {
                        y: "0%",
                        duration: 0.4,
                        stagger: 0.05,
                        autoAlpha: 1,
                        delay: 1,
                        ease,
                        skewX: 0,
                        skewY: 0,
                    }, '<-0.8')
            }
        }, msg)

        return () => ctx.revert()
    }, [])

    const handleBack = () => {
        timeline.reverse().then(() => {
            setIsSubmitted((prevState: boolean) => !prevState)
        })
    }

    return <div ref={wrap} className="absolute flex flex-col items-center w-fit h-fit top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-center">
        <div ref={msg} className="flex w-max justify-center whitespace-pre-wrap overflow-hidden mb-8">
            {
                message
                    .trim()
                    .split('')
                    .map((letter, i) => <p key={i} className="text-lg">
                        {letter}
                    </p>)
            }
        </div>
        <button onClick={() => copyTextToClipboard(message)} type="button" className="hover:italic hover:underline">copy message</button>
        <button onClick={handleBack} type="button" className="hover:italic hover:underline">go back</button>
    </div>
}

export default Message
