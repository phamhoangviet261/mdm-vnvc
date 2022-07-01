import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RegisVcProvider } from "components";
import { PageContextProvider } from "components/context/PageContext";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PageContextProvider>
            <RegisVcProvider>
                <Head>
                    <title>{pageProps.title}</title>
                    <meta name="description" content={pageProps.description} />
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </RegisVcProvider>
        </PageContextProvider>
    );
}

export default MyApp;
