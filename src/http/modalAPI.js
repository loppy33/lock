import axios from 'axios';

export const getUser = async (userName, setUserData, setChoice) => {
    try {
        setChoice(false);
        
        const response = await axios.get(`https://rbxsell.com/api/roblox-utils/users?username=${userName}&withAvatar=true`);
        console.log(response.data.data);
        
        // const response = await axios.get(`https://robux.space/api/v1/users/usernames/${userName}`);
        setUserData(response.data.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export const login = async (username, setToken, userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/create', { username });
        setToken(userData); 
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
