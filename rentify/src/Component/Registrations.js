import { Paper, TextField } from "@mui/material";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function Registers() {
  return (
    <>
      <Container className="mt-5">
        <Row noGutters={true}>
          <Col lg={3}></Col>
          <Col lg={6} className="registration-col">
            <Paper elevation={6} className="p-3">
              <Row className="">
                <Col lg={6}>
                  <div>
                    <h3 className="ms-3 text-success">Register</h3>
                    <Form className="p-2 m-1">
                      <TextField
                        className="p-2"
                        fullWidth
                        id="outlined-error"
                        label="What's your name?"
                        type="text"
                      />
                      <TextField
                        className="p-2"
                        fullWidth
                        id="outlined-error"
                        label="Email"
                        type="email"
                      />
                      <TextField
                        className="p-2"
                        fullWidth
                        id="outlined-error"
                        label="Password"
                        type="password"
                      />
                      <TextField
                        className="p-2"
                        fullWidth
                        id="outlined-error"
                        label="Number"
                        type="number"
                      />
                      <Button type="submit" className="ms-2 bg-success">Register</Button>
                    </Form>
                  </div>
                </Col>
                <Col lg={6} className="information-col" style={{ background: `linear-gradient(180deg, #3498db 0, #16a085 100%)` }}>
                  <div className="information-content">
                    <h1 className="ms-2 text-white" style={{ width: "100%" }}>
                      Rentify
                    </h1>
                    <div className="p-3">
                      <h4 style={{ color: "white" }}>Create an account to unlock these benefits</h4>
                      <p style={{ color: "white" }}>Get latest updates about Properties and Projects.</p>
                      <p style={{ color: "white" }}>Get latest updates about Properties and Projects.</p>
                      <p style={{ color: "white" }}>Get latest updates about Properties and Projects.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    </>
  );
}
