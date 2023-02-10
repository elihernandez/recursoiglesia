import { prisma } from 'api/config/db'
import { paramToStr, strToParam } from 'api/helpers/strings'
import { Album } from 'api/models/Album'
import { Multitrack } from 'api/models/Multitrack'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import MultitrackPost from 'components/Widget/MultitrackPost'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getAlbum } from 'pages/api/album/[name]'

export default function AlbumPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const artist = props.artist
    const album = JSON.parse(props.album)
    const { name: albumName } = album

    const getNamesMultitracks = (album: Album) => {
        const arr = []
        album.multitracks.forEach((multitrack: Multitrack) => {
            arr.push(multitrack.name)
        })

        return arr.join(', ')
    }

    return (
        <>
            <Head>
                <title>{albumName} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis del álbum ${albumName} - ${artist}${album.multitracks.length === 0 ? '' : ': ' + getNamesMultitracks(album)}`} />
            </Head>
            <PageHeading
                title={albumName}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev={`/secuencias/${strToParam(artist)}`}
                pageTextPrev={artist}
                pageLinkText={albumName}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={albumName}
                                    subtitle='Secuencias'
                                />
                            </Div>
                        </Div>
                    </Div>
                </Div>
                <Spacing lg='80' md='40' />
                {/* {isLoading
                    ?
                    <Div className="container">
                        <Div className="row justify-content-center">
                            <Spacing lg='50' md='50' />
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </Div>
                    </Div>
                    : <MultitracksList data={album.multitracks} />
                } */}
                <MultitracksList data={album.multitracks} />
            </Div>
        </>
    )
}

const MultitracksList = ({ data }: { data: Array<Multitrack> }) => {

    if (data.length === 0) {
        return <Div>
            No se encontraron resultados
        </Div>
    }

    return (
        <Div>
            <MultitrackPost title='Canciones' data={data} />
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
    const album = await getAlbum(paramToStr(params.album), paramToStr(params.artist))

    return {
        props: {
            artist: paramToStr(params.artist),
            album: JSON.stringify(album)
        }
    }
}