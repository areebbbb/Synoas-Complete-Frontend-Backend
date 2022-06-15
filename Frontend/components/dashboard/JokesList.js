import { Button } from "antd";
import { useState } from "react";
import JokeCard from "./JokeCard";
import FavJokeModal from "./FavJokeModal";

const JokesList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const listOfJokes = Array(7).fill(0);
  const onCloseHandler = () => {
    setModalVisible(false);
  };
  return (
    <>
      {listOfJokes.map((item, index) => (
        <JokeCard key={`${item}${index}`} />
      ))}
      <div className="p-4">
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
          style={{ minWidth: "100%", borderRadius: 18 }}
          type="primary"
          htmlType="antdButton"
        >
          View Favorite Quotes
        </Button>
      </div>
      {modalVisible && (
        <FavJokeModal
          modalVisible={modalVisible}
          onCloseHandler={onCloseHandler}
        />
      )}
    </>
  );
};

export default JokesList;
