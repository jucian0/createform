/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link'
import {useRouter} from 'next/router'

import { Container, Item, Indicator } from './styles';


function ActiveLink({ href,children }){
  const router = useRouter()

  return (
    <Item className={router.pathname === href && "active"}>
      <Indicator /> 
      <Link href={href} className={router.pathname === href && "active"}>{children}</Link>
    </Item>
  ) 
}


function Sidebar({open}) {

  return (
    <Container open={open}>
      <ActiveLink href="/">
        Index JS
      </ActiveLink>
      <ActiveLink href="/input">
        MDX
      </ActiveLink>
    </Container>
  );
}

export default Sidebar;