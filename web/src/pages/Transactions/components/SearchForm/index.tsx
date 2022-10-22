import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  AmountTransactionsDiv,
  SearchFormContainer,
  SearchFormDiv,
} from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useState } from 'react'
import { useWindowSize } from '../../../../hooks/useWindowSize'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions, fetchTransactionsAll, transactionsAll } =
    useContextSelector(TransactionsContext, (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
        fetchTransactionsAll: context.fetchTransactionsAll,
        transactionsAll: context.transactionsAll,
      }
    })

  const windowSize = useWindowSize()

  const [searchValue, setSearchValue] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactionsAll(data.query)
    await fetchTransactions(data.query)
  }

  const isSearchEmpty = !searchValue
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      {windowSize > 0 && windowSize <= 600 && (
        <AmountTransactionsDiv>
          <span>Transações</span>
          <span>{`${transactionsAll.length} itens`}</span>
        </AmountTransactionsDiv>
      )}
      <SearchFormDiv>
        <input
          type="text"
          placeholder="Busque por transações"
          {...register('query')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting || isSearchEmpty}>
          <MagnifyingGlass size={20} />
          {windowSize > 600 && 'Buscar'}
        </button>
      </SearchFormDiv>
    </SearchFormContainer>
  )
}
