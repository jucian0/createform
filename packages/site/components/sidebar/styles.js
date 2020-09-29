/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  display: flex;
  height: calc(100vh - 60px);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  transition: left 0.5s ease-in-out;
  left: ${({ open }) => (open ? 0 : '-200px')};
  width: 200px;
  color: ${({ theme }) => theme.colors.textColor};
`

export const Indicator = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.textColor};
  margin: 10px;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;

  & a {
    display: flex;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textColor};
  }

  &.active {
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
    ${Indicator} {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:hover {
    ${Indicator} {
      background-color: ${({ theme }) => theme.colors.primary};
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`
