import { useSummary } from '../../hooks/useSummary'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { priceFormatter } from '../../utils/formatter'

import { SummaryCard, SummaryContainer, SwiperContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useWindowSize } from '../../hooks/useWindowSize'

export function Summary() {
  const { transactionsByType } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactionsByType: context.transactionsByType,
      }
    },
  )
  const windowSize = useWindowSize()
  const summary = useSummary()

  const iconSize = windowSize < 301 ? 24 : 32
  const isEqualOrMinor1024 = windowSize <= 1024

  return windowSize <= 767 ? (
    <SwiperContainer slidesPerView={2} spaceBetween={20} centeredSlides={true}>
      <SummaryContainer>
        <SwiperSlide className="swiper_slide">
          <SummaryCard
            onClick={async (e) => await transactionsByType('income')}
          >
            <header>
              <span>Entradas</span>
              <span id="income">
                <ArrowCircleUp size={iconSize} color="#00b37e" />
              </span>
            </header>

            <strong>{priceFormatter.format(summary.income)}</strong>
          </SummaryCard>
        </SwiperSlide>

        <SwiperSlide>
          <SummaryCard
            onClick={async (e) => await transactionsByType('outcome')}
          >
            <header>
              <span>Saídas</span>
              <span id="outcome">
                <ArrowCircleDown size={iconSize} color="#f75a68" />
              </span>
            </header>

            <strong>{priceFormatter.format(summary.outcome)}</strong>
          </SummaryCard>
        </SwiperSlide>

        <SwiperSlide>
          <SummaryCard
            variant="green"
            onClick={(e) => window.location.reload()}
          >
            <header>
              <span>Total</span>
              <span>
                <CurrencyDollar size={iconSize} color="#fff" />
              </span>
            </header>

            <strong>{priceFormatter.format(summary.total)}</strong>
          </SummaryCard>
        </SwiperSlide>
      </SummaryContainer>
    </SwiperContainer>
  ) : (
    <SummaryContainer>
      <SummaryCard
        onClick={
          isEqualOrMinor1024
            ? async (e) => await transactionsByType('income')
            : (e) => null
        }
      >
        <header>
          <span>Entradas</span>
          <span
            id="income"
            onClick={
              isEqualOrMinor1024
                ? (e) => null
                : async (e) => await transactionsByType('income')
            }
          >
            <ArrowCircleUp size={32} color="#00b37e" />
          </span>
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard
        onClick={
          isEqualOrMinor1024
            ? async (e) => await transactionsByType('outcome')
            : (e) => null
        }
      >
        <header>
          <span>Saídas</span>
          <span
            id="outcome"
            onClick={
              isEqualOrMinor1024
                ? (e) => null
                : async (e) => await transactionsByType('outcome')
            }
          >
            <ArrowCircleDown size={32} color="#f75a68" />
          </span>
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard
        variant="green"
        onClick={
          isEqualOrMinor1024 ? (e) => window.location.reload() : (e) => null
        }
      >
        <header>
          <span>Total</span>
          <span
            onClick={
              isEqualOrMinor1024 ? (e) => null : (e) => window.location.reload()
            }
          >
            <CurrencyDollar size={32} color="#fff" />
          </span>
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
