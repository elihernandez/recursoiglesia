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
import { InferGetStaticPropsType } from 'next'
import { prisma } from 'api/config/db'

type stateProps = {
    albums: Array<Album>,
    count: number
}

export default function AlbumPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const { artist, album } = props

    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = await axios.get(`/api/album/${album}`)
            setData(response.data)
            setIsLoading(false)
        }

        if (album != '') getData()
    }, [album])

    return (
        <>
            <Head>
                <title>{album} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis del álbum ${album} - ${artist}`} />
            </Head>
            <PageHeading
                title={album}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev={`/secuencias/${strToParam(artist)}`}
                pageTextPrev={artist}
                pageLinkText={album}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={album}
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

export async function getStaticPaths() {
    const artists = await prisma.artist.findMany({
        include: {
            albums: true
        }
    })

    let paths = []

    artists.map((artist) => {
        artist.albums.map((album) => {
            paths.push({ params: { artist: strToParam(artist.name), album: strToParam(album.name) } })
        })
    })


    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            artist: paramToStr(params.artist),
            album: paramToStr(params.album)
        }
    }
}