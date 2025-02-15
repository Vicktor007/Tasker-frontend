import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubmitTaskForm from "../SubmitTask/SubmitTask";
import { UserListModal } from "./UserListModal";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteTask } from "../../../ReduxToolkit/TaskSlice";
import UpdateTaskForm from "../UpdateTask/UpdateTask";
import { useLocation, useNavigate } from "react-router-dom";
import SubmissionListModal from "./SubmissionListModal";

const techStack = ["Angular", "React", "Java"];

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

export const TaskCard = ({ item }) => {
  const  auth  = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("taskId");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openUpdateTaskModel, setOpenUpdateTaskModel] = useState(false);
  const handleOpenUpdateTaskModel = () => {
    setOpenUpdateTaskModel(true);
    handleClose();
    handleSetTaskIdInUrl(item.id);
  };
  const handleCloseUpdateTaskModel = () => {
    setOpenUpdateTaskModel(false);
    handleRemoveTaskIdInUrl();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // auth.user?.role==="ROLE_ADMIN"?handleOpenUserList():handleOpenSubmitForm()
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  const handleOpenSubmitForm = () => {
    handleSetTaskIdInUrl(item.id);
    setOpenSubmitForm(true);
    handleClose();
    handleSetTaskIdInUrl(item.id);
  };
  const handleCloseSubmitForm = () => {
    setOpenSubmitForm(false);
    handleRemoveTaskIdInUrl();
    handleRemoveTaskIdInUrl();
  };

  const [openUserList, setOpenUserList] = useState(false);
  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleSetTaskIdInUrl(item.id);
    handleClose();
  };
  const handleCloseUserList = () => {
    setOpenUserList(false);
    handleRemoveTaskIdInUrl();
  };

  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
    handleSetTaskIdInUrl(item.id);
    handleClose();
  };
  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
    handleRemoveTaskIdInUrl();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(item.id));
  };

  const handleSetTaskIdInUrl = (taskId) => {
    const currentSearchParams = new URLSearchParams(location.search);

    currentSearchParams.append("taskId", taskId);

    navigate(`?${currentSearchParams.toString()}`);
  };
  const handleRemoveTaskIdInUrl = () => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.delete("taskId");
    navigate(`?${currentSearchParams.toString()}`);
  };

 

  return (
    <>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div className="">
            <img
              className="lg:w-[7rem] lg:h-[7rem] rounded border-2 border-[#c24dd0] object-cover"
              src={item?.image}
              alt="task image"
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg ">{item?.title}</h1>
              <p className="text-gray-500 text-sm">{item?.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {item.tags?.map((item, i) => (
                <span key={i} className="py-1 px-5 rounded-full techStack">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="primary"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user.role === "ROLE_ADMIN" ? (
              <>
                <MenuItem onClick={handleOpenUserList}>Assign User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submissions
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleOpenSubmitForm}>SUBMIT</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
      <SubmitTaskForm
        open={openSubmitForm}
        handleClose={handleCloseSubmitForm}
        taskId={taskId}
      />
      <UserListModal
        taskId={taskId}
        open={openUserList}
        handleClose={handleCloseUserList}
      />

      <UpdateTaskForm
        taskId={taskId}
        open={openUpdateTaskModel}
        handleClose={handleCloseUpdateTaskModel}
      />
      <SubmissionListModal
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
        taskId={taskId}
      />
    </>
  );
};
