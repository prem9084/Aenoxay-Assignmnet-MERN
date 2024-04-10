import React from "react";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { useAuth } from "../../Context/authContext";
const Footer = () => {
  const [auth] = useAuth();
  return (
    <>
      {auth.user ? (
        <>
          <div className="d-flex flex-row mt-5 footers">
            <div className="col-md-3 text-center">
              <span
                style={{
                  fontFamily: "cursive",
                  color: "#ff3484",
                }}
              >
                <h4>dribbble</h4>
              </span>
              <p>
                Dribble is the world's leading community for creatives to share,
                grow and get hired
              </p>
              <div>
                <LanguageIcon />
                <TwitterIcon className="ms-3" />
                <FacebookIcon className="ms-3" />
                <InstagramIcon className="ms-3" />
                <PinterestIcon className="ms-3" />
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex flex-row justify-content-between p-3 footer col-sm-12">
                <div>
                  <ul>
                    <li>
                      <h5>For Designer</h5>
                    </li>
                    <li>
                      <Link>Go Pro!</Link>
                    </li>
                    <li>
                      <Link>Explore design work</Link>
                    </li>
                    <li>
                      <Link>Dsign Blog</Link>
                    </li>
                    <li>
                      <Link>Overtime podcast</Link>
                    </li>
                    <li>
                      <Link>Playoffs</Link>
                    </li>
                    <li>
                      <Link>Playoffs</Link>
                    </li>
                    <li>
                      <Link>Refer to Friend</Link>
                    </li>
                    <li>
                      <Link>Code of Product</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <h5>Hire Desogners</h5>
                    </li>
                    <li>
                      <Link>Post a job opening</Link>
                    </li>
                    <li>
                      <Link>Search For designers</Link>
                    </li>
                    <li>
                      <h5>Brands</h5>
                    </li>
                    <li>
                      <Link>Advertize with us</Link>
                    </li>
                    <li>
                      <Link>Playoffs</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <h5>Company</h5>
                    </li>
                    <li>
                      <Link>About</Link>
                    </li>
                    <li>
                      <Link>Carears</Link>
                    </li>
                    <li>
                      <Link>Support</Link>
                    </li>
                    <li>
                      <Link>Media Kit</Link>
                    </li>
                    <li>
                      <Link>Tesimoniales</Link>
                    </li>
                    <li>
                      <Link>API</Link>
                    </li>
                    <li>
                      <Link>Terms Of Servece</Link>
                    </li>
                    <li>
                      <Link>Privacy Polic</Link>
                    </li>
                    <li>
                      <Link>Cookeis Policy</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <h5>Directories</h5>
                    </li>
                    <li>
                      <Link>Cookeis Policy</Link>
                    </li>
                    <li>
                      <Link>Designer for Hire</Link>
                    </li>
                    <li>
                      <Link>Freelance Designer</Link>
                    </li>
                    <li>
                      <Link>Freelance Designer for Hire</Link>
                    </li>
                    <li>
                      <Link>Tags</Link>
                    </li>
                    <li>
                      <Link>Place</Link>
                    </li>
                    <li>
                      <h5>Design assets</h5>
                    </li>
                    <li>
                      <Link>Dribbble MarcketPlace</Link>
                    </li>
                    <li>
                      <Link>Creative Market</Link>
                    </li>
                    <li>
                      <Link>Fontspring</Link>
                    </li>
                    <li>
                      <Link>Font Squirrel</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <h5>Design Resource</h5>
                    </li>
                    <li>
                      <Link>Font Squirrel</Link>
                    </li>
                    <li>
                      <Link>Design Hiring</Link>
                    </li>
                    <li>
                      <Link>Dsign Portfolio</Link>
                    </li>
                    <li>
                      <Link>Design Education</Link>
                    </li>
                    <li>
                      <Link>Creative Process</Link>
                    </li>
                    <li>
                      <Link>Design industry Trends</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row justify-content-between p-3">
            <p>&copy; 2024 Dribbble All rights reserved </p>
            <p>
              20,501,853 shorts dribbble{" "}
              <LanguageIcon style={{ color: "red" }} />
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
