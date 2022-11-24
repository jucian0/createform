import { Grid, Text } from '@nextui-org/react';
import Link from 'next/link';

export const getStaticProps = async () => {
  return {
    props: {
      data: {
        title: '404',
        description: 'Page not found',
        tags: 'use-form, useform, nextjs, reactjs',
      },
    },
  };
};

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <Grid.Container
      justify="center"
      direction="column"
      alignItems="center"
      css={{ h: '80vh' }}
    >
      <Grid.Container
        justify="center"
        direction="column"
        alignItems="center"
        css={{ maxW: '90rem' }}
      >
        <Text
          h1
          css={{
            textGradient: '45deg, #0b132b -20%, #6fffe9 50%',
          }}
          weight="bold"
          size="5rem"
        >
          404 | Not found!
        </Text>

        <Text as="h2" css={{ zIndex: '$1' }}>
          Try to find your target content by searchbar, or navigate to{' '}
          <Link href="/">Home Page.</Link>
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
}

export default Index;
