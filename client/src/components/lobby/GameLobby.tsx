import { BsFillExclamationCircleFill } from "react-icons/bs";

import { Container, Row, Col, Stack } from "react-bootstrap";

import "./GameLobby.scss";

export default function GameLobby() {
  return (
    <Container>
      <Row className="row1">
        <h1>
          Join at localhost:5000/join with Game PIN:
          <span className="test"> 1234567</span>
        </h1>
      </Row>
      <Row className="row2">
        {" "}
        <Col sm={4}>Col 1</Col>
        <Col sm={4}>Col 2</Col>
        <Col sm={4}>Col 3</Col>
      </Row>
      <Row className="row3">
        <Stack direction="horizontal" gap={3}>
          <BsFillExclamationCircleFill />
          <p>Waiting for players...</p>
        </Stack>
      </Row>
    </Container>
  );
}
