/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'

export const MainDiv = styled.div`
  overflow-x: hidden;
  position: relative;
`

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 1.25rem;
    background: ${(props) => props.theme['gray-700']};
  }

  @media (max-width: 767px) {
    tr{
      td{
        width: 100%;
        display: flex;
        align-items: flex-start;
        font-size: 1.125rem;
        line-height: 160%;
        color: ${(props) => props.theme['gray-300']};

        &:first-child {
          padding-bottom: 0;
          flex-direction: column;
          gap: 0.5rem;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }

        &:last-child {
          justify-content: space-between;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;

          div{
            display: flex;
            gap: 4px;
            align-items: center;

            font-size: 1.125rem;
            color: ${(props) => props.theme['gray-500']};
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    tr {
      td{
        &:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &:last-child {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
  }

  @media (max-width: 400px) {
    tr{
      td:last-child {
        div:first-child {
          span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            ${props => window.innerWidth < 301 ? css`
              width: 65px;
            `: css` width: 115px;`}
          }
        }
      }
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  font-size: 20px;
  line-height: 160%;
  font-weight: 700;
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2.5rem auto;
  justify-content: center;
  gap: 0.5rem;
`

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-weight: 700;
  line-height: 140%;
  border: 0;
  background: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-400']};
  border-radius: 6px;
  cursor: pointer;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['gray-100']};
    transition: background-color 0.2s, color 0.2s;
  }

  &:disabled {
    background: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
    cursor: not-allowed;
  }
`
