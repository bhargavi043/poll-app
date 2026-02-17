// Example in Dashboard.jsx or wherever you fetch polls
import axios from "axios";

const fetchPolls = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/polls"); // <-- include /polls
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
