import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} /><br/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <button>Register</button>
    </form>
  );
}

export default Register;
