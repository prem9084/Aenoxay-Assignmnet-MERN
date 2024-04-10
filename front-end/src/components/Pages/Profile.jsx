import React, { useEffect, useState } from "react";
import "./Profile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/authContext";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [selectPic, setSelectPic] = useState(null);
  const [id, setId] = useState("");
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const userSingleUser = async () => {
    try {
      const res = await axios.get(`/api/v1/user/get-single-user/${params.id}`);
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setUsername(res.data.user.username);
      setLocation(res.data.user.location);
      setId(res.data.user._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userSingleUser();
  }, []);

  const userUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("profilePic", profilePic);
      data.append("location", location);
      const res = await axios.put(
        `/api/v1/user/update-profile/${params.id}`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate(`/select-job-type/${res.data.user._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectPic(e.target.files[0]);
    setProfilePic(e.target.files[0]);
  };

  const fetchProfilePic = async () => {
    try {
      if (auth.user && auth?.user?._id) {
        const response = await axios.get(
          `/api/v1/user/get-photo/${auth.user._id}`
        );
        setProfilePic(response.data.profilePic);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfilePic();
  }, [auth.user, auth.user?._id]);

  return (
    <div className="p-2" style={{ marginTop: "7rem" }}>
      <form
        style={{ border: "1px solid black" }}
        className="m-auto w-50 p-3 rounded form"
        onSubmit={userUpdate}
      >
        <h2>Welcome Let's Your Profile</h2>
        <p>Let other get know your better! You Can do these later</p>
        <h3 className="mt-5 fw-bold">Add an Avatar</h3>
        <div className="d-flex flex-row forms mt-3 profiles">
          <div className="profile-pic-container col-md-6">
            {profilePic !== null ? (
              <img
                src={
                  selectPic
                    ? URL.createObjectURL(selectPic)
                    : `/api/v1/user/get-photo/${params.id}`
                }
                alt="Profile"
                className="profile-pic"
              />
            ) : (
              <div className="profile-pic-placeholder">
                <AddAPhotoIcon size="2x" />
              </div>
            )}
          </div>

          <div className="col-md-6 m-auto  p-3">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              // className="file-input"
              className="btn btn-outline-info w-100"
              name="profilePic"
            />
          </div>
        </div>
        <div className="mt-5">
          <h6 className="fw-bold">Name</h6>
          <input
            type="text"
            className="w-100  form-control  mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <h6 className="fw-bold">Email</h6>
          <input
            type="email"
            className="w-100  form-control  mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <h6 className="fw-bold">Username</h6>
          <input
            type="text"
            className="w-100  form-control  mt-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <h2 className="fw-bold">Add Your Location</h2>
          <input
            type="text"
            placeholder="Enter Your Location"
            className="w-100  form-control  mt-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn w-25 mt-5 "
          style={{ backgroundColor: "#ff3484" }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Profile;
