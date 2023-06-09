import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import "./CreateGame.scss";

export default function CreateGame() {
  const navigate = useNavigate();
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [validated, setValidated] = useState(false);

  const handleGradeLevelChange = (e: any) => {
    setGradeLevel(e.target.value);
  };

  const handlePlayerCountChange = (e: any) => {
    setPlayerCount(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      postGame();
      navigate("/lobby");
    }
    setValidated(true);
  };

  const postGame = async () => {
    const data = {
      gradeLevel: gradeLevel,
      playerCount: playerCount,
    };

    try {
      const res = await axios.post("api/game", data);
      console.log(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

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
                  onChange={handlePlayerCountChange}
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
