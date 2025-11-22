import asyncio
import time
import torch
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from utils.device import DEVICE # type: ignore

class Translation:
    def __init__(self, device: torch.device = DEVICE):
        self.device = device
        self.model = M2M100ForConditionalGeneration.from_pretrained("facebook/m2m100_418M")
        self.tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")
        self.model.to(self.device) # type: ignore
        self.model.eval()
        print(f"[Translation.__init__] Using device: {self.device}", flush=True)
        

    def _translate_sync(self, src_lang: str, src_text: str, destination_lang:str) -> dict:
        tokenizer = self.tokenizer
        device = self.device
        model = self.model
        tokenizer.src_lang = src_lang
        enc = tokenizer(src_text, return_tensors="pt")
        enc = {k: v.to(device) for k, v in enc.items()}
        
        with torch.inference_mode():
            generated = model.generate(
            **enc,
            forced_bos_token_id=tokenizer.get_lang_id(destination_lang),
            )

        translated = tokenizer.batch_decode(generated, skip_special_tokens=True)[0]

        return translated

    async def translate_language(self, src_lang: str, src_text: str, destination_lang: str) -> dict:
        print(f"[translate_sync] {src_lang} -> {destination_lang} | device={self.device} | len(src)={len(src_text)}", flush=True)
        start = time.perf_counter()
        # Run the heavy translation work in a separate thread
        translated_text = await asyncio.to_thread(
            self._translate_sync, src_lang, src_text, destination_lang
        )
        ms = (time.perf_counter() - start) * 1000
        print(f"[translate_sync] done in {ms:.1f} ms | in  {src_text} -> out[:60]='{translated_text[:60]}'", flush=True)
        return {
            "source_text": src_text,
            "source_lang": src_lang,
            "translated_text": translated_text,
            "target_lang": destination_lang,
        }
        