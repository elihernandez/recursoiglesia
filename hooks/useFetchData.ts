import useSWR from 'swr'

export const useFetchData = <TData>(key, fetcher) => useSWR<TData>(key, fetcher)
