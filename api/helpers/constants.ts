export const limitPageMultitracks = 10
export const limitPageTemplates = 24
export const limitPageSoftware = 8

export const paths = {
    api: {
        album: '/api/album',
        artist: '/api/artist',
        auth: '/api/auth',
        category: '/api/category',
        attempt: '/api/attempt',
        email: '/api/email',
        emailMultitrackRequest: '/api/email/multitrackRequest',
        emailResourceDownload: '/api/email/resourceDownload',
        multitrack: '/api/multitrack',
        newsletterSubscriber: '/api/newsletterSubscriber',
        product: '/api/product',
        request: '/api/request',
        shortener: '/api/shortener',
        software: '/api/software',
        template: '/api/template',
    },
    resources: '/resources',
    multitracks: '/multitracks',
    templates: '/templates',
    softwares: '/softwares'
}

export const isMaintenance = process.env.NEXT_PUBLIC_MANTEINANCE === 'true' ? true : false