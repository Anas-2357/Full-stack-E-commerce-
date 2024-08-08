import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      // if (res.type === 'auth/loginUser/fulfilled') {
      //   navigate('/profile');
      // }
    });
  };

  return (
    <div className='login__container'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="buttons">
          <button type="submit" className='submit'>Log in</button>
          <button className='forget'>Forget Password?</button>
        </div>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
