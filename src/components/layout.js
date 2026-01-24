import React from 'react'
import TopBar from './TopBar'
import ScrollToTop from './ScrollToTop'

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col">
			<ScrollToTop />
			<TopBar />
			<main className="flex-1">{children}</main>
		</div>
	)
}

export default Layout

export { Head } from './Head'
