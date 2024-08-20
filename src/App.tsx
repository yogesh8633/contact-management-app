import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import EditContact from "./components/contacts/EditContact";
import ChartsAndMaps from "./pages/ChartsAndMaps";
import Contacts from "./pages/Contacts";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="flex items-center bg-gray-900 px-4">
        <div className="text-white font-bold text-lg">Contact Management App</div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <Layout className="p-6 ml-0 md:ml-[200px]">
          <Content className="p-6 bg-white rounded-lg shadow-md min-h-[280px]">
            <Routes>
              <Route path="/" element={<ChartsAndMaps/>} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/edit-contact/:id" element={<EditContact />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
