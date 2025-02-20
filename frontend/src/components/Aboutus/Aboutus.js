import React from 'react';
import classes from './Aboutus.module.css'; // Import CSS module

const AboutUs = () => {
  return (
    <div className={classes.aboutUs}>
      <header className={classes.header}>
        <h1>About Us</h1>
        <p>Learn more about our mission, vision, and team.</p>
      </header>

      <section className={classes.introduction}>
        <h2>Our Company</h2>
        <p>
          Welcome to our company! We are dedicated to providing the best service
          to our customers. Our team is passionate about our mission and works
          hard to achieve our goals.
        </p>
      </section>

      <section className={classes.mission}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize the industry with innovative solutions
          and unparalleled customer service. We strive to exceed expectations and
          deliver exceptional value to our clients.
        </p>
      </section>

      <section className={classes.team}>
        <h2>Meet the Team</h2>
        <div className={classes.teamMembers}>
          <div className={classes.teamMember}>
            <h3>Roshan Zameer</h3>
            <p>B.Tech Student </p>
          </div>
        </div>
      </section>

      <section className={classes.contact}>
        <h2>Contact Us</h2>
        <p>
          Have questions? Feel free to reach out to us at any time. We’re here to
          help!
        </p>
        <p>Email: roshanzameer111000@gmail.com</p>
        <p>Phone: +918919866105</p>
        <p>Email: muskan220405@gmail.com</p>
        <p>Phone: +917075665262</p>


      
      </section>
    </div>
  );
};

export default AboutUs;
