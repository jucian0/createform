import { Button, Card, Grid, Text, styled } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { CgPerformance } from 'react-icons/cg';
import { IoRocketOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { useTranslation } from 'engrafia';
import { Demo } from './../demo';

const CodeSandBox = styled({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',

  h1: {
    fontSize: '3em',
    fontFamily: "'Roboto',sans-serif",
    color: '$primary',
  },

  div: {
    width: '1040px',
    padding: '2px',
    '.sandbox': {
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
  },
});

export const getStaticProps = async () => {
  return {
    props: {
      data: {
        title: 'Form builder',
        description:
          'Use Form provides you a simple way to create forms with React.',
        tags: 'reactjs, forms, use-form, useform',
      },
    },
  };
};

export default function Index() {
  const router = useRouter();
  const t = useTranslation();
  return (
    <>
      <Grid.Container
        justify="center"
        direction="column"
        alignItems="center"
        css={{ p: '$20' }}
      >
        <Grid.Container
          justify="center"
          direction="column"
          alignItems="center"
          css={{ marginTop: '3rem', marginBottom: '3rem', zIndex: 2 }}
        >
          <Text as="h1" color="$primary">
            UseForm
          </Text>
          <Text size="$2xl" color="$accents8">
            Use Form provides you a simple way to create forms with React
          </Text>
        </Grid.Container>

        <Grid.Container
          gap={2}
          justify="center"
          alignItems="center"
          css={{ zIndex: 1, mb: '$10' }}
        >
          <Grid>
            <Button
              onClick={() => router.push(`/docs/introduction/quick-start`)}
            >
              Get start
            </Button>
          </Grid>
          <Card
            css={{
              px: '$6',
              pt: '7px',
              h: '40px',
              w: 'auto',
              shadow: '$sm',
              border: '1px solid $border',
              backdropFilter: 'saturate(180%) blur(10px)',
              background: '$backgroundAlpha',
            }}
          >
            yarn add @use-form/use-form
          </Card>
        </Grid.Container>
        <Demo url="https://codesandbox.io/embed/useform-forked-oojuq?fontsize=14&hidenavigation=1&theme=dark" />
      </Grid.Container>

      <Grid.Container gap={2} justify="center" css={{ zIndex: 1, mb: 200 }}>
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 280,
              shadow: '$sm',

              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <MdOutlineDashboardCustomize size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Flexible
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  'Create a form an use as onSubmit, onChange or debounced mode. Create powerful forms with UseForm. You can create your own form with your own fields, and you can use your own validation rules. UseForm allows you to create form, and use it as a controlled or uncontrolled form.'
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 280,
              shadow: '$sm',

              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <IoRocketOutline size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Easy
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  "Less code. UseForm is the easiest way to create forms with React. Create a form and use it wherever you want, don't worry with React Context, or Redux. You can share your form with other components just by using the hook created by createForm function."
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 280,
              shadow: '$sm',
              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <CgPerformance size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Performant
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  'Just one render. There are many form libraries, most of which are heavy, and allow you to create just one kind of form, but with UseForm you can fulfill and submit a form with just one render.'
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
