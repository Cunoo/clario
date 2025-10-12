
import React, {useCallback, useState} from "react";
import LargeTextInput from "../components/largeTextInput/LargeTextInput";
import debounce from "lodash.debounce";
import TranslationService from "../api/translation/TranslationService";


const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const sendTextDebounced = useCallback(
    debounce(async (value:string) => {
      if(!value.trim()) return;
      try {
        const res = await TranslationService.sendText(value);
        setResponse(res.message || "");
      } catch (err) {
        console.log(err);
        setResponse("");
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
          placeholder="Type or paste your text here..."
          onChange={handleChange}
        ></LargeTextInput>
        <LargeTextInput></LargeTextInput>
        </div>
        <LargeTextInput></LargeTextInput>
    </>
  );
};

export default Home;

