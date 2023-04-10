import fetcher from 'api/helpers/fetcher'
import { Shortener } from 'api/models/Shortener'
import Link from 'next/link'
import useSWR from 'swr'
import SliderHorizontal from '../Slider/SliderHorizontal'
import { PostType2 } from 'components/Post/PostType2'
import { Multitrack } from 'api/models/Multitrack'
import downloadService from 'api/services/download'
import { ResourceType } from 'api/models/ResourceType'

const LastMultitracksAddedList = () => {
    const { data = [], error, isLoading } = useSWR<Multitrack[], Error>('/api/multitrack/lasts', fetcher)

    return (
        <SliderHorizontal
            isLoading={isLoading}
            error={error}
            title="Últimas agregadas"
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
                            <Link href={`/secuencias/${multitrack.artist.path}`} scroll={false}>{multitrack.artist.name}</Link>
                            &nbsp;-&nbsp;
                            <Link href={`/secuencias/${multitrack.artist.path}/${multitrack.album.path}`} scroll={false}>{multitrack.album.name}</Link>
                        </>
                    }
                />
            )}
        </SliderHorizontal>
    )
}

export default LastMultitracksAddedList