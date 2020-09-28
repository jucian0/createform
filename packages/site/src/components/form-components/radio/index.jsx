import React,{forwardRef} from 'react'
import styled from 'styled-components'

const Container = styled.div`
   display:flex;
   justify-content:flex-start;
   align-items:center;
`
const RadioContainer = styled.label`
      position: relative;
      cursor: pointer;
      line-height: 20px;
      font-size: 14px;
      margin-right: 15px;
      padding:8px 0 8px 0;
`

const Label = styled.span`
         position: relative;
         display: block;
         float: left;
         margin-right: 10px;
         width: 18px;
         height: 18px;
         border: 2px solid ${({theme})=> theme.colors.placeholder};
         border-radius: 100%;
         -webkit-tap-highlight-color: transparent;

         &:after{
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background-color: ${({theme})=> theme.colors.green};
            transform: scale(0);
            transition: all .2s ease;
            opacity: .08;
            pointer-events: none;
         }
         &:hover{
            &:after{
               transform: scale(3.6);
            }
         }
`

const InputStyled = styled.input`
   display:none;
   &[type="radio"]:checked {
      
      &+${Label}{
         border: 2px solid ${({theme})=> theme.colors.green};
         &::after{
            transform: scale(1);
            transition: all .2s cubic-bezier(.35,.9,.4,.9);
            opacity: 1;
         }
      }
   }
`

const LabelText = styled.span`
   color:${({theme})=> theme.colors.placeholder};
`

export const Radio = forwardRef((props, ref)=>{

   return (
      <Container>
         <RadioContainer>
            <InputStyled type="radio" {...props} ref={ref}/>
            <Label/>
            <LabelText>{props.placeholder}</LabelText>
         </RadioContainer>      
      </Container>
   )
})