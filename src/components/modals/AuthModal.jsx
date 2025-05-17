import React, { useState } from 'react';
import './Modal.css';
import Button from '../common/Button';
import { authStore } from '../../store/Auth';

const AuthModal = ({ type, onClose, setType }) => {
    const [signinData, setSigninData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        nickname: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        file: null, // <=== Добавлено поле для файла
    });

    
    const changeToAuth = () => {
        setType("signup")
    };

    const changeToReg = () => {
        setType("signin")
    };

    const handleSignIn = async () => {
        authStore.signIn(signinData).then(() => {
            window.location.reload();
            onClose();
        });
    };

    const handleSignUp = async () => {
        if (signupData.password !== signupData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        authStore.signUp(signupData).then(() => {
            changeToReg();
        }); // Передаём всё, включая файл
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{type === 'signin' ? 'Вход' : 'Регистрация'}</h2>

                {type === 'signin' ? (
                    <div className="form form--signin">
                        <div className="fields">
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={signinData.email}
                                onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={signinData.password}
                                onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                            />
                        </div>
                        <span className="link--signin" onClick={changeToAuth}>Зарегистрироваться</span>
                        <Button type="SOLID" className="submitBtn" onClick={handleSignIn}>
                            Войти
                        </Button>
                    </div>
                ) : (
                    <div className="form form--signup">
                        <div className="fields">
                            <input
                                type="text"
                                placeholder="Придумайте никнейм"
                                value={signupData.nickname}
                                onChange={(e) => setSignupData({ ...signupData, nickname: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="ФИО"
                                value={signupData.fullName}
                                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={signupData.email}
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Номер телефона"
                                value={signupData.phone}
                                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Придумайте пароль"
                                value={signupData.password}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Повторите пароль"
                                value={signupData.confirmPassword}
                                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            />
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={(e) => setSignupData({ ...signupData, file: e.target.files[0] })}
                            />
                        </div>
                        <Button type="SOLID" onClick={handleSignUp}>
                            Зарегистрироваться
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
