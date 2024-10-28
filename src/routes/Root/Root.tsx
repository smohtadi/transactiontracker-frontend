import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const navItems: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const sliderItems: MenuProps["items"] = [
  { icon: UserOutlined, text: "Transactions", to: "transactions/" },
  { icon: LaptopOutlined, text: "Report", to: "/report" },
].map((ele, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(ele.icon),
    label: <Link to={`${ele.to}`}>{ele.text}</Link>,
  };
});

export default function Home() {
  return (
    <>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="logo">Transaction Tracker</div>
          <Menu
            mode="horizontal"
            items={navItems}
            style={{ flex: 1, minWidth: 0 }}
          ></Menu>
        </Header>
        <Layout>
          <Sider width="15rem">
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              items={sliderItems}
            />
          </Sider>
          <Layout>
            <Content
              style={{
                padding: "1rem",
                margin: 0,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
