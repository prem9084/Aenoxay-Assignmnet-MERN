import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/authContext";
import axios from "axios";

const NavBar = () => {
  const [auth, setAuth] = useAuth();

  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

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

  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("User Logout successfully");
  };

  return (
    <>
      {auth?.user && (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link
                className="navbar-brand"
                to={"/"}
                style={{ fontFamily: "cursive" }}
              >
                dribbble
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                      style={{ fontFamily: "alert-primary" }}
                    >
                      Inspiration
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={""}
                      style={{ fontFamily: "alert-primary" }}
                    >
                      Find Work
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={""}
                      style={{ fontFamily: "alert-primary" }}
                    >
                      Learn Design
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={""}
                      style={{ fontFamily: "alert-primary" }}
                    >
                      Go Pro
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={""}
                      style={{ fontFamily: "alert-primary" }}
                    >
                      Hire Designers
                    </Link>
                  </li>
                </ul>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <SearchIcon />
                  </button>
                </form>
                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-link">
                    <LocalMallIcon
                      style={{ fontSize: "2rem", margin: "auto" }}
                    />
                  </li>

                  <li className="nav-link">
                    <Link to={`/profile/${auth.user._id}`}>
                      {profilePic !== null ? (
                        <Avatar
                          src={`/api/v1/user/get-photo/${auth.user._id}`}
                        />
                      ) : (
                        <Avatar />
                      )}
                    </Link>
                  </li>

                  <li className="nav-link">
                    <button
                      className="btn text-light fw-bold"
                      style={{ backgroundColor: "#ff3484" }}
                    >
                      Upload
                    </button>
                  </li>
                  <li className="nav-link">
                    <Link
                      to={"/"}
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "black",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default NavBar;
