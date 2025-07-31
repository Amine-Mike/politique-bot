import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Classification from "./Classification"; // Import your Classification page
import Generation from "./Generation";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Politique-bot</h1>

        {/* Navigation Links */}
        <nav className="nav-container">
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/classification">
                Classification
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/generation">
                Generation
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes to render different components */}
        <Routes>
          <Route path="/classification" element={<Classification />} />
          <Route path="/generation" element={<Generation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
