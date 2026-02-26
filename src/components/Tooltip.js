import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

// Map type names to URL paths
const getLearnPath = (type) => {
	const map = {
		'& Lit.': 'lit',
		'Double Definition': 'double-definition',
		'Hidden Word': 'hidden-word',
		'Letter Bank': 'letter-bank',
	}
	return map[type] || type.toLowerCase()
}

const Tooltip = ({ text }) => {
	const data = useStaticQuery(graphql`
		query AllTypeQuery {
			allTypeJson {
				nodes {
					type
					description
					example
				}
			}
		}
	`)

	const matchType = data.allTypeJson.nodes.find(
		(type) => type.type.toUpperCase() === text.toUpperCase()
	)

	return (
		<div role='tooltip' className='tooltip' id={text}>
			<p className='tooltip-description'>{matchType.description}</p>
			<p className='tooltip-example'>{matchType.example}</p>
			<Link to={`/learn/${getLearnPath(text)}`} className='tooltip-learn-link'>
				Learn more &rarr;
			</Link>
		</div>
	)
}

export default Tooltip
