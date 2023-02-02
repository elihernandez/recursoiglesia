import { Album } from '@prisma/client'
import { paramToStr } from 'api/helpers/strings'
import axios from 'axios'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import AlbumPost from 'components/Widget/AlbumPost'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type stateProps = {
    albums: Array<Album>,
    count: number
}

export default function ArtistPage(props) {
    const router = useRouter()

    const [queryArtist, setQueryArtist] = useState<string>('')
    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (router.query?.artist) setQueryArtist(paramToStr(router.query.artist as string))
    }, [router])

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = await axios.get(`/api/artist/${queryArtist}`)
            console.log(response.data)

            setData(response.data)
            setIsLoading(false)
        }

        if (queryArtist != '') getData()
    }, [queryArtist])

    return (
        <>
            <Head>
                <title>{queryArtist} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis de ${queryArtist}`} />
            </Head>
            <PageHeading
                title={queryArtist}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev='/secuencias'
                pageTextPrev='Secuencias'
                pageLinkText={queryArtist}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={queryArtist}
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
                    : <AlbumList data={data} />
                }
            </Div>
        </>
    )
}

const AlbumList = ({ data }) => {

    if (data?.artist.albums.length === 0) {
        return <Div>
            No se encontraron resultados
        </Div>
    }

    return (
        <Div>
            <AlbumPost title='Álbumes' artist={data?.artist} data={data?.artist.albums} />
            <Spacing lg='80' md='40' />
        </Div>
    )
}