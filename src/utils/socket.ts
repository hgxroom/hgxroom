import proxy from '../config/proxy';

const env = import.meta.env.MODE || 'development';
const { socket } = proxy[env];

export { socket };
