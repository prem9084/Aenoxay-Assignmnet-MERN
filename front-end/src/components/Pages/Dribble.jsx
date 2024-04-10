import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Dribble = () => {
  const [lookingto, setLookingto] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setLookingto(e.target.value);
  };

  const userUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("lookingto", lookingto);

      const res = await axios.put(
        `/api/v1/user/update-profile/${params.id}`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/verify-email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "5rem" }}>
        <div className="d-flex flex-row justify-content-around align-content-center w-75 m-auto cards">
          <div className="border p-3  rounded-5">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*BgUAEwIro7h6zBTYpkOIxg.jpeg"
              alt="job/image"
              height={"230rem"}
              width={"100%"}
            />
            <p className="mt-4 text-center">
              I am a designer looking to Share my Work
            </p>
            <input
              type="checkbox"
              name="lookingto"
              style={{ marginLeft: "8.5rem" }}
              className="inputs"
              value="ShareWork"
              // checked={lookingto === "I am a designer looking to Share my Work"}
              onChange={handleChange}
            />
          </div>

          <div className="border p-3 rounded-5 card">
            <img
              src="https://media.licdn.com/dms/image/D4D22AQGMttPElr5D4g/feedshare-shrink_800/0/1707860570763?e=2147483647&v=beta&t=IWv5gTiMrr7gb-gtMOFUldY1M4eiwRNpQvzT8EmfrMg"
              alt="job/image"
              height={"250rem"}
              width={"100%"}
            />
            <p className="mt-4 text-center">I'm looking to hire a desiger</p>
            <input
              type="checkbox"
              name="lookingto"
              value="HireDesigner"
              // checked={lookingto === "I'm looking to hire a desiger"}
              onChange={handleChange}
            />
          </div>

          <div className="border p-3 rounded-5 card">
            <img
              src="https://inspgr.id/app/uploads/2023/09/design-truf-feature.jpg"
              alt="job/image"
              height={"250rem"}
              width={"100%"}
              className="m-auto"
            />
            <p className="mt-4 text-center">
              I am looking for design inspiration
            </p>
            <input
              type="checkbox"
              name="lookingto"
              value="DesignInspiration"
              // checked={lookingto === "I am looking for design inspiration"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center mt-5">
          <button
            className="btn"
            style={{
              backgroundColor: lookingto ? "#ff3484" : "#d3d3d3",
              width: "15rem",
            }}
            onClick={userUpdate}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dribble;
