import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import LoginPage from '../../component/Login/Login';
import Register from '../../component/Register/Register';
import './LoginRegisterPage.scss';

function LoginRegisterPage() {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    const loginRef = useRef(null);
    const registerRef = useRef(null);

    const switchToRegister = () => {
        gsap.to(loginRef.current, {
            opacity: 0,
            x: -200,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                setLogin(false);
            }
        });
        setTimeout(() => {
            setRegister(true);
            gsap.fromTo(registerRef.current, 
                { opacity: 0, x: 200}, 
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out'}
            );         
        },200)
    };

    const switchToLogin = () => {
        gsap.to(registerRef.current, {
            opacity: 0,
            x: 200,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                setRegister(false);
            }
        });
        setTimeout(() => {
            setLogin(true);
            gsap.fromTo(loginRef.current, 
                { opacity: 0, x: -200}, 
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out'}
            );         
        },200)
    };

    return (
        <div className='loginRegisterPage__container'>
            <div className='innerWrapper'>
                {login && (
                    <div className="login_container" ref={loginRef}>
                        <div className="change_to_register">
                            <p>New Here?</p>
                            <button onClick={switchToRegister}>Register</button>
                        </div>
                        <LoginPage />
                    </div>
                )}
                {register && (
                    <div className="register_container" ref={registerRef}>
                        <Register />
                        <div className="change_to_login">
                            <p>Already a Customer?</p>
                            <button onClick={switchToLogin}>Login</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginRegisterPage;
