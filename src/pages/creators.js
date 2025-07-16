import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const Creators = ({ data }) => {
  const creatorsData = data.allCreatorsJson.nodes;
  const creatorImages = data.allFile.nodes;

  // Function to get creator image by name
  const getCreatorImage = (creatorName) => {
    // Convert creator name to match filename format
    const fileName = creatorName.toLowerCase().replace(/\s+/g, '-');
    const imageNode = creatorImages.find(
      (node) =>
        node.name.toLowerCase() === fileName ||
        node.name.toLowerCase() === creatorName.toLowerCase()
    );
    return imageNode ? getImage(imageNode.childImageSharp) : null;
  };

  return (
    <Layout>
      <div className='creators lc-container'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          Meet Our Creators
        </h1>
        <p className='text-lg text-center mb-12 max-w-2xl mx-auto'>
          Learn Cryptic is made possible by a small team of talented puzzle
          designers, software developers, and clue writers.
        </p>

        <div className='creators-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16'>
          {creatorsData.map((creator, index) => {
            const creatorImage = getCreatorImage(creator.nom);

            return (
              <div
                key={index}
                className='creator-card bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md border border-neutral-200 dark:border-neutral-700'
              >
                {creatorImage && (
                  <div className='creator-image mb-4'>
                    <GatsbyImage
                      image={creatorImage}
                      alt={`${creator.name} - Cryptic Crossword Creator`}
                      className='rounded-full w-24 h-24 mx-auto'
                      imgStyle={{ borderRadius: '50%' }}
                    />
                  </div>
                )}
                <div className='creator-info text-center'>
                  <h2 className='text-xl font-bold mb-2'>{creator.name}</h2>
                  <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                    {creator.bio}
                  </p>
                  {creator.link && (
                    <a
                      href={creator.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 font-medium underline'
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className='cta-section bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 text-center border border-neutral-200 dark:border-neutral-700'>
          <h2 className='text-2xl font-bold mb-4'>Want to Contribute?</h2>
          <p className='text-lg mb-6 max-w-2xl mx-auto'>
            Are you a cryptic crossword creator interested in sharing your clues
            with our learning community? We'd love to hear from you!
          </p>
          <p className='text-neutral-600 dark:text-neutral-300 mb-6'>
            Whether you're an experienced setter or just starting out, we
            welcome submissions that help teach and engage puzzle enthusiasts of
            all skill levels.
          </p>
          <a
            href='mailto:learncrypticgame@gmail.com?subject=Creator Submission - Learn Cryptic'
            className='inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors'
          >
            Email Us to Contribute
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Creators;

export const Head = () => (
  <>
    <title>Creators - Learn Cryptic Crossword Contributors</title>
    <meta
      name='description'
      content='Meet the talented cryptic crossword creators behind Learn Cryptic. Discover the puzzle creators who craft our daily educational clues and learn about their backgrounds.'
    />
    <link rel='canonical' href='https://learncryptic.com/creators' />
  </>
);

export const query = graphql`
  query {
    allCreatorsJson {
      nodes {
        nom
        name
        link
        bio
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "creators" }
        extension: { in: ["jpg", "jpeg", "png"] }
      }
    ) {
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
`;
