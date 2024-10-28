import { Link } from "react-router-dom";
import "./sider.css";

export default function Sider() {
  return (
    <div className="sider">
      <nav aria-label="Site links">
        <ul className="sider-items">
          <li className="sider-item">
            <Link className="sider-link" to="/expenses">
              <i className="sider-link-icon"></i>
              <span className="sider-link-text">Expenses</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
