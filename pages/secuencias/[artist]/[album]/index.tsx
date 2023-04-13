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

    console.log(album)

    const getNamesMultitracks = (album: Album) => {
        const arr = []

        for (const multitrack of album.multitracks) {
            arr.push(multitrack.name)
        }

        return arr.join(', ')
    }

    return (
        <>
            <Head>
                <title>{album.name} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis del álbum ${album.name} - ${artist.name}${album.multitracks.length === 0 ? '' : ': ' + getNamesMultitracks(album)}`} />
            </Head>
            <PageHeading
                title={album.name}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev={`/secuencias/${strToParam(artist.name)}`}
                pageTextPrev={artist.name}
                pageLinkText={album.name}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={album.name}
                                    subtitle='Secuencias'
                                />
                            </Div>
                        </Div>
                    </Div>
                    <Spacing lg='80' md='40' />
                    <Div className="col-12 col-md-11 col-lg-6">
                        <MultitracksList data={album.multitracks} />
                    </Div>
                </Div>
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
        select: {
            path: true,
            albums: {
                select: {
                    path: true
                }
            }
        }
    })

    let paths = []

    artists.map((artist) => {
        artist.albums.map((album) => {
            paths.push({ params: { artist: artist.path, album: album.path } })
        })
    })

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const album = await getAlbum(params.artist, params.album)

    return {
        props: {
            artist: album.artist,
            album: JSON.stringify(album)
        },
        revalidate: 60
    }
}