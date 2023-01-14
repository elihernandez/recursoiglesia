import { Icon } from '@iconify/react'
import { limitPageMultitracks, maxPagesMultitracks } from 'api/helpers/constants'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
    link: string
    pageActive?: string
    length: number
}

export default function Pagination({ pageActive, link, length, searchText }) {
    const last: number = Math.ceil(length / limitPageMultitracks)
    const [firstPage, setFirstPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number>(last)
    const [pages, setPages] = useState<Array<number>>([])

    useEffect(() => {
        const p = []
        for (let index = 1; index <= last; index++) {
            p.push(index)
        }
        setPages(p)
    }, [last])

    // TODO: Terminar paginación cuando son más de 5 pages

    const setNextPages = () => {
        setFirstPage(firstPage + 5)
        setLastPage(lastPage + 5)
    }

    const getHref = (number: number) => {
        if (searchText || searchText != '') {
            return {
                pathname: link,
                query: {
                    search: searchText,
                    page: number == 1 ? 1 : number
                }
            }
        } else {
            return {
                pathname: link,
                query: {
                    page: number == 1 ? 1 : number
                }
            }
        }
    }

    return (
        <ul className="cs-pagination_box cs-center cs-white_color cs-mp0 cs-semi_bold">
            {pages.map((number) =>
                <li key={number}>
                    <Link
                        scroll={false}
                        href={getHref(number)}
                        className={`cs-pagination_item cs-center ${pageActive === number ? 'active' : ''}`}
                    >
                        {number}
                    </Link>
                </li>
            )}
            {/* {last > maxPagesMultitracks &&
                <li>
                    <Link onClick={setNextPages} href="#" className="cs-pagination_item cs-center">
                        <Icon icon="akar-icons:chevron-right" />
                    </Link>
                </li>
            } */}
        </ul>
    )
}
