import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/dashboardLayout.css';
import {Link, NavLink} from 'react-router-dom'

const DashboardLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
 
  const handleClick=()=>{
    setIsSidebarOpen(false)
  }

  return (
    <div className="dashboard-container">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      ></div>

      {/* Left Sidebar */}
      <aside className={`sidebar d-flex flex-column py-4 ${isSidebarOpen ? 'show' : ''}`}>
        <div className="px-4 mb-5 pb-2 d-flex align-items-center justify-content-between border-bottom border-secondary">
          <h5 className="m-0 fw-bold d-flex align-items-center gap-2 text-white ">
            <i className="bi bi-bar-chart-line-fill text-light fs-4"></i>
            Financial Data Explorer
          </h5>
          <button
            className="btn btn-close btn-close-white d-md-none"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>

        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link " onClick={handleClick}>
              <i className="bi bi-house"></i> Search Companies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" onClick={handleClick}>
              <i className="bi bi-layout-sidebar"></i> Company Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/compare" className="nav-link" onClick={handleClick}>
              <i className="bi bi-arrow-left-right"></i> Compare Companies
            </NavLink>
          </li>
        </ul>
        <div className="mt-auto px-4 pb-3 pt-4 border-top border-secondary">
          <div className="d-flex align-items-center gap-3 text-white">
            <div
              className="bg-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{ width: '40px', height: '40px' }}
            >
              MP
            </div>
            <div>
              <span className="d-block fw-semibold" style={{ fontSize: '0.9rem' }}>Mahima Patel</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header px-4 d-flex align-items-center sticky-top">
          <button
            className="btn btn-light d-md-none me-3 shadow-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-5"></i>
          </button>

        </header>

        <div className=" content-area  p-3 p-md-5 overflow-auto flex-grow-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;