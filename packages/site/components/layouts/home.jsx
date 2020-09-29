/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import styled from 'styled-components'

import Navbar from '../navbar'

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`

const Content = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bkgContent};
`

export default function Home({ children }) {
  return (
    <Main>
      <Navbar setOpen={() => {}} />
      <Container>
        <Content>{children}</Content>
      </Container>
    </Main>
  )
}
