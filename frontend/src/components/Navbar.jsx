import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 10, background: "#eee" }}>
      {token && (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/create">Create Poll</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
