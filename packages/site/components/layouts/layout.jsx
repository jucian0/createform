/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Navbar from '../navbar'
import Sidebar from '../sidebar'

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
`
const MainContent = styled.div`
  display: flex;
  width: ${({ open }) => (!open ? '100%' : 'calc(100% - 200px)')};
  height: calc(100% - 60px);
  position: fixed;
  justify-content: center;
  float: left;
  left: ${({ open }) => (open ? '200px' : '0')};
  transition: all 0.5s ease-in-out;
  overflow: auto;
`

const Content = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 40px;
  max-width: 1440px;
  background-color: ${({ theme }) => theme.colors.bkgContent};
`

// eslint-disable-next-line react/prop-types
export default function Page({ children }) {
  const [open, setOpen] = useState(true)

  const resize = () => {
    if (window?.innerWidth > 989) {
      setOpen(true)
    } else if (window?.innerWidth <= 989) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()
  }, [])

  return (
    <Main>
      <Navbar setOpen={() => setOpen(!open)} />
      <Container>
        <Sidebar open={open} />
        <MainContent open={open}>
          <Content>{children}</Content>
        </MainContent>
      </Container>
    </Main>
  )
}
