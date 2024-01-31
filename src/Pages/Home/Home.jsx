import React, { useState, useEffect } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import { useContractWrite, useContractRead, useContract, useAddress } from "@thirdweb-dev/react";
import './page.css';
import registrationform from './photo.png';
import UserRegistryABI from './profile.json'; // Replace with the actual ABI path

const Home = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');

  const { contract } = useContract("0x64239BDC9F285CE26848F80b9BB976e99E428Cbe");
  const address = useAddress();

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "setProfile"
  );

  const { data: profiles } = useContractRead(
    contract,
    "profiles",
    [address]
  );

  useEffect(() => {
    if (profiles && profiles.toString() !== '') {
      setHasAccount(true);
    }
  }, [profiles]);

  const registerUser = async () => {
    try {
      const tx = await mutateAsync({ args: [name, email, phone, age] });
      await tx.wait();
      setHasAccount(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const updateUserProfile = async () => {
    try {
      const tx = await mutateAsync({ args: [name, email, phone, age] });
      await tx.wait();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className='a1'>
      <div className='registration-img'>
        <img src={registrationform} alt='Registration Form' />
      </div>

      <div className='main-containerr'>
        <div className='containerr'>
          <div className='imagee'>
            {!hasAccount ? (
              <div className='form-box'>
                <div className='form'>
                  <h2>Register</h2>
                  <div className='input-box'>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                    <label htmlFor=''>Username</label>
                  </div>

                  <div className='input-box'>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <label htmlFor=''>Gmail</label>
                  </div>

                  <div className='input-box'>
                    <input type='text' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                    <label htmlFor=''>Mobile No.</label>
                  </div>

                  <div className='input-box'>
                    <input type='text' onChange={(e) => setAge(e.target.value)} value={age} required />
                    <label htmlFor=''>Age</label>
                  </div>

                  <Web3Button
                    contractAddress='0x64239BDC9F285CE26848F80b9BB976e99E428Cbe'
                    contractAbi={UserRegistryABI}
                    action={registerUser}
                  >
                    Register
                  </Web3Button>
                </div>
              </div>
            ) : (
              <div className='profile-section'>
                {isEditing ? (
                  <div className='form-box'>
                    <div className='form'>
                      <h2 className='text'>Edit Profile</h2>
                      <div className='input-box'>
                        <input type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                        <label htmlFor=''>Username</label>
                      </div>

                      <div className='input-box'>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <label htmlFor=''>Gmail</label>
                      </div>

                      <div className='input-box'>
                        <input type='text' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                        <label htmlFor=''>Mobile No.</label>
                      </div>

                      <div className='input-box'>
                        <input type='text' onChange={(e) => setAge(e.target.value)} value={age} required />
                        <label htmlFor=''>Age</label>
                      </div>

                      <button className='register-button' onClick={updateUserProfile}>
                        Update Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='user-profile'>
                    <h2>User Profile</h2>
                    <p>Name: {profiles?.name}</p>
                    <p>Email: {profiles?.email}</p>
                    <p>Phone: {profiles?.phone}</p>
                    <p>Age: {profiles?.age.toString()}</p>
                    <button className='register-button' onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
