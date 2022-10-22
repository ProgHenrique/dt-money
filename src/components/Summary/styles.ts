import styled, { css } from 'styled-components'
import { Swiper } from 'swiper/react'

export const SwiperContainer = styled(Swiper)`
  width: 100%;
  margin-top: -5rem;

  @media (max-width: 500px) {
    width: 500px;
  }

  @media (max-width: 400px) {
    width: 460px;
  }

  @media (max-width: 300px) {
    width: 350px;
  }
`

export const SummaryContainer = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    gap: 2rem;
    margin-top: -5rem;
  }
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};

    span:last-child {
      cursor: pointer;
    }
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;

    @media (max-width: 912px) {
      font-size: 1.8rem;
    }

    @media (max-width: 820px) {
      font-size: 1.5rem;
    }

    @media (max-width: 300px) {
      font-size: 1.5rem;
    }
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};
    `}

  @media (max-width: 300px) {
    padding: 1.5rem;
  }
  @media (max-width: 1024px) {
    cursor: pointer;
  }
`
