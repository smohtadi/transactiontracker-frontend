import classNames from "classnames";
import { Anchor, Card, Text, UList } from "../../components";
import { useAuth } from "../../hooks/useAuth";

interface IProps {
  className?: string;
}

export default function Sidebar({ className }: IProps) {
  const { user } = useAuth();
  return (
    <Card as="article" className={classNames("sidebar", className)}>
      <Card.Header className="sidebar-user-info">
        <i>Welcome!</i>
        <Text.P className="sidebar-username">{user?.username || "User"}</Text.P>
      </Card.Header>
      <Card.Body>
        <nav aria-label="Site links">
          <UList className="sidebar-items">
            <UList.Item className="sidebar-item">
              {/* <Anchor className="sidebar-link" href="/profile">
                Profile
              </Anchor> */}
            </UList.Item>
          </UList>
        </nav>
      </Card.Body>
    </Card>
  );
}
