import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

import "./GameLobby.scss";
import socket from "../socket";

// Note: Should probably change to "Ready" when max number of players joined.

export default function GameLobby() {
  const location = useLocation();
  const gamePIN = location.state?.gamePIN;
  const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);

  const handleGameJoined = (data: any) => {
    setPlayers(data.players);
    setPlayerCount(data.playerCount);
  };

  useEffect(() => {
    socket.on("gameJoined", handleGameJoined);

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    return () => {
      socket.off("gameJoined", handleGameJoined);
      socket.off("disconnect");
    };
  }, []);

  return (
    <Container>
      <Row className="lobby-header">
        <Col>
          <div className="wrapper">
            <h1>
              Join at localhost:3000/ with Game PIN:
              <span className="bolded"> {gamePIN}</span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row className="lobby-body">
        <Row className="bolded">
          <Col>{playerCount} Players</Col>
          <Col>MathWhizz</Col>
          <Col>
            <Button className="enter-btn bolded" type="submit">
              Start
            </Button>
          </Col>
        </Row>
        {players.map((player: any, index: number) => (
          <Fragment key={player.id}>
            {index % 2 === 0 && index !== 0 && <Row />}
            <Col>{player.username}</Col>
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
