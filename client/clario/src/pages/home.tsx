import React, { useCallback, useEffect, useState } from "react";
import LargeTextInput from "../components/largeTextInput/LargeTextInput";
import debounce from "lodash.debounce";
import TranslationService from "../api/translation/TranslationService";
import Select from "../components/select/Select";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [srcLang, setSrcLang] = useState("en");
  const [dscLang, setDscLang] = useState("de");

  const languages = [
    { value: "en", label: "English" },
    { value: "sk", label: "Slovak" },
    { value: "cs", label: "Czech" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  const translate = async (value: string, src: string, dst: string) => {
    if (!value.trim() || !src || !dst) return;
    try {
      const res = await TranslationService.sendText(value, src, dst);
      setTranslatedText(res.translated_text || "");
    } catch (err) {
      console.log(err);
      setTranslatedText("");
    }
  };

  useEffect(() => {
    if (!text.trim() || !srcLang || !dscLang) return;
    const handler = setTimeout(() => {
      translate(text, srcLang, dscLang);
    }, 700);

    return () => clearTimeout(handler);
  }, [text, srcLang, dscLang]);

  const handleChange = (value: string) => {
    setText(value);
  };
  const handleSrcLang = (value: string) => {
    setSrcLang(value);
  };
  const handleDescLang = (value: string) => {
    setDscLang(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex", // make children in a row
          gap: "60px", // space between them
          padding: "2rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "1rem",
          }}
        >
          <Select
            label="Source Language"
            value={srcLang}
            onChange={handleSrcLang}
            options={languages}
          />
          <LargeTextInput
            value={text}
            placeholder="Type or paste your text here..."
            onChange={handleChange}
          />
        </div>
        {/* Source column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "1rem",
          }}
        >
          <Select
            label="Destination Language"
            value={dscLang}
            onChange={handleDescLang}
            options={languages}
          />
          <LargeTextInput
            placeholder="Translation"
            value={translatedText}
            disabled
          />
        </div>
      </div>
      <div>
        <LargeTextInput></LargeTextInput>
      </div>
    </>
  );
};

export default Home;
