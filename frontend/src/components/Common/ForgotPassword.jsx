import React from 'react';
import Header from './header';
import { validateEmail } from '../../validations/validations';
import API from '../../api';
import { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        
        console.log(email);
        if(!validateEmail(email).status){
            setMessage("Invalid Email");
            return;
        }

        try{
            const response = await API.post('/forgot-password', { email: email });
            setMessage(response.data.message);
        }catch(err){
            setMessage(err.response.data.message);
        }
    }
  return (
    <div className="background">
        <Header/>
        <form onSubmit={handleSubmit} className="form">
            <h2>FORGOT PASSWORD</h2>
            <div className="field">
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                />
            </div>
            <div className="field">
                <button className="submit button" type="submit">REQUEST PASSWORD CHANGE</button>
            </div>
            {clicked && <div>{message}</div>}
        </form>
    </div>
  )
}

export default ForgotPassword;