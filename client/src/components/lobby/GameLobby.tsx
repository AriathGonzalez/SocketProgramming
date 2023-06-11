import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { Fragment } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

import "./GameLobby.scss";

// Note: Should probably change to "Ready" when max number of players joined.
// Note: Add an id attribute to users.

const users = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
];

export default function GameLobby() {
  const location = useLocation();

  return (
    <Container>
      <Row className="lobby-header">
        <Col>
          <div className="wrapper">
            <h1>
              Join at localhost:3000/ with Game PIN:
              <span className="bolded"> {location.state.gamePIN}</span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row className="lobby-body">
        <Row className="bolded">
          <Col>8 Players</Col>
          <Col>MathWhizz</Col>
          <Col>
            <Button className="enter-btn bolded" type="submit">
              Start
            </Button>
          </Col>
        </Row>
        {users.map((user, index) => (
          <Fragment key={index}>
            {index % 2 === 0 && index !== 0 && <Row />}
            <Col>{user}</Col>
          </Fragment>
        ))}
      </Row>
      <Row className="lobby-footer">
        <Stack direction="horizontal" gap={3}>
          <BsFillExclamationCircleFill />
          <p>Waiting for players...</p>
        </Stack>
      </Row>
    </Container>
  );
}
