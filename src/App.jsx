import { useState } from "react";
import styled from "styled-components";
import "./App.css";

import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search something crazy!");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <Container>
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>Generate an Image using Open AI API</h2>

          <textarea
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <Button onClick={generateImage}>Generate an Image</Button>
          {result.length > 0 ? <Image src={result} alt="result" /> : <></>}
        </>
      )}
    </Container>
  );
}

// styles
const Container = styled.div`
  padding: 4em;
  display: flex;
  flex-direction: column;
  /* background-color: #e5efd3; */
`;

const Button = styled.div`
  padding: 1em;
  background-color: black;
  color: white;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default App;
