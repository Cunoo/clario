import React, { useCallback, useEffect, useState } from "react";
import LargeTextInput from "../../components/largeTextInput/LargeTextInput";
import debounce from "lodash.debounce";
import TranslationService from "../../api/translation/TranslationService";
import Select from "../../components/select/Select";
import Button from "../../components/submitButton/SubmitButton";
import ParaphraseService from "../../api/paraphrase/ParaphraseService";
import {Rnd} from "react-rnd";

const TranslatorParaphraserPanel: React.FC = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [srcLang, setSrcLang] = useState("en");
  const [dscLang, setDscLang] = useState("de");
  const [paraphraseText, setParaphraseText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const languages = [
    { value: "en", label: "English" },
    { value: "sk", label: "Slovak" },
    { value: "cs", label: "Czech" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  const [panel, setPanel] = useState({
    width: 750,
    height: 650,
    x:100,
    y: 80,
  });

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
  const handleParaphrase = async (
    textInput: string,
    lang: string,
    number_of_sequencies: number
  ) => {
    if (!textInput.trim() || !lang || !number_of_sequencies) return;
    try {
      const res = await ParaphraseService.sendTextToParaphrase(
        textInput,
        lang,
        number_of_sequencies
      );
      setParaphraseText(res.output_texts.join("\n"));
    } catch (err) {
      console.log(err);
    }
  }
    return (
      <Rnd
        size={{ width: panel.width, height: panel.height }}
        position={{ x: panel.x, y: panel.y }}
        minWidth={500}
        minHeight={400}
        bounds="window"
        enableResizing={{
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        onDragStop={(e, d) => {
          const updated = { ...panel, x: d.x, y: d.y };
          setPanel(updated);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          const updated = {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            x: position.x,
            y: position.y,
          };
          setPanel(updated);
        }}
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 overflow-auto"
          
        >
          <div className="flex justify-between items-center mb-4 gap-4">
            <h3 className="text-3xl font-bold text-blue-600">
              📝 Translate & Paraphrase
            </h3>
            <div className="flex gap-3">
              <Select
                label=""
                value={srcLang}
                onChange={handleSrcLang}
                options={languages}
                className="w-full border rounded-lg p-2 text-gray-900"
              />
              <Select
                label=""
                value={dscLang}
                onChange={handleDescLang}
                options={languages}
                className="w-full border rounded-lg p-2 text-gray-900"
              />
            </div>
          </div>

          <LargeTextInput
            value={text}
            placeholder="Put the text here..."
            onChange={handleChange}
            className="h-48"
          />

          <div className="grid grid-cols-2 gap-6 mt-4">
            <LargeTextInput
              value={translatedText}
              placeholder="Translated text..."
              disabled
            />
            <LargeTextInput
              value={paraphraseText}
              placeholder="Paraphrase Text..."
              disabled
              className="w-full h-40 p-4 border rounded-lg bg-green-50 resize-none mt-2"
            />
          </div>

          <div className="mt-4 flex gap-3 items-end">
            <Button onClick={() => translate(text, srcLang, dscLang)}>
              Translate
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleParaphrase(text, srcLang, 3)}
            >
              Paraphrase
            </Button>
          </div>
        </div>
      </Rnd>
    );
  };


export default TranslatorParaphraserPanel;