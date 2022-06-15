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
      <div className="flex w-full p-4 bg-white dark:bg-slate-600 dark:text-white   shadow-xl my-8  dark:shadow-white">
        <div className="w-full">{item.PostID.value}</div>
        <div className="h-full m-auto p-2 w-24">
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            type={"primary"}
            htmlType="antdButton"
            style={{ minWidth: "100%" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              DeleteQuotePost(item);

              let newTempArray = quotesList.filter(
                (data) => data.UserPostID !== item.UserPostID
              );
              setQuotesList(newTempArray);
            }}
            type={"danger"}
            style={{ minWidth: "100%" }}
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
