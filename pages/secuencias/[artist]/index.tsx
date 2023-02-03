import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { InferGetStaticPropsType } from 'next'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import AlbumPost from 'components/Widget/AlbumPost'
import { Album } from '@prisma/client'
import { paramToStr, strToParam } from 'api/helpers/strings'
import { prisma } from 'api/config/db'

type stateProps = {
    albums: Array<Album>,
    count: number
}

export default function ArtistPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const { artist } = props
    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = await axios.get(`/api/artist/${artist}`)
            setData(response.data)
            setIsLoading(false)
        }

        if (artist != '') getData()
    }, [artist])

    return (
        <>
            <Head>
                <title>{artist} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis del artista ${artist}`} />
            </Head>
            <PageHeading
                title={artist}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev='/secuencias'
                pageTextPrev='Secuencias'
                pageLinkText={artist}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={artist}
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

export async function getStaticPaths() {
    const artists = await prisma.artist.findMany({})

    const paths = artists.map((artist) => ({
        params: { artist: strToParam(artist.name) },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            artist: paramToStr(params.artist)
        }
    }
}