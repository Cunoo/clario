
import axios from 'axios';
import type {UserCreate, UserResponse} from "./types/User";

const API_URL = "http://127.0.0.1:8000"
class UserService {

    async registerUser(data: UserCreate): Promise<UserResponse> {
        const response = await axios.post<UserResponse>(`${API_URL}/users/register`, data);
        console.log("response", response)
        return response.data // parsed JSON response
    }
}

export default new UserService();