import React from 'react';
import Header from './header';
import '../../styles/form.css';
import { useState } from 'react';
import { validateEmail, validatePassword } from '../../validations/validations';
import API from '../../api';
import { useNavigate, Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authenticate';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);

        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);

        if(!isValidEmail.status){
            setMessage(isValidEmail.message);
            return;
        }
        if(!isValidPassword){
            setMessage("Invalid password.");
            return;
        }

        const formData = {
            email: email,
            password: password,
        }

        try{
            const response = await API.post('/login', formData);
            
            sessionStorage.setItem('fullname', response.data.fullName);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('authenticated', response.data.authenticated);
            
            navigate('/catalog');
        }catch(err){
            setMessage(err.response.data.message);
        }
    }

  return (
    <div className='background'>
        <Header/>
        <form className="form" onSubmit={ handleSubmit }>
            <h2>LOGIN TO YOUR ACCOUNT</h2>
            <div className='field'>
                <input 
                    type="text"
                    name=""
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div> 
            <div className='field'>
                <input 
                    type="password"
                    name="password" 
                    value={password} 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {clicked && <div>{message}</div>}
            <div className="field">
                <button className="submit button" type="submit">LOG IN</button>
            </div>
            <div style={{color:"blue", fontWeight: "bold"}}><Link to='/forgot-password'>Forgot Password</Link></div>
        </form>
    </div>
  )
}

export default Login