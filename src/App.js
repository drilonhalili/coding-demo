import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Table from './components/Table/Table'

import 'antd/dist/antd.min.css'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Table />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App