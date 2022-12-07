import { styled } from '@nextui-org/react';
import Iframe from 'react-iframe';

const CodeSandBox = styled('div', {
  width: '100%',
  padding: '10px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  h1: {
    fontSize: '3em',
    fontFamily: "'Roboto',sans-serif",
    color: '$primary',
    padding: '20px',
  },

  div: {
    width: '100%',
    padding: '2px',
    iframe: {
      width: '100%',
      height: 700,
      border: 'none',
      borderRadius: '8px',
      boxShadow: '$sm',
      position: 'relative',
    },
  },
});

export function Demo(props) {
  console.log(Iframe);
  return (
    <CodeSandBox>
      <div>
        <iframe src={props.url} />
      </div>
    </CodeSandBox>
  );
}
