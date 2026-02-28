import React from "react"
import { Link } from "gatsby"

const Button = ({ btnInfo }) => {

	const { path = false, name, style, onClick, img = false, disabled = false, stack = false, noFocus = false } = btnInfo

	// Add dark mode classes based on button style
	const getDarkModeClasses = (style) => {
		// Skip Tailwind dark classes for 'big' buttons - handled in SCSS
		if (style.includes('big')) return ''

		switch(style) {
			case 'primary':
				return 'dark:!bg-[rgb(120,70,45)] dark:!border-[rgb(120,70,45)] dark:hover:!bg-orange-600'
			case 'alt':
				return 'dark:!bg-[#4A3F6B] dark:!border-[#4A3F6B] dark:hover:!bg-purple-600'
			case 'secondary':
				return 'dark:!border-neutral-300 dark:hover:!bg-neutral-700 dark:hover:!border-neutral-700'
			case 'gray':
				return 'dark:!bg-neutral-600 dark:!border-neutral-600 dark:hover:!bg-neutral-700'
			default:
				return ''
		}
	}

	const darkModeClasses = getDarkModeClasses(style)
	const stackClass = stack ? ' stacked' : ''

	const content = stack ? (
		<span className="btn-stack">
			{img}
			<span>{name}</span>
		</span>
	) : (
		<>{img}{name}</>
	)

	return(<>
		{path ?
			<Link to={path} id={name.toLowerCase()} data-testid={name.toLowerCase()} className={`show-btn ${style} ${darkModeClasses}${stackClass} ${disabled ? 'disabled' : ''}`} type='button' onClick={disabled ? undefined : onClick} tabIndex={noFocus ? -1 : undefined}>{content}</Link> :
			<button id={name.toLowerCase()} data-testid={name.toLowerCase()} className={`show-btn ${style} ${darkModeClasses}${stackClass} ${disabled ? 'disabled' : ''}`} type='button' disabled={disabled} onClick={disabled ? undefined : onClick} tabIndex={noFocus ? -1 : undefined}>{content}</button>
		}
	</>)
}

export default Button