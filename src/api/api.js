import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://your-backend-api-url', // 替换为后端 API 地址
    timeout: 10000
});

export const sendMessage = (message) => {
    return instance.post('/chat', { message });
};