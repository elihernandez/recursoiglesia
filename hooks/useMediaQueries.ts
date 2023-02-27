import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const useMediaQueries = () => {
    const [isBigScreen, setIsBigScreen] = useState<boolean>(false)
    const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState<boolean>(false)
    const [isTablet, setIsTablet] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const bigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const desktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const tablet = useMediaQuery({ query: '(min-width: 991px)' })
    const mobile = useMediaQuery({ query: '(min-width: 767px)' })

    useEffect(() => {
        setIsBigScreen(bigScreen)
        setIsDesktopOrLaptop(desktopOrLaptop)
        setIsTablet(tablet)
        setIsMobile(mobile)
    }, [bigScreen, desktopOrLaptop, tablet, mobile])

    return {
        isDesktopOrLaptop,
        isBigScreen,
        isTablet,
        isMobile
    }
}