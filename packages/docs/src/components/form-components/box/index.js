import styled from "styled-components";
import { Row as RowDiv } from "react-grid-system";

export const Box = styled.div`
    display:flex;
    justify-content: ${({ justify }) => (justify ? justify : 'flex-start')};
    align-items: ${({ items }) => (items ? items : 'center')};  
    flex-direction: ${({ direction }) => direction ? direction : 'row'};
    flex-wrap: ${({ wrap }) => wrap ? wrap : 'nowrap'};
    ${p => p.m && `margin: ${p.m}px;`}
    ${p => p.ml && `margin-left: ${p.ml}px;`}
    ${p => p.mr && `margin-right: ${p.mr}px;`}
    ${p => p.mb && `margin-bottom: ${p.mb}px;`}
    ${p => p.mt && `margin-top: ${p.mt}px;`}

    ${p => p.p && `padding: ${p.p}px !important;`}
    ${p => p.pl && `padding-left: ${p.pl}px !important;`}
    ${p => p.pr && `padding-right: ${p.pr}px !important;`}
    ${p => p.pb && `padding-bottom: ${p.pb}px !important;`}
    ${p => p.pt && `padding-top: ${p.pt}px !important;`}
`

export const Row = styled(RowDiv)`
   margin-top:20px;
   width:100%;
`