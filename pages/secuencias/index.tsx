import { Multitrack } from 'api/models/Multitrack'
import axios from 'axios'
import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import Pagination from 'components/Pagination'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import MultitrackPost from 'components/Widget/MultitrackPost'
import SearchWidget from 'components/Widget/SearchWidget'
import Head from 'next/head'
import FagWidget from 'components/Widget/FaqWidget'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { limitPageMultitracks } from 'api/helpers/constants'
import { InferGetStaticPropsType } from 'next'

const link = '/secuencias'

type stateProps = {
    multitracks: Array<Multitrack>,
    count: number
}

export default function SecuenciasPage(props) {
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
        }, 2000)
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
                <Div className="row">
                    <Div className="col-lg-12">
                        <Div className="cs-portfolio_1_heading">
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
                    : <MultitracksList active={active} data={data} page={page} search={search} />
                }
                <FagWidget />
            </Div>
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
            {data?.count &&
                <Pagination
                    link={link}
                    length={data.count}
                    searchText={search}
                    pageActive={page ? parseInt(page) : 1}
                    limit={limitPageMultitracks}
                />
            }
            <Spacing lg='40' md='40' />
        </Div>
    )
}