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
