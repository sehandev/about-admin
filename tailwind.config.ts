import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  plugins: [require('rippleui')],
}
export default config
