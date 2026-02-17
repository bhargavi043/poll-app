import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      const res = await API.get(`/polls/${id}`);
      setPoll(res.data);
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (option) => {
    try {
      const res = await API.post(`/polls/${id}/vote`, { option });
      setPoll(res.data);
      setVoted(true);
    } catch (err) {
      alert("You already voted");
      setVoted(true);
    }
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h2>{poll.title}</h2>

      {!voted ? (
        poll.options.map((opt) => (
          <button
            key={opt._id}
            onClick={() => handleVote(opt.text)}
          >
            {opt.text}
          </button>
        ))
      ) : (
        poll.options.map((opt) => (
          <p key={opt._id}>
            {opt.text} — {opt.votes} votes
          </p>
        ))
      )}
    </div>
  );
}
