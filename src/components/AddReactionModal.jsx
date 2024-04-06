import Box from "@mui/material/Box";
import EmojiPicker from "emoji-picker-react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import useDataCall from "../hooks/useDataCall";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddReaction({
  setOpenModal,
  openModal,
  item,
  handleClose,
}) {
  const handleCloseModal = () => setOpenModal(false);
  const { addReaction } = useDataCall();
  const { _id } = useParams();
  const { chats } = useSelector((state) => state?.appData);
  const { userId } = useSelector((state) => state?.auth);

  const chatNumber = chats?.filter(
    (item) => item?.members?.includes(userId) && item?.members?.includes(_id)
  );

  const setEmoji = (e) => {
    handleCloseModal();
    addReaction(
      { messageId: item._id, reaction: e?.emoji },
      chatNumber[0]?._id
    );
    handleClose();
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EmojiPicker
            reactionsDefaultOpen={true}
            onReactionClick={(e) => setEmoji(e)}
          />
        </Box>
      </Modal>
    </Box>
  );
}
