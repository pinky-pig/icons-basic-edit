const gsap = window.gsap
const DrawSVGPlugin = window.DrawSVGPlugin

gsap.registerPlugin(DrawSVGPlugin)

export function onStrokeAnimate() {
  const tl = gsap.timeline({ repeat: -1, yoyo: false })
  tl
    .fromTo(
      '.btn',
      { drawSVG: '0%' },
      { duration: 0.3, drawSVG: '100%', stagger: 0.1 },
    )
}
