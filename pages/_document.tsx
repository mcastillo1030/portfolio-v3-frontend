import { Html, Head, Main, NextScript } from 'next/document'
import usePageTheme from '../lib/hooks/usePageTheme'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}