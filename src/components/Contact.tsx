
// @ts-nocheck

import React from "react";
import { EnvelopeIcon, LinkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import "../styles/Contact.css"; // Import the external CSS file
import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { ContactInfoProps } from "../types/ContacType";

const Contact: React.FC<ContactInfoProps> = ({ address, email, linkedin }) => {
  return (
    <section className="relative">
      <div className="contact-container">
        <div className="contain-wrapper">
          <div className="contact-title">
            <h2 className="contact-title-heading">C O N T A C T S</h2>
            <div className="contact-title-line"></div>
          </div>
          <div className="contact-body">
            {/* Left Section */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Have questions about our services? Reach out to me!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPinIcon className="icon" />
                  <span>{address}</span>
                </div>
                <div className="contact-item">
                  <EnvelopeIcon className="icon" />
                  <span>{email}</span>
                </div>
                <div className="contact-item">
                  <LinkIcon className="icon" />
                  <span>{linkedin}</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-icon">F</a>
                <a href="#" className="social-icon">T</a>
                <a href="https://www.linkedin.com/in/phankhang107" className="social-icon">In</a>
              </div>
            </div>

            {/* Right Section */}
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form className="form-fields">
                <div className="input-group">
                  <input type="text" placeholder="First Name" className="input" />
                  <input type="text" placeholder="Last Name" className="input" />
                </div>
                <input type="email" placeholder="Email" className="input" />
                <input type="text" placeholder="Subject" className="input" />
                <textarea placeholder="Write your message here..." className="textarea"></textarea>
                <button className="submit-btn">▶ Send Message</button>
              </form>
            </div>


            <div className="contact-card-containter">
              <Card
                shadow={false}
                className="contact-card"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="contact-card-header"
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="contact-card-body">
                  <Typography
                    variant="h2"
                    color="white"
                    className="mb-6 font-medium leading-[1.5]"
                  >
                    Drop me a line if you need anything
                  </Typography>
                  <Typography variant="h5" className="mb-4 text-gray-400">
                    Khang Phan
                  </Typography>
                  <Avatar
                    size="xl"
                    variant="circular"
                    alt="tania andrew"
                    className="border-2 border-white"
                    src="/images/assets/profile.jpeg"
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Contact;
