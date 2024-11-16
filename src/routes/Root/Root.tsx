import { Outlet } from "react-router-dom";
import { Container } from "../../components";
import { Navbar, Sidebar } from "../../partials";

export default function Root() {
  return (
    <>
      <Navbar />
      <Container className="site-body">
        <div className="site-sidebar">
          <Sidebar />
        </div>
        <main className="site-main">
          <Outlet />
        </main>
      </Container>
    </>
  );
}
