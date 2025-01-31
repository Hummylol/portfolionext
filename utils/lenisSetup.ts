import Lenis from '@studio-freight/lenis'

export default function useLenis () {
    if (typeof window !== 'undefined') {
        const lenis = new Lenis()
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }
}

