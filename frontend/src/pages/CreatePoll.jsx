import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreatePoll() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async () => {
  try {
    const res = await API.post("/polls", { title, description, options });
    alert("Poll created");
  } catch (err) {
    console.log(err); // 401 or 404 if auth or endpoint is wrong
  }
};


  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {options.map((opt, i) => (
          <div key={i}>
            <label>Option {i + 1}:</label>
            <input type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePoll;
