import { useState } from "react";
import EditModal from "./EditModal";
import { Button } from "antd";
import { DeleteQuotePost } from "store/feature/Dashboard/DashboardService";

const QuoteCard = ({ item, quotesList, setQuotesList }) => {
  const [editMode, setEditMode] = useState(false);
  const onCloseHandler = () => {
    setEditMode(false);
  };
  return (
    <>
      <div className="flex w-full p-4 justify-between align-middle  shadow-xl my-8 ">
        {item.PostID.value}
        <div className="align-middle my-auto mx-3">
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            type={"ghost"}
            htmlType="antdButton"
          >
            Edit
          </Button>
        </div>
        <div className="align-middle my-auto mx-3">
          <Button
            onClick={() => {
              DeleteQuotePost(item);

              let newTempArray = quotesList.filter(
                (data) => data.UserPostID !== item.UserPostID
              );
              setQuotesList(newTempArray);
            }}
            type={"danger"}
            htmlType="antdButton"
          >
            Delete
          </Button>
        </div>
      </div>
      {editMode && (
        <EditModal
          editMode={editMode}
          onCloseHandler={onCloseHandler}
          item={item}
        />
      )}
    </>
  );
};

export default QuoteCard;
