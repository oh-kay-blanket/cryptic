import React from 'react';
import ButtonContainer from '../components/bottom/ButtonContainer';
import Layout from '../components/layout';

const NotFound = () => {
  // buttons
  const buttons = {
    home: {
      path: '/',
      name: 'Home',
      style: 'primary',
    },
  };

  let btnArr = [buttons.home];

  return (
    <Layout>
      <section
        className='lc-container container_404'
        style={{ marginTop: '5rem' }}
      >
        <h1 style={{ textAlign: 'center' }}>Page not found</h1>
        <ButtonContainer btnArr={btnArr} />
      </section>
    </Layout>
  );
};

export default NotFound;

export const Head = () => (
  <>
    <title>Page Not Found | Learn Cryptic</title>
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://learncryptic.com/' />
    <meta property='og:title' content='Learn Cryptic - Master Cryptic Crosswords' />
    <meta property='og:description' content='Learn to solve cryptic crossword clues with interactive lessons and daily puzzles.' />
    <meta property='og:image' content='https://learncryptic.com/social.jpg' />
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:image' content='https://learncryptic.com/social.jpg' />
  </>
)
