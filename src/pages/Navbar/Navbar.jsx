import "./Navbar.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile/UserProfile.jsx";
import { useState } from "react";

const Navbar = () => {

const [open, setOpen] = useState(false);

const handleModalState = () => setOpen(!open);

  const  auth  = useSelector((state) => state.auth);


  return (
    <div className="w-full navbarcontainer z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center">
      <p className="font-bold text-lg">Task Manager</p>
      <div className="flex items-center gap-5">
        <p className="font-semibold text-lgx">{auth.user.fullName}</p>
        <Avatar
        onClick={handleModalState}
          alt="user image"
          src={auth.user.profilePhoto}
        />
      </div>
      { open && <UserProfile open={open} auth={auth} userId={auth.user.id} handleModalState={handleModalState} />}
    </div>
  );
};

export default Navbar;
