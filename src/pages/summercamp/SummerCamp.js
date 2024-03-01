import React, { useState, useEffect } from 'react';
import './SummerCamp.css';
import Form from '../../components/form/Form';
import SignInForm from '../../components/form/SignInForm'; // Import the SignInForm component
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const SummerCamp = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleRegisterClick = () => {
    const currentUser = auth.currentUser;
    console.log(user)
    if (currentUser) {
      // User is logged in, redirect to child registration page
      navigate('/child-registration');
    } else {
      // User is not logged in, open sign in modal
      openSignInModal();
    }
  };

  return (
    <div className='summer-camp'>
      <div className='banner'>
        <h1>High Performance Conditioning Camp</h1>
        <h2>(Ages 13-16)</h2>
      </div>
      
      <div className='content'>
        <h1>2024 Summer Camp Program Coding and Basketball</h1>
        <h2 style={{color: "red"}}>Registration for our summer program opens on Monday<br/> Jan 16th 2024</h2>
        <button className='register-button' onClick={handleRegisterClick}>REGISTER HERE: Summer Camp Program</button>
        <div className='session'>
          <h2>Dates & Times</h2>
          <div className='session-list'>
            <div>Session 1: July 8 - July 12</div>
            <div>Session 2: July 15 - July 19</div>
            <div>Session 3: July 22 - July 26</div>
            <div>Session 4: July 29 - Aug 2</div>
            <div>Session 5: Aug 6 - Aug 9 (4 days)</div>
            <div>Session 6: Aug 12 - Aug 16</div>
          </div>
        </div>
        <div className='registration'>
          <h2>UP PERFORMANCE Coding and Basketball CAMPS STILL HAVE ROOM BUT TIME IS RUNNING OUT!</h2>
          <p>A Camp for young Athlete looking to better their Basketball skills, Coding and Digital skills and become great and have fun doing it!</p>
          <p>08:30 AM TO 04:30 PM</p>
          <p>Register for the Up Performance Basketball and Coding Camp where your young athlete will participate in our daily Performance Programs and a variety of Camp activities. These camps will be led by trained coaches from UP Performance under the Supervision of our skills coach.</p>
          <p>Participants will engage in challenging and fun exercises. We will show the athlete how to improve their ball handling, how to shoot like an elite player, how to finish as a pro, and how to defend against the best. We will teach the player the winner mindset. Athletes will work to get top-notch strength and conditioning.</p>

        </div>
        <div className='learning'>
          <h2>Fun and Flexible Learning</h2>
          <p>Kids learn together in live, hands-on, interactive programs run by Engineering student from university who will act as live mentors. Kids can design, create, play, and code together in a small group setting, leading to fun and friendships.</p>
        </div>
        <div className='morning-learn'>
          <h2>What Campers Learn in the morning</h2>
          <p>Our programs turn “screen time” into learning time - while still preserving all the fun! Your child will learn valuable skills for today's digital world in our camps and Labs.</p>
          <div className='morning-learn-list'>
            <div>Coding, design, and media production skills.</div>
            <div>Problem-solving.</div>
            <div>Teamwork and collaboration.</div>
            <div>Planning.</div>
            <div>The value of community.</div>
          </div>
        </div>
        <div className='bring'>
          <h2>What to Bring</h2>
          <div className='bring-list'>
            <div>Laptop</div>
            <div>Flash drive for saving files</div>
            <div>Adobe ID (sign up for free Adobe ID at adobe.com and bring the user name and password with you)</div>
            <div>Google Drive account (or similar cloud account) already set up in order to upload your files to the cloud</div>
          </div>
        </div>
        <div className='register-section'>
          <h2>Register Now</h2>
          <button onClick={handleRegisterClick}>Spring / Summer Registration</button>
        </div>
      </div>
      {showRegisterModal && <Form onClose={closeRegisterModal} onBack={openSignInModal}/>}
      {showSignInModal && <SignInForm onClose={closeSignInModal} onSignUp={openRegisterModal}/>}
    </div>
  );
}

export default SummerCamp;
