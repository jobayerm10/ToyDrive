import puppeteer from 'puppeteer-core'

const url = process.argv[2] || 'http://localhost:5174/'

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: process.argv[3] || 'no-preference' },
])

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    errors.push(`[${msg.type()}] ${msg.text()}`)
  }
})
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

await page.goto(url, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1000))

const state = await page.evaluate(() => ({
  htmlClass: document.documentElement.className,
  lsVersion: window.locomotiveScrollVersion || null,
  docHeight: document.documentElement.scrollHeight,
  bodyOverflow: getComputedStyle(document.body).overflow,
  hasLenisCss: [...document.styleSheets].some((s) => {
    try {
      return [...s.cssRules].some((r) => r.cssText && r.cssText.includes('.lenis'))
    } catch {
      return false
    }
  }),
}))
console.log('STATE:', JSON.stringify(state, null, 2))

// sample scrollY while sending wheel events
const samples = await page.evaluate(async () => {
  const values = []
  const start = window.scrollY
  const t = setInterval(() => {
    values.push(Math.round(window.scrollY * 10) / 10)
    if (values.length > 40) {
      clearInterval(t)
    }
  }, 25)
  window.dispatchEvent(
    new WheelEvent('wheel', { deltaY: 400, bubbles: true, cancelable: true }),
  )
  await new Promise((r) => setTimeout(r, 1100))
  clearInterval(t)
  return { start, values: values.slice(0, 40) }
})
console.log('WHEEL SAMPLES:', JSON.stringify(samples))

// real mouse wheel via CDP for good measure
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 300))
const before = await page.evaluate(() => window.scrollY)
await page.mouse.wheel({ deltaY: 600 })
const ramp = []
for (let i = 0; i < 20; i++) {
  ramp.push(await page.evaluate(() => Math.round(window.scrollY * 10) / 10))
  await new Promise((r) => setTimeout(r, 30))
}
console.log('MOUSE WHEEL:', JSON.stringify({ before, ramp }))

console.log('CONSOLE ISSUES:', JSON.stringify(errors.slice(0, 15), null, 2))

await browser.close()
