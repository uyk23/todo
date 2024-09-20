import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryPages from "./pages/CategoryPages";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/today"
          element={
            <Layout>
              <CategoryPages page="today" />
            </Layout>
          }
        />
        <Route
          path="/tomorrow"
          element={
            <Layout>
              <CategoryPages page="tomorrow" />
            </Layout>
          }
        />
        <Route
          path="/this-week"
          element={
            <Layout>
              <CategoryPages page="this week" />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
