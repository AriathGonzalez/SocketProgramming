import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import "./CreateGame.scss";
import socket from "../socket";

export default function CreateGame() {
  const navigate = useNavigate();
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [maxPlayerCount, setMaxPlayerCount] = useState<number>(0);
  const [validated, setValidated] = useState(false);

  const handleGradeLevelChange = (e: any) => {
    setGradeLevel(e.target.value);
  };

  const handleMaxPlayerCountChange = (e: any) => {
    setMaxPlayerCount(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("About to emit!");
      socket.emit("createGame", { gradeLevel, maxPlayerCount });
    }
    setValidated(true);
  };

  useEffect(() => {
    socket.on("gameCreated", (data: any) => {
      const { message, gamePIN } = data;
      console.log(message);
      navigate("/lobby", {
        state: { gamePIN: gamePIN },
      });
    });

    socket.on("gameCreationError", (data: any) => {
      const { error } = data;
      console.log(error);
    });

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("gameCreated");
      socket.off("gameCreationError");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="parent">
      <h1>MathWhizz</h1>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="container-wrapper">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Select
                  className="mb-3"
                  aria-label="Grade level select"
                  onChange={handleGradeLevelChange}
                  required
                >
                  <option value="">Grade Level</option>
                  <option value="1">1</option>
                </Form.Select>
                <Form.Select
                  className="mb-3"
                  aria-label="Player count select"
                  onChange={handleMaxPlayerCountChange}
                  required
                >
                  <option value="">Player Count</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </Form.Select>
                <Button className="enter-btn" type="submit">
                  Create
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
