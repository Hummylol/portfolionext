import Lenis from '@studio-freight/lenis'

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export default function useLenis () {
    if (typeof window !== 'undefined' && !lenis) {
        lenis = new Lenis()
        function raf(time: number) {
            lenis!.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }
}

