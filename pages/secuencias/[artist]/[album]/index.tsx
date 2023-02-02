import { Album } from '@prisma/client'
import { paramToStr, strToParam } from 'api/helpers/strings'
import axios from 'axios'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import MultitrackPost from 'components/Widget/MultitrackPost'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type stateProps = {
    albums: Array<Album>,
    count: number
}

export default function AlbumPage(props) {
    const router = useRouter()

    const [queryArtist, setQueryArtist] = useState<string>('')
    const [queryAlbum, setQueryAlbum] = useState<string>('')
    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (router.query?.artist) setQueryArtist(paramToStr(router.query.artist as string))
        if (router.query?.album) setQueryAlbum(paramToStr(router.query.album as string))
    }, [router])

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = await axios.get(`/api/album/${queryAlbum}`)
            console.log(response.data)

            setData(response.data)
            setIsLoading(false)
        }

        if (queryAlbum != '') getData()
    }, [queryAlbum])

    return (
        <>
            <Head>
                <title>{queryAlbum} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis de ${queryAlbum}`} />
            </Head>
            <PageHeading
                title={queryAlbum}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev={`/secuencias/${strToParam(queryArtist)}`}
                pageTextPrev={queryArtist}
                pageLinkText={queryAlbum}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={queryAlbum}
                                    subtitle='Secuencias'
                                />
                            </Div>
                        </Div>
                    </Div>
                </Div>
                <Spacing lg='80' md='40' />
                {isLoading
                    ?
                    <Div className="container">
                        <Div className="row justify-content-center">
                            <Spacing lg='50' md='50' />
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </Div>
                    </Div>
                    : <MultitracksList data={data} />
                }
            </Div>
        </>
    )
}

const MultitracksList = ({ data }) => {

    if (data?.album?.multitracks.length === 0) {
        return <Div>
            No se encontraron resultados
        </Div>
    }

    return (
        <Div>
            <MultitrackPost title='Canciones' data={data?.album?.multitracks} />
            <Spacing lg='80' md='40' />
        </Div>
    )
}