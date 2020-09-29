/* eslint-disable react/prop-types */


import React, { useContext } from 'react';
import Link from 'next/link'
import { IoLogoGithub,IoLogoTwitter ,IoMdMoon,IoIosSunny} from "react-icons/io";
import { TiThMenu } from "react-icons/ti";


import { Container, Logo, ActionButtons, Button,MenuButton } from './styles';
import logo from "../../img/logo.svg";
import { ThemeContext } from "../providers/themeContext";

function Navbar({setOpen}) {

  const {setTheme, theme} =  useContext(ThemeContext)

  
  return (
    <Container>
      <Link href="/">
        <Logo>
          <img src={logo} alt="logo" />
          <span>UseForm</span>
        </Logo>
      </Link>
      <ActionButtons>
        <Button>
          <IoLogoTwitter />
        </Button>
        <Button>
          <IoLogoGithub />
        </Button>
        <Button onClick={setTheme}>
          {theme ? <IoMdMoon />:<IoIosSunny />}
        </Button>

        <MenuButton onClick={setOpen}>
          <TiThMenu />
        </MenuButton>

      </ActionButtons>
    </Container>
  );
}

export default Navbar;