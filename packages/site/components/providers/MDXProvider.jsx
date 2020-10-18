/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from '../codeblock'
import { H1, H2, P, Pre, H3, H4, A, Table, TD, TH, TR } from '../md'
import Default from './../layouts/layout'

const mdComponents = {
  code: CodeBlock,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  Inline: Pre,
  a: A,
  table: Table,
  td: TD,
  th: TH,
  tr: TR,
  Default: Default
}

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)
