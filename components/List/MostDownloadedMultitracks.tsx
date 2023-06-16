import { paths } from 'api/helpers/constants'
import fetcher from 'api/helpers/fetcher'
import { Multitrack } from 'api/models/Multitrack'
import { ResourceType } from 'api/models/ResourceType'
import downloadService from 'api/services/download'
import { PostType2 } from 'components/Post/PostType2'
import Link from 'next/link'
import useSWR from 'swr'
import SliderHorizontal from '../Slider/SliderHorizontal'

const MostDownloadedMultitracks = () => {
    const { data = [], error, isLoading } = useSWR<Multitrack[], Error>('/api/multitrack/popular', fetcher)

    return (
        <SliderHorizontal
            isLoading={isLoading}
            error={error}
            title="Más descargadas"
            data={data}
        >
            {data.map((multitrack: Multitrack) =>
                <PostType2
                    key={multitrack.id}
                    posterLink={multitrack.link}
                    posterSrc={multitrack.album.imgUrl}
                    posterAlt={multitrack.name}
                    title={<Link
                        href={multitrack.link}
                        scroll={false}
                        target='_blank'
                        onClick={() => downloadService(multitrack.multitrackId, ResourceType.MULTITRACK)}
                    >
                        {multitrack.name}
                    </Link>}
                    subtitle={
                        <>
                            <Link href={`${paths.multitracks}/${multitrack.artist.path}`} scroll={false}>{multitrack.artist.name}</Link>
                            &nbsp;-&nbsp;
                            <Link href={`${paths.multitracks}/${multitrack.artist.path}/${multitrack.album.path}`} scroll={false}>{multitrack.album.name}</Link>
                        </>
                    }
                />
            )}
        </SliderHorizontal>
    )
}

export default MostDownloadedMultitracks