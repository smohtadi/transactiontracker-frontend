import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Container, Form, Text } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { siteRoutes } from "../router";
import { getErrorMessage } from "../../utils/langUtils";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username?.value;
    const password = (e.target as HTMLFormElement).password?.value;
    login(username, password)
      .then(() => {
        setError("");
        navigate(siteRoutes.home.path);
      })
      .catch((err) => setError(getErrorMessage(err)));
  };
  return (
    <div className="login-page">
      <Container as="header">
        <Card>
          <Card.Header>
            <Text.H1>Transaction Tracker</Text.H1>
            {error.length > 0 && <Alert>{error}</Alert>}
          </Card.Header>
        </Card>
      </Container>
      <Container as="main">
        <Card>
          <Card.Header>
            <Text.H1>Login</Text.H1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group controlId="login-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoComplete="username"
                  name="username"
                  id="username"
                  type="email"
                />
              </Form.Group>
              <Form.Group controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete="current-password"
                  id="current-password"
                  name="password"
                  type="password"
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-4">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
