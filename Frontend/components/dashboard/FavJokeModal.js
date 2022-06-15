import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { getQuotePost } from "store/feature/Dashboard/DashboardService";
import { useAppSelector } from "hooks/hook";
import { authSelector } from "store/feature/auth/authSlice";
import QuoteCard from "./QuoteCard";

const FavJokeModal = ({ modalVisible, onCloseHandler }) => {
  const [quotesList, setQuotesList] = useState([]);
  const auth = useAppSelector(authSelector);
  useEffect(() => {
    getQuotePost(auth.User.username).then((res) => {
      if (!res) return;
      setQuotesList(res.data.user_posts);
    });
  }, []);
  return (
    <Modal
      visible={modalVisible}
      title="Fav Quotes"
      footer={[
        <Button onClick={onCloseHandler} key="modalCloseFav">
          Close
        </Button>,
      ]}
      centered
      bodyStyle={{ backgroundColor: "rgb(156 163 175)" }}
      onCancel={onCloseHandler}
    >
      {quotesList?.map((item) => (
        <QuoteCard
          key={item.PostID.value}
          quotesList={quotesList}
          item={item}
          setQuotesList={setQuotesList}
        />
      ))}
      {quotesList.length === 0 && (
        <div className="flex w-full p-4 bg-white dark:bg-slate-600 dark:text-white justify-between align-middle  shadow-xl my-8  dark:shadow-white">
          You have no Fav Quotes
        </div>
      )}
    </Modal>
  );
};

export default FavJokeModal;
