import api from "../utils/api";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Dashboard() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await API.get("/polls");
        setPolls(res.data);
      } catch (err) {
        alert("Unauthorized. Please login.");
      }
    };

    fetchPolls();
  }, []);

  return (
    <div>
      <h2>All Polls</h2>
      {polls.map((poll) => (
        <div key={poll._id}>
          <Link to={`/poll/${poll._id}`}>{poll.title}</Link>
        </div>
      ))}
    </div>
  );
}
