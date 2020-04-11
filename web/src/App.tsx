import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from "@material-ui/core"
import styled from 'styled-components';
import axios from "axios";

const SiteDiv = styled.div`
  display: flex;
  flex-direction: 'column',
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: grey;
  `

const FormContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 70%;
  padding: 50px;
`
const Title = styled(Typography)`
  width: 100%;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const APIRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  flex: 1;
  width: 100%;
`

const APIButton = styled(Button)`
  margin-left: 50px !important;
`

const APIURLTextField = styled(TextField)`
  flex: 1;
`

const ResponseDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  flex: 1;
  width: 100%;
`

function App() {
  const [apiURL, setAPIURL] = useState("");
  const [response, setResponse] = useState<any>({ message: "", type: "success" });
  const handleAPI = async (method: "post" | "get") => {
    setResponse({ type: "success", message: "" })
    try {
      const res = await axios({
        url: apiURL,
        method,
        withCredentials: true
      });
      setResponse({
        type: "success",
        message: JSON.stringify(res.data)
      })
    }
    catch (e) {
      const message = e.toString().includes("Network Error") ? "Blocked by CORS" : e.toString()
      setResponse({ type: "failure", message })
    }
  }
  return (
    <SiteDiv>
      <FormContainer>
        <Title variant="h3">CORS Test</Title>
        <Title variant="h5">Enter an API below and see if it returns a CORS error.</Title>
        <Form>
          <APIRow>
            <APIURLTextField
              variant="outlined"
              value={apiURL}
              onChange={({ target: { value } }: any) => setAPIURL(value)}
              placeholder="API URL"
            />
            <APIButton
              variant="contained"
              onClick={() => handleAPI("get")}
              color="primary">
              Fire GET API
              </APIButton>
            <APIButton
              variant="contained"
              onClick={() => handleAPI("post")}
              color="secondary">
              Fire Post API
              </APIButton>
          </APIRow>
          <ResponseDiv style={{ color: response.type === "success" ? "green" : "red" }}>{response.message}</ResponseDiv>
        </Form>
      </FormContainer>
    </SiteDiv>
  );
}

export default App;
