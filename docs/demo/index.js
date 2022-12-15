import { styled, useTheme } from '@nextui-org/react';

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

export const List = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ul className="mdx-ul">
      {children}
      <style jsx>
        {`
          ul {
            list-style-type: disc;
          }
          :global(.mdx-ul strong) {
            color: ${theme?.colors.code.value};
          }
        `}
      </style>
    </ul>
  );
};

export const Paragraph = styled('p', {
  fontSize: '1.125rem',
  marginBottom: '1.25rem',
});

export const Strong = styled('strong', {
  color: '$text!important',
});
