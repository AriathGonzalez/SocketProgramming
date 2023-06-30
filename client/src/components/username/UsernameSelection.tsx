import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "./UsernameSelection.scss";
import socket from "../socket";

export default function UsernameSelection() {
  const location = useLocation();
  const [validated, setValidated] = useState(false);
  const [isErrorAlert, setisErrorAlert] = useState(false);
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setisErrorAlert(true);
    } else {
      console.log("In Username Selection: Before socket emit...");
      socket.emit("joinGame", {
        username: username,
        gamePIN: location.state.gamePIN,
      });
    }
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    socket.on("gameJoinError", (data) => {
      // Perform any error handling or display error messages
    });

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("gameJoinError");
      socket.off("disconnect");
    };
  }, []);

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
