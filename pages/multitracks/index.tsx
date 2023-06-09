import { limitPageMultitracks, paths } from 'api/helpers/constants'
import { Multitrack } from 'api/models/Multitrack'
import Div from 'components/Div'
import LastMultitracksAddedList from 'components/List/LastMultitracksAddedList'
import MultitracksList from 'components/List/MultitracksList'
import { LoaderList } from 'components/Loader'
import PageHeading from 'components/PageHeading'
import Pagination from 'components/Pagination'
import SectionHeading from 'components/SectionHeading'
import Spacing from 'components/Spacing'
import ArtistTagWidget from 'components/Widget/ArtistTagWidget'
import FagWidget from 'components/Widget/FaqWidget'
import SearchWidget from 'components/Widget/SearchWidget'
import { useFetchData } from 'hooks/useFetchData'
import { useMediaQueries } from 'hooks/useMediaQueries'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { getMultitracksByPage, getMultitracksBySearch } from 'services/multitrack'

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
                {/* <Div className="row">
                    <Div className="col-lg-12">
                        <ProductsList url='/api/product/all' title="Audífonos in-ear" />
                    </Div>
                </Div> */}
                <FagWidget />
            </Div >
        </>
    )
}

type Response = {
    count: number
    multitracks: Multitrack[]
}

const MULTITRACKS_BY_PAGE_KEY = 'multitracksByPage'

const MainContent = () => {
    const { isTablet } = useMediaQueries()
    const router = useRouter()
    const { query, isReady } = router
    const { page = 1, search = '' } = query
    const timerRef = useRef(null)

    const fetcher = search === '' ? getMultitracksByPage : getMultitracksBySearch
    const queryKey = !isReady ? null : `${MULTITRACKS_BY_PAGE_KEY}-${page}-${search}`

    const { isLoading, data } = useFetchData<Response>(queryKey, () => fetcher(page as string, search as string))

    const onChangeText = (text: string) => {
        clearTimeout(timerRef.current)
        const options = { scroll: false, shallow: true }
        const query = text == '' ? null : { search: text }

        timerRef.current = setTimeout(() => {
            router.push({
                pathname: paths.multitracks,
                query: query
            }, null, options)
        }, 500)
    }

    if (!isReady) return null

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
                            <SearchWidget value={search as string} onChangeText={onChangeText} placeholder="Buscar..." />
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Spacing lg='100' md='50' />
            {isLoading && <LoaderList />}
            {!isLoading && data &&
                <Div className="row justify-content-between">
                    <Div className="col-lg-7">
                        {data?.multitracks.length === 0 && data?.count === 0 ?
                            <Div>
                                No se encontraron resultados {search != '' ? `para '${search}'` : ''}
                            </Div>
                            : <MultitracksList title={search != '' ? `Resultados de '${search}'` : 'Secuencias'} data={data?.multitracks} />
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
                            link={paths.multitracks}
                            length={data.count}
                            searchText={search as string}
                            pageActive={Number(page)}
                            limit={limitPageMultitracks}
                        />
                    </Div>
                }
            </Div>
        </>
    )
}