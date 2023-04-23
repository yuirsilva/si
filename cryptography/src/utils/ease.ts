import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)
const ease = CustomEase.create("customEase", "0.8, 0, 0, 1")

export default ease
