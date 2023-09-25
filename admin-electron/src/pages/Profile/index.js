import React, { useState, useEffect } from 'react';
import { sendRequest } from './../../config/request'; 
import ButtonSm from "../../components/ButtonSm";
import Modal from "../../components/Modal";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [originalUser, setOriginalUser] = useState(null); 
    const [user, setUser] = useState({name: '',email: '',password: '',phone: ''});
    const [editable, setEditable] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({...prevUser, [name]: value,}));
        setChangesMade(true);
    };

    const handleEditProfile = () => {
        setEditable(true); 
    };

    const handleCancelEdit = () => {
        setEditable(false); 
        setChangesMade(false); 
        setUser(originalUser);
    };

    const [error, setError] = useState(null);
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const validatePassword = (password) => {
      return !password || password.length >= 8;
    };

    const handleSaveProfile = async () => {
      if (!user.name) {
        setError("Name is required");
        return;
      }
      if (!validateEmail(user.email)) {
        setError("Invalid Email Address");
        return;
      }
      if (!validatePassword(user.password)) {
        setError("Password must be at least 8 characters long");
        return;
      }
      if (!user.phone) {
        setError("Phone is required");
        return;
      }
        try {
            const response = await sendRequest({method: 'PUT',route: '/updateAdmin',body: user});
            if (response.status === 'success') {
                setEditable(false);
                setChangesMade(false);
                openModal()
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await sendRequest({method: 'GET',route: 'profile'});
                    setOriginalUser(response); 
                    setUser(response);
            } catch (error) {
                navigate("/");
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);
    if (!user) {
        return <div></div>;
    }

    return (
      <div className='w-full'>
        <div className='mx-7'>
          <h2 className="text-3xl text-gray-800 font-medium leading-9">Your Profile Info</h2>
          <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
        </div>
        <div className='flex justify-start w-full'>
          <div className="container mr-auto mx-7 max-w-lg">
              <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input type="text" name="name" value={user.name} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input type="email" name="email" value={user.email} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Password</label>
                  <input type="password" name="password" value={user.password} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Phone</label>
                  <input type="text" name="phone"value={user.phone} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
              </div>
              {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
              {editable ? (
                  <div className="mb-4">
                      <button onClick={handleCancelEdit} className="bg-gray-800 text-white rounded-tr-2xl mr-2 py-4 font-semibold px-6 rounded-tr-2x  hover:text-white text-sm ">Cancel</button>
                      <button onClick={handleSaveProfile} disabled={!changesMade}className=" text-gray-800 px-7 py-2 rounded-tr-2xl mr-2 py-4 font-semibold px-6 rounded-tr-2x bg-primary hover:text-white text-sm">Save</button>
                  </div>
              ) : (
                  <ButtonSm buttonText="Edit" onClick={handleEditProfile} />
              )}
          </div>
        </div>
        {showModal && (<Modal message="Profile Updated Successfuly" onClose={closeModal} />)} 
      </div>
    );
}

export default Profile;
