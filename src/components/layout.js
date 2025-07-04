import React from 'react'
import TopBar from './TopBar'
import ScrollToTop from './ScrollToTop'

const Layout = ({ children }) => {
	return (
		<>
			{/* <ScrollToTop /> */}
			<TopBar />
			<main>{children}</main>
		</>
	)
}

export default Layout

export { Head } from './Head'
