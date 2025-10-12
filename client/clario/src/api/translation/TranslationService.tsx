
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"

interface TextResponse {
    message?: string;
}

class TranslatonService {

    async sendText(text: string): Promise<TextResponse> {
        const response = await axios.post(`${API_URL}/text/send`, text);
        console.log("response", response)
        return response.data // parsed JSON response
    }
}

export default new TranslatonService();