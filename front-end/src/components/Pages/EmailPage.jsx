import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";

const EmailPage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div
      className="text-center p-3"
      style={{ marginTop: "10rem", marginBottom: "10rem" }}
    >
      <h1>Please Verify Your email....</h1>
      <MarkEmailReadIcon style={{ fontSize: "10rem", color: "#ff3484" }} />
      <p>
        Please Verify your email address. We've sent a confirmation email to:
      </p>
      <p>Click the confirmation link in email to begin uing Dribbble. </p>
      <p>
        If Don't receive the email?. Check your spam folder, it may have been
        cought by a filter,if you stile don't see it,you can{" "}
        <button className="border-0 bg-light" style={{ color: "#ff3484" }}>
          resend the confirmationemail
        </button>
        <p>
          Wrong Email Address?{" "}
          <Link
            to={`/profile/${auth.user._id}`}
            style={{ color: "#ff3484", textDecoration: "none" }}
          >
            Change it
          </Link>
        </p>
      </p>
    </div>
  );
};

export default EmailPage;
