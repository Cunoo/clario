
import axios from 'axios';
import {API_BACKEND_URL} from "../../../api_list";

const API_URL = API_BACKEND_URL;

interface TranslationRequest {
    src_lang: string;
    src_text: string;
    destination_lang: string;
}

interface TranslationResponse {
    source_text: string;
    source_lang: string;
    translated_text: string;
    target_lang: string
}

class TranslationService {
    async sendText(text: string, srcLang: string = "en", destLang: string = "de"): Promise<TranslationResponse> {
        try {
            const payload: TranslationRequest = {
                src_lang: srcLang,
                src_text: text,
                destination_lang: destLang,
            };
            const response = await axios.post(`${API_URL}/translateText`, payload);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error("Translation error", error);
            throw error;
        }
    }
}

export default new TranslationService();