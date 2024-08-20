import axios from 'axios';

export const getRate = async (setRate, setError) => {
    try {
        const response = await axios.get('http://localhost:5000/api/rate/get');
        if (response.status === 200) {
            setRate(response.data.rate || 0);
        }
    } catch (error) {
        console.error('Error fetching rate:', error);
        setRate(0);
        setError('Ошибка получения курса.');
    }
};

export const fetchGames = async (userId, setGames, setError) => {
    try {
        console.log(123);
        
        const response = await axios.get(`https://rbxsell.com/api/roblox-utils/users/${userId}/games`);
        console.log(response);
        
        // const response = await axios.get(`https://robux.space/api/v1/games?username=${username}`);
        if (response.status === 200) {
            console.log(response.data.data);
            
            setGames(response.data.data || []);
        }
    } catch (error) {
        console.error('Error fetching games:', error);
        setGames([]);
        setError('Ошибка получения списка игр.');
    }
};

export const verifyGamePass = async (selectedGame, gamePassPrice, setError, setModal) => {
    try {
        console.log(selectedGame.id);
        
        const response = await axios.get(`https://rbxsell.com/api/gamepass?universeId=${selectedGame.id}`);
        // const response = await axios.get(`https://robux.space/api/v1/games/passes?placeId=${selectedGame.rootPlace.id}`);
        console.log(response.data);
        
        const pass = response.data.data.find(pass => pass.price == gamePassPrice);

        if (pass) {
            setModal('step4');
        } else {
            setError('Указана неверная цена Game Pass.');
        }
    } catch (error) {
        console.error('Error verifying game pass:', error);
        setError('Ошибка при проверке Game Pass.');
    }
};

export const createOrder = async (username, robuxAmount, promocodeBonus, price, promocode, setError) => {
    try {
        setError(null); // Clear previous errors
        const response = await axios.post('http://localhost:5000/api/order/create', {
            username,
            robux: robuxAmount + promocodeBonus,
            price,
            promocode: promocode.toLowerCase()
        });
        if (response.status === 201) {
            alert('Order successfully created');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError('An error occurred while creating the order.');
        }
    }
};

export const applyPromocode = async (promocode, username, setPromocodeBonus, setError) => {
    try {
        setError(null);
        const response = await axios.post('http://localhost:5000/api/promocode/apply', { promocode: promocode.toLowerCase(), username });
        if (response.status === 200) {
            setPromocodeBonus(response.data.bonus);
        } else {
            setPromocodeBonus(0);
            setError('Промокода не существует.');
        }
    } catch (error) {
        console.error('Error applying promocode:', error);
        setPromocodeBonus(0);
        setError('Ошибка активации промокода.');
    }
};
