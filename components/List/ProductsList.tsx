import fetcher from 'api/helpers/fetcher'
import { limitStr } from 'api/helpers/strings'
import { Product } from 'api/models/Product'
import { PostType2 } from 'components/Post/PostType2'
import Link from 'next/link'
import useSWR from 'swr'
import SliderHorizontal from '../Slider/SliderHorizontal'
import downloadService from 'api/services/download'
import { ResourceType } from 'api/models/ResourceType'

const ProductsList = ({ url, title }: { url: string, title: string }) => {
    const { data = [], error, isLoading } = useSWR<Product[], Error>(url, fetcher)

    return (
        <SliderHorizontal
            isLoading={isLoading}
            error={error}
            title={title}
            data={data}
        >
            {data.map((product: Product) => {
                const images = product.images as unknown
                return <PostType2
                    key={product.id}
                    posterLink={product.link}
                    posterSrc={JSON.parse(images as string)[0]}
                    posterAlt={product.name}
                    title={<Link
                        scroll={false}
                        target='_blank'
                        href={product.link}
                        onClick={() => downloadService((product.id).toString(), ResourceType.PRODUCT)}
                    >
                        {limitStr(product.name, 36)}
                    </Link>}
                    subtitle={
                        <>
                            <p>{limitStr(product.description, 80)}</p>
                            <p>Precio aprox. ${product.price}</p>
                        </>
                    }
                />
            }
            )}
        </SliderHorizontal>

    )
}

export default ProductsList