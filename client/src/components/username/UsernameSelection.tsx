import { useState, useEffect } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "./UsernameSelection.scss";

export default function UsernameSelection() {
  const [validated, setValidated] = useState(false);
  const [isErrorAlert, setisErrorAlert] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      setValidated(true);
      setisErrorAlert(true);
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control
                  className={`mb-3 ${isErrorAlert ? `form-error` : ``}`}
                  type="text"
                  placeholder="Username"
                  maxLength={15}
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
    </div>
  );
}
