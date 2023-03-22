import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import 'styles/globals.css'
import DefaultLayout from 'components/templates/newLayout'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <ChakraProvider>
      <Seo />
      <Web3Provider>
        {isMounted && (
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        )}
      </Web3Provider>
    </ChakraProvider>
  )
}
