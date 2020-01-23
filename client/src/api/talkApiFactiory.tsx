import axios, { Method } from 'axios'
import { RoomState } from '../components/Organisms/Header/TalkHeader';
import { RoomParam } from '../actions/talk/talkActions';

interface optionConfig {
    [k : string] : string | object | undefined
}

interface apiOption {
    method: Method,
    url?: string, 
    data?: RoomState | RoomParam
}

const DEFAULT_API_CONFIG = {
    baseURL: 'http://localhost:3001/talk',
    timeout: 7000,
};

export const talkApiFactory = (optionConfig? : optionConfig) => {
    const token = localStorage.getItem("ticket")
    const config = {
        ...DEFAULT_API_CONFIG,
        ...optionConfig,
        headers: {Authorization: token}
    }

    const instance = axios.create(config);

    const talkApiConnector = async (apiOption: apiOption) => {
        try {
            const response = await instance({
                ...apiOption
            });

            if(response.status !== 200) {
                throw new Error(`Server Error`);
            }
            return response;
        }catch(err) {
            throw err;
        }
    };
    return talkApiConnector
}