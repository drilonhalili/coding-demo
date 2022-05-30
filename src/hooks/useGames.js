import { useQuery } from "react-query"
import Requests from "../services/Requests"

export default function useGames(select) {
  return useQuery(["games"], () => Requests.getGames(), {
    select,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 1,
  })
}
