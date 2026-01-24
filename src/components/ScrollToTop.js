import { useEffect } from 'react'
import { useLocation } from '@reach/router'

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		// Use instant scroll and target multiple elements for iOS Safari compatibility
		window.scrollTo(0, 0)
		document.documentElement.scrollTop = 0
		document.body.scrollTop = 0
	}, [pathname])

	return null
}

export default ScrollToTop
