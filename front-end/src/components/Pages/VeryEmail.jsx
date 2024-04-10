import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const VeryEmail = () => {
  const VerifyEmail = async () => {
    try {
      const res = await axios.get("/api/v1/user/verify");

      toast.success("Email Verify Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    VerifyEmail();
  }, []);
  return (
    <div style={{ marginTop: "10rem", marginBottom: "10rem" }}>
      <div className="me-auto text-center">
        <h1 className="text-success">Email Verify Successfully....</h1>
      </div>
    </div>
  );
};

export default VeryEmail;
