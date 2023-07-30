import type { AppProps } from 'next/app'
import { Web3Provider } from 'providers/Web3'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import 'styles/globals.css'
import DefaultLayout from 'components/templates/newLayout'
import { ModalContext, modals } from 'hooks'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <>
      <Seo />
      <Web3Provider>
        {isMounted && (
          <ModalContext.Provider value={{ modals }}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </ModalContext.Provider>
        )}
      </Web3Provider>
    </>
  )
}
