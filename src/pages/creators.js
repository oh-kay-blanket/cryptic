import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const Creators = ({ data }) => {
  const creatorsData = data.allCreatorsJson.nodes;
  const creatorImages = data.allFile.nodes;

  // Function to get creator image by name
  const getCreatorImage = (creatorName) => {
    // Convert creator name to match filename format (lowercase, no punctuation, spaces to hyphens)
    const fileName = creatorName
      .toLowerCase()
      .replace(/[,.']/g, '')
      .replace(/\s+/g, '-');
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
        <div className='creators-header'>
          <h1>Meet Our Creators</h1>
          <p>
            Learn Cryptic is made possible by a small team of talented puzzle designers, software
            developers, and clue writers.
          </p>
        </div>

        <div className='creators-grid'>
          {creatorsData.map((creator, index) => {
            const creatorImage = getCreatorImage(creator.nom);

            return (
              <div key={index} className='creator-card'>
                {creatorImage && (
                  <div className='creator-image'>
                    <GatsbyImage
                      image={creatorImage}
                      alt={`${creator.name} - Cryptic Crossword Creator`}
                      className='creator-photo'
                      imgStyle={{ borderRadius: '50%' }}
                    />
                  </div>
                )}
                <div className='creator-info'>
                  <h2>
                    {creator.name}
                    <span className='creator-nom'>({creator.nom})</span>
                  </h2>
                  <p className='creator-bio'>{creator.bio}</p>
                  {creator.link && (
                    <a
                      href={creator.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='creator-link'
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className='cta-section'>
          <h2>Want to Contribute?</h2>
          <p>
            Are you a cryptic crossword creator interested in sharing your clues with our learning
            community? We'd love to hear from you!
          </p>
          <p className='cta-detail'>
            Whether you're an experienced setter or just starting out, we welcome submissions that
            help teach and engage puzzle enthusiasts of all skill levels.
          </p>
          <a
            href='mailto:learncrypticgame@gmail.com?subject=Creator Submission - Learn Cryptic'
            className='cta-button'
          >
            Get in Touch
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
          gatsbyImageData(width: 96, height: 96, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`;
