import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RegisVcProvider } from "components";
function MyApp({ Component, pageProps }: AppProps) {
    return (
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
    );
}

export default MyApp;
