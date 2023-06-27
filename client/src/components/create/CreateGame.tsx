import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import "./CreateGame.scss";

export default function CreateGame() {
  const navigate = useNavigate();
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [maxPlayerCount, setMaxPlayerCount] = useState<number>(0);
  const [validated, setValidated] = useState(false);
  const [socketInstance, setSocketInstance] = useState<any>(null);

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
      socketInstance.emit("createGame", { gradeLevel, maxPlayerCount });
    }
    setValidated(true);
  };

  useEffect(() => {
    const socket = io("localhost:5000/", {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocketInstance(socket);

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("gameCreated", (data: any) => {
      const { message, gamePIN } = data;
      console.log(message);
      navigate("/lobby", { state: { gamePIN: gamePIN } });
    });

    socket.on("gameCreationError", (data: any) => {
      const { error } = data;
      console.log(error);
    });

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.disconnect();
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
