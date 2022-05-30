import React from 'react'
import { Modal as AntModal } from "antd"
import img from "../../assets/image/img.jpg"
import { totalGamesPlayed, totalWonGames } from '../../utils/helpers'

const Modal = ({
  isModalVisible,
  setIsModalVisible,
  modalData,
  filteredGamesData,
  participantData,
  gamesData,
}) => {
  return (
    <AntModal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Played / Won</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{modalData["First Name"]}</td>
            <td>{`${
              modalData.id &&
              totalGamesPlayed(filteredGamesData, participantData, modalData.id)
                .length
            } / ${totalWonGames(gamesData, modalData["id"])}`}</td>
            <td>
              <img src={img} alt="" />
            </td>
          </tr>
        </tbody>
      </table>
    </AntModal>
  )
}

export default Modal