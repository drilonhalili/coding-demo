import axios from 'axios'
import handleResponse from '../utils/handleResponse'

class Requests {
  getParticipants = () =>
    axios
      .get(`http://localhost:3004/participants`)
      .then((response) => handleResponse(response))

  getGames = () =>
    axios
      .get(`http://localhost:3004/games`)
      .then((response) => handleResponse(response))
}

export default new Requests()