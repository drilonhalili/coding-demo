import { useQuery } from "react-query"
import Requests from "../services/Requests"

export default function useParticipants(select) {
  return useQuery(["participants"], () => Requests.getParticipants(), {
    select,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 1,
  })
}
