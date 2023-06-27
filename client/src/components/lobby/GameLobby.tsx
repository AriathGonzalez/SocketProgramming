import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

import "./GameLobby.scss";

// TODO: Pass in the socket from /create to the lobby.
// Note: Should probably change to "Ready" when max number of players joined.

export default function GameLobby() {
  const location = useLocation();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `api/player/${location.state.gamePIN}`
        );
        console.log(response);
        //setPlayers(response)
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

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

/*
{
  users.map((user, index) => (
    <Fragment key={index}>
      {index % 2 === 0 && index !== 0 && <Row />}
      <Col>{user}</Col>
    </Fragment>
  ));
}*/
