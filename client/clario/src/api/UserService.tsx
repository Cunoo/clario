
import axios from 'axios';

type userServiceData = {
    username: string;
    password: string;
    //email?: string;
}

class UserService {

    async registerUser(data: userServiceData) {
        const response = await axios.post("/api/register", data);
        return response.data // parsed JSON response
    }
}

export default new UserService;