import React, { useState } from "react";
import axios from "axios";

const CommentSection = ({ lectureId }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/comments",
        { lectureId, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
      {/* Display comments */}
    </div>
  );
};

export default CommentSection;
