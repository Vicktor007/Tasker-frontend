import { Box, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionsByTaskId } from "../../../ReduxToolkit/SubmissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmissionListModal = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const  submission  = useSelector((state) => state.submission);

  useEffect(() => {
    dispatch(fetchSubmissionsByTaskId({ taskId }));
  }, [dispatch, taskId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <h1 className="text-center text-xl pb-5">All The Submision Of Task 1</h1> */}
          <div className="space-y-2">
            {submission.submissions.length > 0 ? (
              submission.submissions.map((item) => <SubmissionCard key={item.id} submission={item}/>)
            ) : (
              <div className="text-center">No Submission Found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmissionListModal;
