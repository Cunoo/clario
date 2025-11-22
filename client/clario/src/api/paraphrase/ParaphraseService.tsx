
import axios from 'axios';
import {API_BACKEND_URL} from "../../../api_list";

const API_URL = API_BACKEND_URL;

interface ParaphraseRequest {
    input_text: string;
    number_of_sequencies: number;
    lang: string;
}

interface ParaphraseResponse {
    input_text: string;
    output_texts: string[];
    number_of_sequencies: number;
}

class TranslationService {
    async sendTextToParaphrase(text: string, srcLang: string, number_of_sequencies: number): Promise<ParaphraseResponse> {
        try {
            const payload: ParaphraseRequest = {
                input_text: text,
                lang: srcLang,
                number_of_sequencies: number_of_sequencies,

            };
            const response = await axios.post(`${API_URL}/paraphraseText`, payload);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error("Translation error", error);
            throw error;
        }
    }
}

export default new TranslationService();