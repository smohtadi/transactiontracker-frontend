import { MouseEvent } from "react";
import { siteRoutes } from "../../routes/router";
import { Anchor, Button, Container, Text, UList } from "../../components";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const handleClickLogout = (e: MouseEvent) => {
    e.preventDefault();
    logout();
  };
  return (
    <header className="navbar">
      <Container className="navbar-contents">
        <div className="navbar-brand">
          <Text.H1 style={{font: "inherit"}}>
            <Anchor className="navbar-link navbar-brand-name" href={siteRoutes.home.path}>
              Transaction Tracker
            </Anchor>
          </Text.H1>
        </div>
        <nav className="navbar-navigation" aria-label="Main navigation">
          <UList>
            <UList.Item className="navbar-item">
              <Anchor
                href={siteRoutes.transactions.path}
                className="navbar-link"
              >
                Transactions
              </Anchor>
            </UList.Item>
          </UList>
        </nav>
        <div className="navbar-controls">
          <Button variant="primary" onClick={handleClickLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </header>
  );
}
