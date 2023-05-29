import { Button, Container, Form, Row, Col } from "react-bootstrap";

import "./CreateGame.scss";

export default function CreateGame() {
  const handleSubmit = () => {};
  return (
    <div className="parent">
      <h1>MathWhizz</h1>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="container-wrapper">
              <Form onSubmit={handleSubmit}>
                <Form.Select className="mb-3" aria-label="Grade level select">
                  <option>Grade Level</option>
                  <option value="1">1</option>
                </Form.Select>
                <Form.Select className="mb-3" aria-label="Player count select">
                  <option>Player Count</option>
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
