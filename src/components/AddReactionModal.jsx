import Box from "@mui/material/Box";
import EmojiPicker from "emoji-picker-react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import useDataCall from "../hooks/useDataCall";


export default function AddReaction({
  setOpenModal,
  openModal,
  item,
  handleClose,
}) {
  const handleCloseModal = () => setOpenModal(false);
  const { addReaction } = useDataCall();
  const chatNumber = item?.chatId

  const setEmoji = (e) => {
    handleCloseModal();
    addReaction(
      { messageId: item._id, reaction: e?.emoji },
      chatNumber
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
