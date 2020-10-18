import React from 'react';
import styled from 'styled-components'
import Router from 'next/router'
import { NextSeo } from 'next-seo';
import { Row, Col } from 'react-grid-system'
import Home from "../components/layouts/home"


const Container = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:column;
   background-color: ${({theme})=> theme.colors.primary};
   padding:40px;
   & h1{
      font-size:3em;
      color: ${({theme})=> theme.colors.dark};
   }
   & button{
      border: 1px solid ${({theme})=> theme.colors.border};
      background-color:transparent;
      padding:10px 20px;
      border-radius:5px;
      margin:30px;
      font-size:20px;
      font-weight:bold;
      color:${({theme})=> theme.colors.border};
      cursor:pointer;
      &:hover{
         box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);      
      }
   }
   & a+ a{
      margin:5px;
   }
`

const DemoContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:30px;
  width:100%;
`

function Index() {
  return (
    <Home>
      <NextSeo
        title="Home"
        titleTemplate='%s | UseForm'
        description="useForm provides the better way to create advanced forms easily.also provides a simple way to validate form inputs."
        twitter={{
                 cardType: "summary_large_image",
               }}
      />
      <Container>
        <h1 className="hero__title">UseForm</h1>
        <button type="button" onClick={()=>Router.push("/readme")}>Get Started</button>
        <div>
          <a href="https://github.com/Jucian0/useform/blob/master/LICENSE">
            <img alt="GitHub license" src="https://img.shields.io/github/license/Jucian0/useform" />
          </a>
          <a href="https://bundlephobia.com/result?p=useforms@1.0.3">
            <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/useforms" />
          </a>
          <a href="https://bundlephobia.com/result?p=useforms@1.0.3">
            <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/useforms" />
          </a>
          <a href="https://github.com/Jucian0/useform">
            <img alt="GitHub stars" src="https://img.shields.io/github/stars/jucian0/useform?style=social" />
          </a>
          <a href="https://github.com/Jucian0/useform">
            <img alt="GitHub forks" src="https://img.shields.io/github/forks/jucian0/useform?style=social" />
          </a>
        </div>
      </Container>
        <Row justify="center" style={{marginTop:30}}>
          <Col xl={8} lg={8} md={8} sm={10}>
            {/* <Demo/> */}
          </Col>
        </Row>
    </Home>
  );
}

export default Index;