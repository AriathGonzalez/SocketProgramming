import axios from "axios";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

import "./JoinGame.scss";

export default function JoinGame() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorAlert, setisErrorAlert] = useState(false);
  const [gamePIN, setGamePIN] = useState<number>(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const status = await getGameByPIN(gamePIN);
    if (status === 200) {
      setIsError(false);
      navigate("/username", { state: { gamePIN: gamePIN } });
    } else {
      setIsError(true);
      setisErrorAlert(true);
    }
  };

  const handleGamePinChange = (e: any) => {
    setGamePIN(e.target.value);
  };

  const getGameByPIN = async (gamePIN: number) => {
    try {
      const { status: status } = await axios.get(`api/game/${gamePIN}`);
      return status;
    } catch (error: any) {
      console.error(error.message);
    }
  };

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
              <Form onSubmit={handleSubmit}>
                <InputGroup
                  className={`mb-3 ${
                    isErrorAlert ? `form-error-animation` : ``
                  }`}
                >
                  <Form.Control
                    className={isError ? "form-error" : ""}
                    type="text"
                    placeholder="Game PIN"
                    onChange={handleGamePinChange}
                  />
                  {isError && (
                    <InputGroup.Text className="icon-error">
                      <BsFillExclamationCircleFill />
                    </InputGroup.Text>
                  )}
                </InputGroup>
                <Button className="enter-btn" type="submit">
                  Enter
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {isErrorAlert && (
        <Alert className="error-alert" variant="danger">
          We didn't recognize that game PIN. Please check and try again.
        </Alert>
      )}
    </div>
  );
}
