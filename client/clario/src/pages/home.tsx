
import React, {useCallback, useState} from "react";
import LargeTextInput from "../components/largeTextInput/LargeTextInput";
import debounce from "lodash.debounce";
import TranslationService from "../api/translation/TranslationService";


const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const sendTextDebounced = useCallback(
    debounce(async (value:string) => {
      if(!value.trim()) return;
      try {
        const res = await TranslationService.sendText(value);
        setTranslatedText(res.translated_text || "");
      } catch (err) {
        console.log(err);
        setTranslatedText("");
      }
    }, 1000), []
  )
  const handleChange = (value:string) => {
    setText(value);
    sendTextDebounced(value);
  }

  return (
    <>
      <div
        style={{
          display: "flex",          // make children in a row
          gap: "60px",              // space between them
          padding: "2rem",
        }}
      >
        <LargeTextInput
          value={text}
          placeholder="Type or paste your text here..."
          onChange={handleChange}
        ></LargeTextInput>
        <LargeTextInput
          placeholder="Translation"
          value={translatedText}
          disabled
          >
        </LargeTextInput>
      </div>
      <div>
        <LargeTextInput
          >
        </LargeTextInput>
      </div>

    </>
  );
};

export default Home;

