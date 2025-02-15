import  { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  Autocomplete,
  Grid2,
} from "@mui/material";
import * as Yup from "yup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { createNewTask } from "../../../ReduxToolkit/TaskSlice";
import UploadWidget from "../../../uploadWidget/UploadWidget";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.string()
    .url("Please enter a valid URL")
    .required("Image URL is required"),
  description: Yup.string().required("Description is required"),
  deadline: Yup.date().required("Deadline is required"),
});

const tags = ["Angular", "React", "Vuejs", "Spring Boot", "Node js", "Python"];

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

const CreateTaskForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [selectedTags, setSelectedTags] = useState([]);
  const [taskImage, setTaskImage] = useState(null);
  const [taskImageId, setTaskImageId] = useState(null);
  // const [imagePreview, setImagePreview] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imageId: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
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
    const { deadline } = formData;
    formData.deadline = formatDate(deadline);
    formData.tags = selectedTags;
    formData.image = taskImage;
    formData.imageId = taskImageId;
  
    dispatch(createNewTask(formData));
    console.log("Form data:", formData, formatDate(deadline));
    handleClose();
    setFormData({
      title: "",
      image: "",
      description: "",
      tags: [],
      deadline: null,
    });
    setSelectedTags([]);
    setTaskImage(null);
    setTaskImageId(null);
  };

  const imagePlaceHolder = "/public/Placeholder.svg";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center" position={"relative"}>
          <p className="absolute top-2 right-2 cursor-pointer" onClick={handleClose}>X</p>

          <div className="  flex flex-col justify-center content-center m-auto h-[200px]">
        
           <img src={taskImage ? taskImage : imagePlaceHolder}  alt="task-image" className='w-48 h-full object-cover rounded-sm'/>
       
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
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={tags}
                onChange={handleTagsChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Favorites" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="w-full"
                  label="Deadline"
                  //   value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => <TextField {...params} />}
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
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTaskForm;
