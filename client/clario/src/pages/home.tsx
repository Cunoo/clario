
import React from "react";
import LargeTextInput from "../components/largeTextInput/LargeTextInput"

const Home: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",          // make children in a row
          gap: "60px",              // space between them
          padding: "2rem",
        }}
      >
        <LargeTextInput placeholder="Type or paste your text here..."></LargeTextInput>
        <LargeTextInput></LargeTextInput>
        </div>
        <LargeTextInput></LargeTextInput>
    </>
  );
};

export default Home;

