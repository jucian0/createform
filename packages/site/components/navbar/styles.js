/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';


export const Container = styled.div`
   display:flex;
   width:100%;
   height:60px;
   border-bottom: 1px solid ${({theme})=> theme.colors.border};
   overflow:hidden;
   justify-content:space-between;
   align-items:center;
   flex-direction: row;
   align-items: center;
   padding:5px 0px 5px 20px;
`;

export const Logo = styled.div`
   display:flex;
   align-items:center;
   cursor: pointer;
   & img{
      width:50px;
      height:50px;
   }

   & span{
      font-size:23px;
      color:${({theme})=> theme.colors.primary};
   }
`;

export const ActionButtons = styled.div`
   display:flex;
   justify-content:space-around;
   align-items:center;
   margin:0 10px;
`;

export const Button = styled.button`
   border-radius:50%;
   border:none;
   cursor: pointer;
   width:40px;
   height:40px;
   outline:none;
   background-color:transparent;
   display:flex;
   align-items:center;
   justify-content:center;

   & svg{
      fill:${({theme})=> theme.colors.primary};
      width:21px;
      height:21px;
   }

   &:hover{
      background-color:${({theme})=>theme.colors.border};
   }

   & + button{
      margin:5px;
   }
`;

export const MenuButton = styled(Button)`
   border:1px solid ${({theme})=> theme.colors.border};

   @media (min-width:989px){
      display:none;
   }
`