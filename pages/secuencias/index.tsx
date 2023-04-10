import { limitPageMultitracks, paths } from 'api/helpers/constants'
import fetcher from 'api/helpers/fetcher'
import { Multitrack } from 'api/models/Multitrack'
import axios from 'axios'
import Div from 'components/Div'
import LastMultitracksAddedList from 'components/List/LastMultitracksAddedList'
import MultitracksList from 'components/List/MultitracksList'
import ProductsList from 'components/List/ProductsList'
import { LoaderList } from 'components/Loader'
import PageHeading from 'components/PageHeading'
import Pagination from 'components/Pagination'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import ArtistTagWidget from 'components/Widget/ArtistTagWidget'
import FagWidget from 'components/Widget/FaqWidget'
import SearchWidget from 'components/Widget/SearchWidget'
import { useMediaQueries } from 'hooks/useMediaQueries'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const link = '/secuencias'

type stateProps = {
    multitracks: Array<Multitrack>,
    count: number
}

export default function SecuenciasPage(props) {
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
            <Div className="container" id="container">
                <Spacing lg='100' md='50' />
                <Div className="row">
                    <Div className="col-lg-12">
                        <LastMultitracksAddedList />
                    </Div>
                </Div>
                <Spacing lg='100' md='50' />
                <MainContent />
                <Spacing lg='100' md='50' />
                <Div className="row">
                    <Div className="col-lg-12">
                        <ProductsList url='/api/product/all' title="Audífonos in-ear" />
                    </Div>
                </Div>
                <FagWidget />
            </Div >
        </>
    )
}

const MainContent = () => {
    const { isTablet } = useMediaQueries()
    const router = useRouter()
    const timerRef = useRef(null)

    const queryPage: string = router.query?.page as string
    const querySearch: string = router.query?.search as string

    const [params, setParams] = useState({ page: '', search: '' })
    const [data, setData] = useState<stateProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onChangeText = (text: string) => {
        setIsLoading(true)
        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            if (text === '') {
                router.push(link, {}, {
                    scroll: false
                })
            } else {
                router.push(link, {
                    query: {
                        search: text
                    }
                }, {
                    scroll: false
                })
            }

            setParams({
                page: '1',
                search: text
            })
            setData(null)
        }, 500)
    }

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = !params.search
                ? await axios.get(`${paths.api.multitrack}/${params.page ? params.page : 1}`)
                : await axios.get(`${paths.api.multitrack}/${params.page ? params.page : 1}/${params.search}`)

            setData(response.data)
            setIsLoading(false)
        }

        getData()
        return () => clearTimeout(timerRef.current)
    }, [params.page, params.search])

    useEffect(() => {
        if (queryPage) setParams({
            ...params,
            page: queryPage
        })
        if (querySearch) setParams({
            ...params,
            search: querySearch
        })
    }, [queryPage, querySearch])

    return (
        <>
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
                            <SearchWidget onChangeText={onChangeText} placeholder="Buscar..." />
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Spacing lg='100' md='50' />
            {isLoading
                ? <LoaderList />
                : <Div className="row justify-content-between">
                    <Div className="col-lg-7">
                        {data?.multitracks.length === 0 && data?.count === 0 ?
                            <Div>
                                No se encontraron resultados {params.search != '' ? `para '${params.search}'` : ''}
                            </Div>
                            : <MultitracksList title={params.search != '' ? `Resultados de '${params.search}'` : 'Secuencias'} data={data?.multitracks} />
                        }
                    </Div>
                    {isTablet &&
                        <Div className="col-lg-4">
                            <ArtistTagWidget title="Artistas populares" />
                        </Div>
                    }
                </Div >
            }
            <Spacing lg='100' md='50' />
            <Div className="row">
                {data?.count && !isLoading &&
                    <Div className="col-lg-12">
                        <Pagination
                            link={link}
                            length={data.count}
                            searchText={params.search}
                            pageActive={params.page ? parseInt(params.page) : 1}
                            limit={limitPageMultitracks}
                        />
                    </Div>
                }
            </Div>
        </>
    )
}