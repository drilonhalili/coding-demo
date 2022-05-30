import { useState } from "react"

import useParticipants from "../../hooks/useParticipants"
import useGames from "../../hooks/useGames"
import Modal from "../Modal/Modal"

import {
  filterDataGames,
  filterDataParticipants,
  totalGamesPlayed,
  totalWonGames,
} from "../../utils/helpers"

import "./Table.scss"

const Table = () => {
  const [allGames, setAllGames] = useState(null)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalData, setModalData] = useState([])

  const { data: participantData, isLoading } = useParticipants()
  const { data: gamesData } = useGames()

  const filteredGamesData =
    gamesData && filterDataGames(participantData, gamesData)
  const filteredParticipantData =
    participantData && filterDataParticipants(participantData)

  const handleClick = (id) => {
    const totalGames = totalGamesPlayed(filteredGamesData, participantData, id)
    const numberOfWonGames = totalWonGames(gamesData, id)

    setAllGames({ totalGames, numberOfWonGames })
    setIsSelected(true)
    setSelectedParticipant(id)
  }

  const showModal = (data) => {
    setModalData(data)
    setIsModalVisible(true)
  }

  return (
    <div className="container">
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modalData={modalData}
        filteredGamesData={filteredGamesData}
        participantData={participantData}
        gamesData={gamesData}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Played / Won</th>
            <th>Select a participant</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            filteredParticipantData?.map(
              ({
                data: { id, "First Name": firstName, "Last Name": lastName },
              }) => (
                <tr
                  key={id}
                  className={`${
                    selectedParticipant === id ? "highlighted" : ""
                  }`}
                >
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        showModal({
                          id,
                          "First Name": `${firstName} ${lastName}`,
                        })
                      }
                      className="nameButton"
                    >{`${firstName} ${lastName}`}</button>
                  </td>
                  <td>{`${
                    totalGamesPlayed(filteredGamesData, participantData, id)
                      .length
                  } / ${totalWonGames(gamesData, id)}`}</td>
                  <td>
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleClick(id)}
                      key={Math.random()}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      {isSelected && (
        <table className="table">
          <thead>
            <tr>
              <th>Winner</th>
              <th>Looser</th>
            </tr>
          </thead>
          {allGames?.totalGames?.map(
            ({
              looser_name,
              looser_id,
              looser_score,
              winner_id,
              winner_name,
              winner_score,
            }) => (
              <tbody key={Math.random()}>
                <tr>
                  <td
                    className={`${
                      selectedParticipant === winner_id ? "winner" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="nameButton"
                      onClick={() =>
                        showModal({
                          id: winner_id,
                          "First Name": winner_name,
                        })
                      }
                      key={Math.random()}
                    >
                      {winner_name}
                    </button>
                  </td>
                  <td
                    className={`${
                      selectedParticipant === looser_id ? "looser" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="nameButton"
                      onClick={() =>
                        showModal({
                          id: looser_id,
                          "First Name": looser_name,
                        })
                      }
                      key={Math.random()}
                    >
                      {looser_name}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>{winner_score}</td>
                  <td>{looser_score}</td>
                </tr>
              </tbody>
            )
          )}
        </table>
      )}
    </div>
  )
}

export default Table
