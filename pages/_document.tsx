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
                    async strategy="afterInteractive"
                    onError={(e) => { console.error('Script failed to load', e) }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                />
                <script async defer data-website-id="24e28ce5-ee59-4637-91a8-8a910c183099" src="https://analytics.recursoiglesia.com/umami.js"></script>
                {/* <Script
                    strategy="afterInteractive"
                    data-website-id="24e28ce5-ee59-4637-91a8-8a910c18309"
                    src="https://analytics.recursoiglesia.com/umami.js" /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
