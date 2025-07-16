import React from 'react';
import Layout from '../components/layout';

const Resources = () => {
  const resources = [
    {
      category: 'Free Online Puzzles',
      items: [
        {
          name: "Kegler's Cryptic Archive",
          url: 'https://kegler.gitlab.io',
          description:
            'An extensive collection of free cryptic crosswords by Kegler, one of our featured creators. Perfect for daily practice with puzzles of varying difficulty levels.',
          featured: true,
        },
        {
          name: 'The Guardian Cryptic',
          url: 'https://www.theguardian.com/crosswords/series/cryptic',
          description:
            "Daily cryptic crosswords from The Guardian, featuring some of the UK's best setters. Free with registration.",
        },
        {
          name: 'Financial Times Cryptic',
          url: 'https://www.ft.com/crossword',
          description:
            'High-quality cryptic crosswords from the Financial Times. Some puzzles available for free.',
        },
        {
          name: 'Independent Cryptic',
          url: 'https://puzzles.independent.co.uk/games/cryptic-crossword-independent',
          description: 'Free daily cryptic crosswords from The Independent newspaper.',
        },
      ],
    },
    {
      category: 'Learning Resources',
      items: [
        {
          name: 'Minute Cryptic',
          url: 'https://www.minutecryptic.com',
          description: 'Daily cryptic crosswords with hints and solutions.',
        },
        {
          name: 'Fifteensquared',
          url: 'https://fifteensquared.net',
          description:
            'Community blog where solvers discuss and analyze cryptic crosswords, particularly from The Guardian.',
        },
      ],
    },
    {
      category: 'Communities & Forums',
      items: [
        {
          name: 'Reddit - r/crosswords',
          url: 'https://reddit.com/r/crosswords',
          description:
            'Active community discussing all types of crosswords, including cryptics. Great for asking questions and sharing discoveries.',
        },
        {
          name: "National Puzzlers' League (NPL)",
          url: 'https://www.puzzlers.org/',
          description:
            "The oldest puzzlers' organization in the world, featuring cryptic crosswords, wordplay, and puzzle competitions.",
        },
      ],
    },
    {
      category: 'Print Publications',
      items: [
        {
          name: 'The Enigma (NPL)',
          url: 'https://www.puzzlers.org/',
          description:
            "Monthly publication of the National Puzzlers' League featuring cryptic crosswords, cryptograms, and other word puzzles.",
        },
        {
          name: 'The Times (UK)',
          url: 'https://www.thetimes.com/puzzles',
          description:
            'Daily cryptic crosswords in the print edition and online subscription. Known for their excellent construction and fair cluing.',
        },
      ],
    },
    {
      category: 'Books & Reference',
      items: [
        {
          name: "Fraser Simpson's Cryptic Crosswords",
          url: 'https://www.amazon.com/Cryptic-Crosswords-1-Fraser-Simpson/dp/1777561302',
          description:
            'A series of cryptic crossword puzzle books featuring original, high-quality puzzles perfect for solvers of all levels.',
        },
        {
          name: 'Chambers Crossword Manual',
          url: 'https://www.betterworldbooks.com/product/detail/chambers-crossword-manual-a-guide-for-the-novice-and-the-enthusiast-9780550120069',
          description:
            'Comprehensive guide to cryptic crosswords by Don Manley, covering all aspects of solving and construction.',
        },
        {
          name: 'Ximenes on the Art of the Crossword',
          url: 'https://xotaotc.nfshost.com/',
          description:
            'Classic text by the legendary Times crossword editor, essential reading for serious solvers.',
        },
        {
          name: 'Chambers Dictionary',
          url: 'https://www.chambers.co.uk/dictionary',
          description:
            'The standard reference dictionary for British cryptic crosswords, known for its comprehensive coverage of unusual words.',
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className='resources lc-container'>
        <h1 className='text-4xl font-bold text-center mb-8'>Cryptic Crossword Resources</h1>
        <p className='text-lg text-center mb-12 max-w-3xl mx-auto'>
          Ready to dive deeper into the world of cryptic crosswords? Here are our recommended
          resources for finding more puzzles, improving your solving skills, and connecting with the
          cryptic community.
        </p>

        {resources.map((category, categoryIndex) => (
          <div key={categoryIndex} className='resource-category mb-12'>
            <h2 className='text-2xl font-bold mb-6 border-b-2 border-purple-200 dark:border-purple-800 pb-2'>
              {category.category}
            </h2>

            <div className='resource-grid grid gap-6 md:grid-cols-2'>
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`resource-card p-6 rounded-lg border ${
                    item.featured
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                  } shadow-sm hover:shadow-md transition-shadow`}
                >
                  {item.featured && (
                    <div className='featured-badge inline-block bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-3'>
                      FEATURED
                    </div>
                  )}

                  <h3 className='text-lg font-bold mb-2'>
                    {item.url ? (
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 underline'
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className='text-neutral-900 dark:text-neutral-100'>{item.name}</span>
                    )}
                  </h3>

                  <p className='text-neutral-600 dark:text-neutral-300 leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Getting Started Section */}
        <div className='getting-started bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 mt-16 border border-neutral-200 dark:border-neutral-700'>
          <h2 className='text-2xl font-bold mb-4 text-center'>New to Cryptic Crosswords?</h2>
          <p className='text-lg mb-6 text-center max-w-2xl mx-auto'>
            If you're just starting your cryptic crossword journey, we recommend beginning with
            these steps:
          </p>

          <div className='steps grid gap-4 md:grid-cols-3 mb-8'>
            <div className='step text-center'>
              <div className='step-number bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3'>
                1
              </div>
              <h3 className='font-bold mb-2'>Learn the Basics</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                Start with our Learn section to understand cryptic clue types and conventions.
              </p>
            </div>

            <div className='step text-center'>
              <div className='step-number bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3'>
                2
              </div>
              <h3 className='font-bold mb-2'>Practice Daily</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                Solve our daily clues and explore Kegler's archive for more practice puzzles.
              </p>
            </div>

            <div className='step text-center'>
              <div className='step-number bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3'>
                3
              </div>
              <h3 className='font-bold mb-2'>Join the Community</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                Connect with other solvers through forums and communities to share tips and
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;

export const Head = () => (
  <>
    <title>Cryptic Crossword Resources - Where to Find More Puzzles</title>
    <meta
      name='description'
      content='Discover the best resources for cryptic crosswords including free online puzzles, mobile apps, books, and communities. Find your next favorite cryptic puzzle source.'
    />
    <meta
      name='keywords'
      content='cryptic crossword resources, free cryptic puzzles, cryptic crossword apps, crossword books, puzzle communities'
    />
    <link rel='canonical' href='https://learncryptic.com/resources' />
  </>
);
