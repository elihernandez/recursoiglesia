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
                <Script
                    async
                    id="acortaz-net"
                    strategy='afterInteractive'
                >
                    {`
                        var app_url = 'https://acortaz.net/';
                        var app_api_token = '6dcb86b1ef0a8448c8143cfb7934bbd5b5ff90e1';
                        var app_advert = 2;
                        var app_domains = ["mega.nz","drive.google.com"];
                    `}
                </Script>
                <Script async strategy='afterInteractive' src="https://acortaz.net/js/full-page.js" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
