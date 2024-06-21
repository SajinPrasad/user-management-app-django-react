import axios from "axios";
import { setCredentials } from '../../Features/authReducer';
import store from '../../store/store'
import { setProfile } from "../../Features/profileReducer";
import { Navigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const login = async (email, password) => {

    try {
        const response = await axios.post(`${baseURL}/api/token/`, {email, password})
        
        if (response.status === 200) {
            const data = response.data
            const { access, refresh } = data;

            // Decode the token to get the user info
            const tokenData = JSON.parse(atob(access.split('.')[1]));   
            
            localStorage.setItem('ACCESS_TOKEN' , JSON.stringify(data.access))
            localStorage.setItem('REFRESH_TOKEN' , JSON.stringify(data.refresh))
            localStorage.setItem('user', JSON.stringify({
                username: tokenData.username,
                fullname: tokenData.fullname,
                is_superuser: tokenData.is_superuser,
            }));

            store.dispatch(setCredentials({
                user: {
                    username: tokenData.username,
                    fullname: tokenData.fullname,
                    is_superuser: tokenData.is_superuser,
                },
                accessToken: access,
                refreshToken: refresh,
            }));

            console.log("Login success")
            
            return tokenData
        }

    } catch (error) {
        console.log('Invalid user credential')
        throw new Error("Invalid user credential");
    }
}

const signUp = async (email, username, fullname, password, password2) => {
    try {
        const response = await axios.post(`${baseURL}/api/register/`, {email, username, fullname, password, password2})
        
        if (response.status >= 200 && response.status < 300) {
            console.log('User registered successfully');
        } else {
            console.error('Error occurred while registering');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}


export {login, signUp};