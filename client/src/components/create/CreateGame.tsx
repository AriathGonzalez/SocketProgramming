import axios from "axios";

import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import "./CreateGame.scss";

export default function CreateGame() {
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [validated, setValidated] = useState(false);

  const handleGradeLevelChange = (e: any) => {
    setGradeLevel(e.target.value);
  };

  const handlePlayerCountChange = (e: any) => {
    setPlayerCount(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      let gamePIN = generatePIN(1000000, 9999999);

      const data = {
        gradeLevel: gradeLevel,
        playerCount: playerCount,
        gamePIN: gamePIN,
      };

      try {
        const res = await axios.post("api/game", data);
        console.log(res);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    setValidated(true);
  };

  const generatePIN = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
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
