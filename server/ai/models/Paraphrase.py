import asyncio
import time
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from utils.device import DEVICE


class Paraphrase:
    def __init__(self, device: torch.device = DEVICE):
        self.device = device
        self.model_name = 'tuner007/pegasus_paraphrase'
        self.model = PegasusForConditionalGeneration.from_pretrained(self.model_name)
        self.tokenizer = PegasusTokenizer.from_pretrained(self.model_name)
        self.model.to(self.device) # type: ignore
        self.model.eval()
        print(f"[Paraphrase.__init__] Using device: {self.device}", flush=True)
        
    def _paraphrase(self, input_text, num_return_sequences=10, num_beams=10, max_length=60):
        batch = self.tokenizer([input_text],truncation=True,padding='longest',max_length=max_length, return_tensors="pt").to(self.device)
        translated = self.model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences)
        tgt_text = self.tokenizer.batch_decode(translated, skip_special_tokens=True)
        return tgt_text
    
    async def get_paraphrase(self, input_text:str, sequences=10):
        print(f"[Paraphrase] | device={self.device} |", flush=True)
        start = time.perf_counter()
        result = await asyncio.to_thread(self._paraphrase, input_text, sequences)
        ms = (time.perf_counter() - start) * 1000
        print(f"[Paraphrase] done in {ms:.1f} ms | in  {input_text} -> out='{result}'", flush=True)
        return {
            "input_text": input_text,
            "output_texts": result,
            "number_of_sequencies": sequences
        }
        
