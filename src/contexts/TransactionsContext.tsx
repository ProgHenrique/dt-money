import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsAll: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  fetchTransactionsAll: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  setWhatIsTheCurrentPage: (pageNumber: number) => void
  transactionsByType: (type: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsAll, setTransactionsAll] = useState<Transaction[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const fetchTransactionsAll = useCallback(async (query?: string) => {
    const responseAll = await api.get('transactions/all', {
      params: {
        q: query,
      },
    })
    setTransactionsAll(responseAll.data)
  }, [])

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('transactions', {
        params: {
          q: query,
          skip: currentPage * 10,
        },
      })

      setTransactions(response.data)
    },
    [currentPage],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data

      const response = await api.post('transactions', {
        category,
        description,
        price,
        type,
      })

      if (currentPage > 0) {
        return
      }

      setTransactions((state) => {
        if (state.length > 9) {
          state.splice(9, 1)
          return [response.data, ...state]
        } else {
          return [response.data, ...state]
        }
      })
    },
    [currentPage],
  )

  const transactionsByType = useCallback(
    async (type: string) => {
      const responseAll = await api.get('transactions/type/all', {
        params: {
          type,
        },
      })

      setTransactionsAll(responseAll.data)

      const response = await api.get('transactions/type', {
        params: {
          type,
          skip: currentPage * 10,
        },
      })

      setTransactions(response.data)
    },
    [currentPage],
  )

  function setWhatIsTheCurrentPage(pageNumber: number) {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    fetchTransactionsAll()
  }, [fetchTransactionsAll])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsAll,
        fetchTransactions,
        fetchTransactionsAll,
        createTransaction,
        setWhatIsTheCurrentPage,
        transactionsByType,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
