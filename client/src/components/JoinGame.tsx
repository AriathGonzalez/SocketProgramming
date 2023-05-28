import { useState, useEffect } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";

import "./JoinGame.scss";

export default function JoinGame() {
  const [validated, setValidated] = useState(false);
  const [isErrorAlert, setisErrorAlert] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    setisErrorAlert(true);
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control
                  className={`mb-3 ${isErrorAlert ? `form-error` : ``}`}
                  type="text"
                  placeholder="Game PIN"
                  required
                />
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
