import { prisma } from 'api/config/db'
import { paramToStr, strToParam } from 'api/helpers/strings'
import { Album } from 'api/models/Album'
import { Artist } from 'api/models/Artist'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import AlbumPost from 'components/Widget/AlbumPost'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getArtist } from 'pages/api/artist/[name]'


export default function ArtistPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const artist: Artist = JSON.parse(props.artist)
    const { name: artistName } = artist

    return (
        <>
            <Head>
                <title>{artistName} | Secuencias/Multitracks</title>
                <meta name="description" content={`Secuencias/Multitracks gratis del artista ${artistName}`} />
            </Head>
            <PageHeading
                title={artistName}
                bgSrc='/images/portfolio_hero_bg.jpeg'
                pageLinkPrev='/secuencias'
                pageTextPrev='Secuencias'
                pageLinkText={artistName}
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title={artistName}
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
                    : <AlbumList data={data} />
                } */}
                <AlbumList artist={artist} albums={artist.albums} />
            </Div>
        </>
    )
}

const AlbumList = ({ artist, albums }: { artist: Artist, albums: Array<Album> }) => {

    if (albums.length === 0) {
        return <Div>
            No se encontraron resultados
        </Div>
    }

    return (
        <Div>
            <AlbumPost title='Álbumes' artist={artist} data={albums} />
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
    const artist = await getArtist(paramToStr(params.artist))

    return {
        props: {
            artist: JSON.stringify(artist)
        }
    }
}