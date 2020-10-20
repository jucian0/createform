import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
   display:flex;
   justify-content:flex-start;
   align-items:center;

   .pure-material-checkbox {
    z-index: 0;
    position: relative;
    display: inline-block;
    color: currentColor;
    font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
    font-size: 14px;
    line-height: 1.5;
}

/* Input */
.pure-material-checkbox > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -10px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: currentColor;
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
}

/* Span */
.pure-material-checkbox > span {
    display: inline-block;
    width: 100%;
    cursor: pointer;
}

/* Box */
.pure-material-checkbox > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 4px 0px;
    border: solid 2px; /* Safari */
    border-color: currentColor;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
}

/* Checkmark */
.pure-material-checkbox > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 1px;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
}

/* Checked, Indeterminate */
.pure-material-checkbox > input:checked,
.pure-material-checkbox > input:indeterminate {
    background-color: currentColor;
}

.pure-material-checkbox > input:checked + span::before,
.pure-material-checkbox > input:indeterminate + span::before {
    border-color: #2EC4B6;
    background-color: transparent;
}

.pure-material-checkbox > input:checked + span::after,
.pure-material-checkbox > input:indeterminate + span::after {
    border-color: #2EC4B6;
}

.pure-material-checkbox > input:indeterminate + span::after {
    border-left: none;
    transform: translate(4px, 3px);
}

/* Hover, Focus */
.pure-material-checkbox:hover > input {
    opacity: 0.04;
}

.pure-material-checkbox > input:focus {
    opacity: 0.12;
}

.pure-material-checkbox:hover > input:focus {
    opacity: 0.16;
}

/* Active */
.pure-material-checkbox > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
}

.pure-material-checkbox > input:active + span::before {
    border-color: currentColor;
}

.pure-material-checkbox > input:checked:active + span::before {
    border-color: transparent;
    background-color: #2EC4B6;
}

/* Disabled */
.pure-material-checkbox > input:disabled {
    opacity: 0;
    border-color: currentColor;
}

.pure-material-checkbox > input:disabled + span {
    color: currentColor;
    cursor: initial;
}

.pure-material-checkbox > input:disabled + span::before {
    border-color: currentColor;
}

.pure-material-checkbox > input:checked:disabled + span::before,
.pure-material-checkbox > input:indeterminate:disabled + span::before {
    border-color: transparent;
    background-color: currentColor;
}

`
const Label = styled.span`
   color:currentColor;
`

const Error = styled.span`
   color:red;
   font-size:14px;
`

export const Checkbox = forwardRef((props, ref)=>{

   return (
      <Container>
         <label class="pure-material-checkbox">
            <input type="checkbox" {...props} ref={ref}/>
            <Label>{props.placeholder}</Label>
         </label>      
        <Error>{props.error}</Error>
      </Container>
   )
})