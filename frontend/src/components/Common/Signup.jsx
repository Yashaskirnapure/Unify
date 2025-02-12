import React from 'react'
import Header from './header'
import { useState } from 'react'
import { validateEmail, validatePassword } from '../../validations/validations'
import API from '../../api'

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);

        const isValidName = (fullName);
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);

        if(!isValidName){
            setMessage("Please provide a valid name.");
            return;
        }
        if(!isValidEmail.status){
            setMessage(isValidEmail.message);
            return;
        }

        if(!isValidPassword.status){
            setMessage(isValidPassword.message);
            return;
        }

        const formData = {
            fullName: fullName,
            email: email,
            password: password,
        }

        try{
            const response = await API.post('/verify-account', formData);
            setMessage(response.data.message);
        }catch(err){
            setMessage(err.response.data.message);
        }
    }


  return (
    <div className='background'>
        <Header/>
        <form className="form" onSubmit={handleSubmit}>
            <h2>SIGN UP FOR FREE</h2>
            <div className='field'>
                <input 
                    type="text"
                    name=""
                    placeholder='Full Name'
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div className='field'>
                <input 
                    type="text"
                    name=""
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div> 
            <div className='field'>
                <input 
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="field">
                <button className="submit button" type="submit">SIGN UP</button>
            </div>
            {clicked && <div>{message}</div>}
        </form>
    </div>
  )
}

export default Signup