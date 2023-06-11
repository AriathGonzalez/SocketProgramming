import axios from "axios";
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "./UsernameSelection.scss";

export default function UsernameSelection() {
  const location = useLocation();
  const [validated, setValidated] = useState(false);
  const [isErrorAlert, setisErrorAlert] = useState(false);
  const [username, setUsername] = useState<string>("");

  // TODO: Then, in lobby have these users join the lobby. Start with the sockets.

  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();

      setValidated(true);
      setisErrorAlert(true);
    } else {
      postPlayer();
    }
  };

  const postPlayer = async () => {
    const data = {
      username: username,
      gamePIN: location.state.gamePIN,
    };

    try {
      const res = await axios.post("api/player", data);
      console.log(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    let timer: any;
    if (isErrorAlert) {
      timer = setTimeout(() => {
        setisErrorAlert(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isErrorAlert]);

  return (
    <div className="parent">
      <h1>MathWhizz</h1>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="container-wrapper">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control
                  className={`mb-3 ${isErrorAlert ? `form-error` : ``}`}
                  type="text"
                  placeholder="Username"
                  maxLength={15}
                  onChange={handleUsernameChange}
                  required
                />
                <Button className="enter-btn" type="submit">
                  Enter
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
