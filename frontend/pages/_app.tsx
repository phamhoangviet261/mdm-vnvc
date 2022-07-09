import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RegisVcProvider } from "components";
import { PageContextProvider } from "components/context/PageContext";
import { AvisoryContextProvider } from "components/context/AdvisoryContext";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AvisoryContextProvider>
            <PageContextProvider>
                <RegisVcProvider>
                    <Head>
                        <title>{pageProps.title}</title>
                        <meta name="description" content={pageProps.description} />
                        <meta
                            name="viewport"
                            content="initial-scale=1, width=device-width"
                        />
                    </Head>
                    <Component {...pageProps} />
                </RegisVcProvider>
            </PageContextProvider>
        </AvisoryContextProvider>
    );
}

export default MyApp;
