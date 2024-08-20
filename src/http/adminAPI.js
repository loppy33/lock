import axios from 'axios';

export const handleLogin = async (login, password, onLogin, setError) => {
    try {
        const response = await axios.post('http://localhost:5000/api/manager/check', { login, password });
        if (response.status === 200) {
            onLogin(response.data.role);
        }
    } catch (error) {
        setError('Неправильный логин или пароль');
    }
};

export const getRate = async (setRate) => {
    try {
        const response = await axios.get('http://localhost:5000/api/rate/get');
        if (response.status === 200) {
            setRate(response.data.rate || '');
        }
    } catch (error) {
        console.error('Error fetching rate:', error);
        setRate('');
    }
};

export const fetchManagers = async (setManagers) => {
    try {
        const response = await axios.get('http://localhost:5000/api/manager');
        if (response.status === 200) {
            setManagers(response.data);
        }
    } catch (error) {
        console.error('Error fetching managers:', error);
    }
};

export const fetchPromocodes = async (setPromocodes) => {
    try {
        const response = await axios.get('http://localhost:5000/api/promocode');
        if (response.status === 200) {
            setPromocodes(response.data);
        }
    } catch (error) {
        console.error('Error fetching promocodes:', error);
    }
};

export const handleSaveRate = async (rate) => {
    try {
        const currency = rate;
        await axios.post('http://localhost:5000/api/rate/update', { currency });
    } catch (error) {
        console.error('Error saving rate:', error);
    }
};

export const handleCreateManager = async (newManager, managers, setManagers, setNewManager) => {
    try {
        const response = await axios.post('http://localhost:5000/api/manager/create', newManager);
        if (response.status === 200) {
            setManagers([...managers, response.data]);
            setNewManager({ login: '', password: '' });
        }
    } catch (error) {
        console.error('Error creating manager:', error);
    }
};

export const handleCreatePromocode = async (newPromocode, promocodes, setPromocodes, setNewPromocode) => {
    try {
        const response = await axios.post('http://localhost:5000/api/promocode/create', newPromocode);
        if (response.status === 200) {
            setPromocodes([...promocodes, response.data]);
            setNewPromocode({ name: '', nominal: '' });
        }
    } catch (error) {
        console.error('Error creating promocode:', error);
    }
};

export const handleDeleteManager = async (id, managers, setManagers) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/manager/${id}`);
        if (response.status === 200) {
            setManagers(managers.filter(manager => manager.id !== id));
        }
    } catch (error) {
        console.error('Error deleting manager:', error);
    }
};

export const handleDeletePromocode = async (id, promocodes, setPromocodes) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/promocode/${id}`);
        if (response.status === 200) {
            setPromocodes(promocodes.filter(promocode => promocode.id !== id));
        }
    } catch (error) {
        console.error('Error deleting promocode:', error);
    }
};

export const fetchSalesReport = async (setReportContent) => {
    try {
        const response = await axios.get('http://localhost:5000/api/reports/sales');
        if (response.status === 200 && response.data.count > 0) {
            setReportContent(`Количество продаж: ${response.data.count}`);
        } else {
            setReportContent('Ничего не найдено');
        }
    } catch (error) {
        console.error('Ошибка при получении отчета по продажам:', error);
        setReportContent('Ничего не найдено');
    }
};

export const fetchUserReport = async (setReportContent) => {
    try {
        const response = await axios.get('http://localhost:5000/api/reports/users');
        if (response.status === 200 && response.data.count > 0) {
            setReportContent(`Количество пользователей: ${response.data.count}`);
        } else {
            setReportContent('Ничего не найдено');
        }
    } catch (error) {
        console.error('Ошибка при получении отчета по пользователям:', error);
        setReportContent('Ничего не найдено');
    }
};

export const fetchPromocodeReport = async (setReportContent) => {
    try {
        const response = await axios.get('http://localhost:5000/api/reports/promocodes');
        if (response.status === 200 && response.data.count > 0) {
            setReportContent(`Количество промокодов: ${response.data.count}`);
        } else {
            setReportContent('Ничего не найдено');
        }
    } catch (error) {
        console.error('Ошибка при получении отчета по промокодам:', error);
        setReportContent('Ничего не найдено');
    }
};
