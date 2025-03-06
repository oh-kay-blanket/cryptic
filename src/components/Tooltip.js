import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
	`);
	
	const matchType = data.allTypeJson.nodes.find(type => type.type.toUpperCase() === text.toUpperCase())
	console.log(matchType)

    return (
        <div role="tooltip" className="tooltip" id={text}>
			<p className='tooltip-description'>{matchType.description}</p>
			<p className='tooltip-example'>{matchType.example}</p>
		</div>
    )
}

export default Tooltip;