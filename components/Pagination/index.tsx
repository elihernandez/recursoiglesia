import { Icon } from '@iconify/react'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
    pageActive?: number
    link: string
    length: number
    searchText: string
    limit: number
}

export default function Pagination({ pageActive, link, length, searchText, limit }: PaginationProps) {
    const pageCount: number = Math.ceil(length / limit)

    const getHref = (number: number) => {
        const query = {
            page: number == 1 ? 1 : number
        }

        if (searchText || searchText != '') {
            query['search'] = searchText
        }

        return {
            pathname: link,
            query: query
        }
    }


    const PreviousLabel = () => {
        if (pageActive === 1) {
            return null
        }

        return <li>
            <Link scroll={false} href={getHref(pageActive - 1)} className="cs-pagination_item cs-center">
                <Icon icon="akar-icons:chevron-left" />
            </Link>
        </li>
    }

    const NextLabel = () => {
        if ((pageCount <= limit) || (pageActive === pageCount)) {
            return null
        }

        return <li>
            <Link scroll={false} href={getHref(pageActive + 1)} className="cs-pagination_item cs-center">
                <Icon icon="akar-icons:chevron-right" />
            </Link>
        </li>
    }

    return (
        <>
            <ReactPaginate
                breakLabel=""
                previousLabel={<PreviousLabel />}
                nextLabel={<NextLabel />}
                pageLabelBuilder={(page) => <Link
                    scroll={true}
                    href={getHref(page)}
                    className={`cs-pagination_item cs-center ${pageActive === page ? 'active' : ''}`}>
                    {page}
                </Link>}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={pageActive}
                renderOnZeroPageCount={null}
                activeClassName="active"
                className="cs-pagination_box cs-center cs-white_color cs-mp0 cs-semi_bold"
            />
        </>
    )
}