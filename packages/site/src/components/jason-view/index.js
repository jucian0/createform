import styled from "styled-components";

export const ContainerJsonView = styled.div`
.react-json-view{
   font-family: 'Fira Code', monospace!important;
   background: #18191A!important;
   white-space: pre;
   color: #f8f8f2;
   font-weight:400;
   border-radius: 4px!important;
   overflow:auto;
}

.react-json-view svg{
   fill: rgb(255, 255, 255);
}

.react-json-view .string-value{
   color: rgb(241, 250, 140)!important;
}

.react-json-view .variable-value div span.data-type-label{
   color: rgb(80, 250, 123)!important;
}

.react-json-view .object-key-val .pushed-content .object-content .variable-row .object-key span{
   color: rgb(255, 255, 255);
   font-weight: bold;
}

.react-json-view .object-key-val .pushed-content .object-content .variable-row span{
   color: rgb(255, 121, 198);
}

.react-json-view .variable-value div{
   color: rgb(255, 255, 255)!important;
}

.react-json-view .object-meta-data .object-size{
   color: rgb(255, 121, 198)!important;
}

.react-datepicker-wrapper{
   width: 100%;
}

.react-datepicker-wrapper .react-datepicker__input-container input{
   padding: 11px!important;
   border: 1px solid #E2E8F0!important;
   border-radius: 4px;
   margin-top: 10px;
   width: 100%;
}
`