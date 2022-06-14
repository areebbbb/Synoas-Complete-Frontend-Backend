import React from "react";
import { Modal, Button } from "antd";
import { useEffect } from "react";
import { useState } from "react";
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
    </Modal>
  );
};

export default FavJokeModal;
