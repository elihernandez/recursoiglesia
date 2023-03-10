import { limitPageMultitracks } from 'api/helpers/constants'
import { Multitrack } from 'api/models/Multitrack'
import axios from 'axios'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import Pagination from 'components/Pagination'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import ArtistTagWidget from 'components/Widget/ArtistTagWidget'
import FagWidget from 'components/Widget/FaqWidget'
import MultitrackPost from 'components/Widget/MultitrackPost'
import SearchWidget from 'components/Widget/SearchWidget'
import { useMediaQueries } from 'hooks/useMediaQueries'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const link = '/secuencias'

type stateProps = {
    multitracks: Array<Multitrack>,
    count: number
}

export default function SecuenciasPage(props) {
    const { isTablet } = useMediaQueries()
    const router = useRouter()
    const timerRef = useRef(null)

    const queryPage: string = router.query?.page as string
    const querySearch: string = router.query?.search as string

    const [page, setPage] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [active, setActive] = useState('todos')

    const categoryMenu = [
        {
            title: 'Recientes',
            category: 'recientes'
        },
        {
            title: 'Artistas',
            category: 'artistas'
        },
        {
            title: 'Álbumes',
            category: 'álbumes'
        },
        {
            title: 'Alabanza',
            category: 'alabanza'
        },
        {
            title: 'Adoración',
            category: 'adoración'
        },
    ]

    const onChangeText = (text: string) => {
        setIsLoading(true)
        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            if (text === '') {
                router.push(link, {}, {
                    scroll: false
                })
                setSearch(text)
                setPage('1')
            } else {
                router.push(link, {
                    query: {
                        search: text
                    }
                }, {
                    scroll: false
                })
                setSearch(text)
                setPage('1')
            }
            setData(null)
        }, 500)
    }

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            let response
            if (!search) {
                response = await axios.get(`api/secuencias/${page ? page : 1}`)
            } else {
                response = await axios.get(`api/secuencias/${page ? page : 1}/${search}`)
            }

            setData(response.data)
            setIsLoading(false)
        }

        getData()

        return () => clearTimeout(timerRef.current)
    }, [page, search])

    useEffect(() => {
        if (queryPage) setPage(queryPage)
        if (querySearch) setSearch(querySearch)
    }, [queryPage, querySearch])

    return (
        <>
            <Head>
                <title>Secuencias | Multitracks</title>
                <meta name="description" content="Secuencias gratis de muchos artistas como Gateway Worship, Elevation Worship, Upperroom, Toma Tu Lugar, Marco Barrientos, Barak, Miel San Marcos, Christine D'Clario, Bethel Music, Hillsong y más." />
            </Head>
            <PageHeading
                title='Secuencias'
                bgSrc='images/portfolio_hero_bg.jpeg'
                pageLinkPrev='/recursos'
                pageTextPrev='Recursos'
                pageLinkText='Secuencias'
            />
            <Spacing lg='40' md='40' />
            <Div className="container" id="container">
                <Spacing lg='50' md='50' />
                <Div className="row">
                    <Div className="col-lg-12">
                        <LastMultitracks />
                    </Div>
                </Div>
                <Spacing lg='100' md='40' />
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
                            <Spacing lg='80' md='40' />
                            <Div className="col-12 col-sm-6 col-lg-8">
                                <SectionHeading
                                    title='Secuencias'
                                    subtitle=''
                                />
                            </Div>
                            <Div className="col-12 col-sm-6 col-lg-4">
                                <SearchWidget title="Buscar" onChangeText={onChangeText} />
                            </Div>
                            {/* <Div className="cs-filter_menu cs-style1">
                                <ul className="cs-mp0 cs-center">
                                    <li className={active === 'todos' ? 'active' : ''}>
                                        <span onClick={() => setActive('todos')}>Todos</span>
                                    </li>
                                    {categoryMenu.map((item, index) => (
                                        <li className={active === item.category ? 'active' : ''} key={index}>
                                            <span onClick={() => setActive(item.category)}>{item.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Div> */}
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
                    : <Div className="row justify-content-between">
                        <Div className="col-lg-7">
                            <MultitracksList active={active} data={data} page={page} search={search} />
                        </Div>
                        {isTablet &&
                            <Div className="col-lg-4">
                                <ArtistTagWidget title="Artistas populares" />
                            </Div>
                        }
                        {data?.count &&
                            <Div className="col-lg-12">
                                <Pagination
                                    link={link}
                                    length={data.count}
                                    searchText={search}
                                    pageActive={page ? parseInt(page) : 1}
                                    limit={limitPageMultitracks}
                                />
                            </Div>
                        }
                    </Div >
                }
                <FagWidget />
            </Div >
        </>
    )
}

const MultitracksList = ({ active, data, page, search }) => {
    if (data?.multitracks.length === 0 && data?.count === 0) {
        return <Div>
            No se encontraron resultados {search != '' ? `para '${search}'` : ''}
        </Div>
    }

    return (
        <Div>
            <MultitrackPost title={search != '' ? `Resultados de '${search}'` : active} data={data?.multitracks} />
            <Spacing lg='80' md='40' />
        </Div>
    )

}

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Shortener } from 'api/models/Shortener'
import Link from 'next/link'

const LastMultitracks = () => {
    const [data, setData] = useState<Shortener[]>([])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipe: true,
        responsive: [
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    }

    const getData = async () => {
        const response = await axios.get('/api/acortador/lasts')
        setData(response.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h4 className="cs-sidebar_widget_title">Últimas agregadas</h4>
            {data.length > 0 ?
                <Slider {...settings}>
                    {data.map((shortener: Shortener, index: number) =>
                        <Div key={shortener.id}>
                            <Div style={{ padding: '16px' }}>
                                <Link href={shortener.link} scroll={false} target='_blank'>
                                    <Image
                                        src={shortener.multitrack.album.imgUrl}
                                        alt={shortener.multitrack.name}
                                        width={100} height={100}
                                        style={{ position: 'relative', width: '100%' }}
                                    />
                                </Link>
                                <h3 className='cs-recent_post_title' style={{ fontSize: '16px', marginTop: '8px' }}>
                                    <Link href={shortener.link} scroll={false} target='_blank'>{shortener.multitrack.name}</Link>
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">
                                    <Link href={`/secuencias/${shortener.multitrack.artist.url}`} scroll={false}>{shortener.multitrack.artist.name}</Link>
                                    &nbsp;-&nbsp;
                                    <Link href={`/secuencias/${shortener.multitrack.artist.url}/${shortener.multitrack.album.url}`} scroll={false}>{shortener.multitrack.album.name}</Link>
                                </Div>
                            </Div>
                        </Div>
                    )}
                </Slider>
                :
                <Div className="row justify-content-center" style={{ marginTop: '120px', marginBottom: '120px' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </Div>
            }
        </div>
    )
}