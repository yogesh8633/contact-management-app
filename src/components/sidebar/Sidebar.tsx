import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  // State to manage the collapsed state of the sidebar
  const [collapsed, setCollapsed] = useState(false);

  // Define the menu items for the sidebar
  const menuItems = [
    {
      key: "1",
      label: <Link to="/">Charts and Maps</Link>, // Link to the Contacts page
    },
    {
      key: "2",
      label: <Link to="/contacts">Contacts</Link>, // Link to the Dashboard page
    },
  ];

  return (
    <Sider
      width={200} // Set the width of the sidebar
      collapsible // Allow the sidebar to be collapsible
      collapsed={collapsed} // Bind the collapsed state to the component state
      breakpoint="md" // Collapse the sidebar at the 'md' breakpoint (768px)
      collapsedWidth={0} // Set the collapsed width to 0 for a hidden sidebar
      onCollapse={(collapsed) => setCollapsed(collapsed)} // Update state on collapse
      className={`bg-gray-100 z-50 md:relative transition-transform duration-300 ease-in-out fixed ${
        collapsed ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {/* Menu with inline mode and responsive height */}
      <Menu
        mode="inline" // Display the menu items inline
        defaultSelectedKeys={["1"]} // Default selected menu item
        items={menuItems} // Menu items
        className="h-full" // Full height to occupy the sidebar
      />
    </Sider>
  );
};

export default Sidebar;
