import React, { useState, useEffect } from 'react';
import { sendRequest } from './../../config/request'; 
import Broker from '../../hero-img.png'

function Profile() {
    const [originalUser, setOriginalUser] = useState(null); 
    const [user, setUser] = useState(null);
    const [editable, setEditable] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
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

    const handleSaveProfile = async () => {
        try {
            const response = await sendRequest({method: 'POST',route: 'user/updateUser',body: user,});
            if (response.status === 'Success') {
                setEditable(false);
                setChangesMade(false);
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
                const response = await sendRequest({
                    method: 'GET',
                    route: 'user/profile',
                });

                if (response.status === 'Success' && response.authenticated) {
                    setOriginalUser(response.user); 
                    setUser(response.user);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
      <div className='w-full'>
        <div className='ml-20'>
          <h2 className="text-3xl text-gray-800 font-medium leading-9">Your Profile Info</h2>
          <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
        </div>
        <div className='flex flex-row-reverse w-full'>
          <div className='mr-20'> <img src={Broker}></img> 
          </div> 
          <div className="container mx-auto ml-20 max-w-lg">
              <div className="mb-4">
                  <label className="block mb-2">Name:</label>
                  <input type="text" name="name" value={user.name} onChange={handleInputChange} disabled={!editable} className="w-full border border-gray-300 rounded px-3 py-2"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Email:</label>
                  <input type="email" name="email" value={user.email} onChange={handleInputChange} disabled={!editable} className="w-full border border-gray-300 rounded px-3 py-2"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Password:</label>
                  <input type="password" name="password" value={user.password} onChange={handleInputChange} disabled={!editable}className="w-full border border-gray-300 rounded px-3 py-2"/>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Phone:</label>
                  <input type="text" name="phone"value={user.phone} onChange={handleInputChange}disabled={!editable} className="w-full border border-gray-300 rounded px-3 py-2"/>
              </div>
              {editable ? (
                  <div className="mb-4">
                      <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                      <button onClick={handleSaveProfile} disabled={!changesMade}className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  </div>
              ) : (
                  <button onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
              )}
          </div>
        </div> 
      </div>
    );
}

export default Profile;
