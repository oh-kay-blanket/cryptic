import React from "react"
import { Link } from "gatsby"

const Button = ({ btnInfo }) => {

	const { path = false, name, style, onClick, img = false, disabled = false } = btnInfo

	// Add dark mode classes based on button style
	const getDarkModeClasses = (style) => {
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

	return(<>
		{path ?
			<Link to={path} id={name.toLowerCase()} data-testid={name.toLowerCase()} className={`show-btn ${style} ${darkModeClasses} ${disabled ? 'disabled' : ''}`} type='button' onClick={disabled ? undefined : onClick}>{name}</Link> :
			<button id={name.toLowerCase()} data-testid={name.toLowerCase()} className={`show-btn ${style} ${darkModeClasses} ${disabled ? 'disabled' : ''}`} type='button' disabled={disabled} onClick={disabled ? undefined : onClick}>{name}{img}</button>
		}
	</>)
}

export default Button