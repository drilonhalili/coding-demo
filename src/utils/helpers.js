/**
 * Returns the total of won games
 * @param {object} data
 * @param {number} id
 * @returns {number}
 */
export const totalWonGames = (data, id) => {
  const numberOfWonGames = data && data[id]?.length
  return numberOfWonGames
}

/**
 * Filtering game data based on participant id
 * @param {object} participantData 
 * @param {object} data 
 * @returns {array} - Returns an array with winner_id, winner_name, looser_name
 */
export const filterDataGames = (participantData, data) => {
  const d = []
  for (const [key, value] of Object.entries(data)) {
    const valWithId = value.map((val) => {
      const winnerName = `${participantData[key][["First Name"]]} ${
        participantData[key][["Last Name"]]
      }`
      const looserName = `${participantData[val.looser_id][["First Name"]]} ${
        participantData[val.looser_id][["Last Name"]]
      }`
      const newVal = {
        ...val,
        winner_id: key * 1,
        winner_name: winnerName,
        looser_name: looserName,
      }
      return newVal
    })

    const o = { id: key, data: valWithId }
    d.push(o)
  }
  return d
}

/**
 * Mapping through participants
 * @param {object} data 
 * @returns {array}
 */
export const filterDataParticipants = (data) => {
  const d = []
  for (const [key, value] of Object.entries(data)) {
    const o = { id: Number(key), data: value }
    d.push(o)
  }
  return d
}

/**
 * Returns the length of total games played
 * @param {object} filteredGamesData 
 * @param {object} participantData 
 * @param {number} id 
 * @returns {number}
 */
export const totalGamesPlayed = (filteredGamesData, participantData, id) => {
  let lostGames = []
  let wonGames = []
  filteredGamesData?.forEach(({ data }) => {
    return data.map(
      (looser) => looser.looser_id === id && lostGames.push(looser)
    )
  })
  filteredGamesData?.forEach(({ data }) => {
    return data?.map(
      (winner) =>
        winner.winner_name ===
          `${participantData[id][["First Name"]]} ${
            participantData[id][["Last Name"]]
          }` && wonGames.push(winner)
    )
  })
  const totalGames = [...lostGames, ...wonGames]

  return totalGames
}