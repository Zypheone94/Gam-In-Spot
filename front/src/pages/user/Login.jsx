import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import {api} from '../../utils/api.jsx'

// Import utils pour Redux

import {useDispatch} from 'react-redux'; // Importez useDispatch
import {setUser} from '../../redux/actions/userActions';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    // Const for Redirection
    const dispatch = useDispatch();
    // Consst for Redux

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api('/users/login', 'POST', {
                email: email,
                password: password
            });
            const data = response.user_info;

            Cookies.set('access_token', response.token, { secure: true, sameSite: 'strict', expires: 30 });
            Cookies.set('refresh_token', response.refresh, { secure: true, sameSite: 'strict', expires: 7 });
            // Put access token in cookie

            dispatch(setUser(data));
            // Put user info in store

            navigate('/')
        } catch (error) {
            // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login
