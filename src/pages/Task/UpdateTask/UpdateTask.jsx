import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  FormControlLabel,
} from "@mui/material";
// import { DatePicker } from "@mui/lab";
import * as Yup from "yup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { createNewTask, fetchTaskById, updateTask } from "../../../ReduxToolkit/TaskSlice";
import UploadWidget from "../../../uploadWidget/UploadWidget";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.string()
    .url("Please enter a valid URL")
    .required("Image URL is required"),
  description: Yup.string().required("Description is required"),
  deadline: Yup.date().required("Deadline is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  p: 4,
  boxShadow: "rgba(215, 106, 255, 0.507) 0px 0px 100px",
};

const UpdateTaskForm = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
 const  task = useSelector((state) => state.task);

 const [taskImage, setTaskImage] = useState(null);
 const [taskImageId, setTaskImageId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imageId: "",
    description: "",
    deadline: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds,
    } = input;

    month = month + 1;

    const date = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );

    const formattedDate = date.toISOString();
    return formattedDate;
  };

  const handleDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const {deadline}=formData;
    formData.deadline=formatDate(deadline);
    formData.image = taskImage;
    formData.imageId = taskImageId;
    // Handle form submission here
    dispatch(updateTask({id:taskId, updatedTaskData:formData}))
    console.log("Form data:", formData, formatDate(deadline));
    handleClose(); // Close modal after form submission
  };

  useEffect(()=>{
    
    dispatch(fetchTaskById(taskId))

  },[dispatch, taskId])

 

  useEffect(()=>{
    if(task.taskDetails){
      setFormData(task.taskDetails)
    }
    // 

  },[task.taskDetails])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit} className="h-[80%]">
          <Grid container spacing={2} alignItems="center">
          <div className="  flex flex-col justify-center content-center m-auto">
        
               <img src={taskImage ? taskImage : formData.image}  alt="task-image" className='w-48 h-full object-cover rounded-sm'/>
          
                <UploadWidget
              
                  uwConfig={{
                    multiple: true,
                    cloudName: "vickdawson",
                    uploadPreset: "lzye0s0v",
                    folder: "task_images",
                  }}
                  setState={setTaskImage}
                  setPublicId={setTaskImageId}
                />
              </div>
            
         
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={2}
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 className="w-full"
                 label="Deadline"
                 
                   value={formData.deadline}
                
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="w-full"
                  label="New Deadline"
                  
                    // value={formData.deadline}
                  onChange={handleDeadlineChange}
                  input={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ padding: ".8rem" }}
                fullWidth
                className="customeButton"
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateTaskForm;
