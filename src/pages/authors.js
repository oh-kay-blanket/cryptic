import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const Authors = ({ data }) => {
	const authorsData = data.allAuthorsJson.nodes
	const authorImages = data.allFile.nodes

	// Function to get author image by name
	const getAuthorImage = (authorName) => {
		// Convert author name to match filename format
		const fileName = authorName.toLowerCase().replace(/\s+/g, '-')
		const imageNode = authorImages.find(node => 
			node.name.toLowerCase() === fileName || 
			node.name.toLowerCase() === authorName.toLowerCase()
		)
		return imageNode ? getImage(imageNode.childImageSharp) : null
	}

	return (
		<Layout>
			<div className='authors lc-container'>
				<h1 className='text-4xl font-bold text-center mb-8'>Meet Our Authors</h1>
				<p className='text-lg text-center mb-12 max-w-2xl mx-auto'>
					Learn Cryptic is made possible by talented puzzle constructors who craft engaging and educational cryptic crossword clues.
				</p>
				
				<div className='authors-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16'>
					{authorsData.map((author, index) => {
						const authorImage = getAuthorImage(author.nom)
						
						return (
							<div key={index} className='author-card bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md border border-neutral-200 dark:border-neutral-700'>
								{authorImage && (
									<div className='author-image mb-4'>
										<GatsbyImage 
											image={authorImage}
											alt={`${author.nom} - Cryptic Crossword Author`}
											className='rounded-full w-24 h-24 mx-auto'
											imgStyle={{ borderRadius: '50%' }}
										/>
									</div>
								)}
								<div className='author-info text-center'>
									<h2 className='text-xl font-bold mb-2'>{author.nom}</h2>
									<p className='text-neutral-600 dark:text-neutral-300 mb-4'>{author.bio}</p>
									{author.link && (
										<a 
											href={author.link}
											target='_blank'
											rel='noopener noreferrer'
											className='inline-block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 font-medium underline'
										>
											Visit Website
										</a>
									)}
								</div>
							</div>
						)
					})}
				</div>

				{/* Call to Action */}
				<div className='cta-section bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 text-center border border-neutral-200 dark:border-neutral-700'>
					<h2 className='text-2xl font-bold mb-4'>Want to Contribute?</h2>
					<p className='text-lg mb-6 max-w-2xl mx-auto'>
						Are you a cryptic crossword constructor interested in sharing your clues with our learning community? 
						We'd love to hear from you!
					</p>
					<p className='text-neutral-600 dark:text-neutral-300 mb-6'>
						Whether you're an experienced setter or just starting out, we welcome submissions that help teach 
						and engage puzzle enthusiasts of all skill levels.
					</p>
					<a 
						href='mailto:learncrypticgame@gmail.com?subject=Author Submission - Learn Cryptic'
						className='inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors'
					>
						Email Us to Contribute
					</a>
				</div>
			</div>
		</Layout>
	)
}

export default Authors

export const Head = () => (
	<>
		<title>Authors - Learn Cryptic Crossword Contributors</title>
		<meta name="description" content="Meet the talented cryptic crossword constructors behind Learn Cryptic. Discover the puzzle creators who craft our daily educational clues and learn about their backgrounds." />
		<link rel="canonical" href="https://learncryptic.com/authors" />
	</>
)

export const query = graphql`
	query {
		allAuthorsJson {
			nodes {
				nom
				link
				bio
			}
		}
		allFile(filter: {
			sourceInstanceName: {eq: "images"}
			relativeDirectory: {eq: "authors"}
			extension: {in: ["jpg", "jpeg", "png"]}
		}) {
			nodes {
				name
				childImageSharp {
					gatsbyImageData(
						width: 96
						height: 96
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	}
`