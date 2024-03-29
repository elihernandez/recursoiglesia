import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document(props) {
    return (
        <Html lang="en">
            <Head>
                <Script
                    async
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                    `}
                </Script>
                <Script id="Adsense-id" data-ad-client="ca-pub-5669403217581992"
                    async
                    onError={(e) => { console.error('Script failed to load', e) }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                />
                {/* <script async src="https://analytics.recursoiglesia.com/script.js" data-website-id="d7aa227a-5446-4145-be2b-a6779cce8796"></script> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
