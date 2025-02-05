import { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
} from "@mui/material";
// import { DatePicker } from "@mui/lab";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
// import { fetchTaskById, updateTask } from "../../../ReduxToolkit/TaskSlice.";
import UploadWidget from "../../uploadWidget/UploadWidget";
import { updateUser } from "../../ReduxToolkit/AuthSlice";

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

const Userprofile = ({ open, userId, auth, handleModalState }) => {
  const dispatch = useDispatch();



 const [userImage, setUserImage] = useState(null);
 const [userImageId, setUserImageId] = useState(null);



  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    profilePhoto: "",
    photoId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.profilePhoto = userImage;
    formData.photoId = userImageId;
 
    // Handle form submission here
    console.log(formData);
    
    dispatch(updateUser({ updatedUserData:formData}))
    
    
  };


 

  useEffect(()=>{
    if(auth){
      setFormData({
        fullName: auth.user.fullName || "",
         email: auth.user.email || "", 
         mobileNumber: auth.user.mobileNumber || "", 
         profilePhoto: auth.user.profilePhoto || "", 
         photoId: auth.user.photoId || "",
      })
    }
    // 

  },[auth])

  return (
    <Modal
      open={open}
      onClose={handleModalState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center" position={"relative"}>
          <p className="absolute top-2 right-2 cursor-pointer" onClick={handleModalState}>X</p>

          <div className="  flex flex-col justify-center content-center m-auto">
        
               <img src={userImage ? userImage : formData.profilePhoto}  alt="user-image" className='w-48 h-full object-cover rounded-sm'/>
          
                <UploadWidget
              
                  uwConfig={{
                    multiple: true,
                    cloudName: "vickdawson",
                    uploadPreset: "lzye0s0v",
                    folder: "task_images",
                  }}
                  setState={setUserImage}
                  setPublicId={setUserImageId}
                />
              </div>
            
         
            <Grid item xs={12}>
              <TextField
                label="username"
                aria-readonly
                fullWidth
                name="username"
                value={formData.fullName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="email"
                aria-readonly
                fullWidth
                name="email"
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="mobileNumber"
                fullWidth
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
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

export default Userprofile;
