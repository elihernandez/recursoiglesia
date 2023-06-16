import Div from 'components/Div'
import { LoaderList } from 'components/Loader'
import { useMediaQueries } from 'hooks/useMediaQueries'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

type ListHorizontalProps = {
    isLoading: boolean
    error: Error
    title: string
    children: any
    data: any[]
}

export function SliderHorizontal({ isLoading, error, title, children, data }: ListHorizontalProps) {
    const { isMobile } = useMediaQueries()

    if (error) {
        return null
    }

    if (isLoading) {
        return <LoaderList />
    }

    if (data.length === 0) {
        return null
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
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

    return (
        <Div style={{
            paddingLeft: !isMobile ? '40px' : 0,
            paddingRight: !isMobile ? '40px' : 0,
        }}>
            <h4 className="cs-sidebar_widget_title">{title}</h4>
            <Slider {...settings}>
                {children}
            </Slider>
        </Div>
    )
}

export default SliderHorizontal