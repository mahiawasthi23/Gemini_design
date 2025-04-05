import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SearchRecent() {
  const { query } = useParams(); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!query || !userId) return;

    const formattedQuery = query.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");

    fetch(`http://localhost:4000/api/auth/history/${userId}/${formattedQuery}`)
      .then(res => res.json())
      .then(data => setResults(data || []))
      .catch(err => {
        console.error("Error:", err);
        setResults([]);
      });
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((item, index) => {
          const time = item.timestamp ? new Date(item.timestamp).toLocaleString() : "No time";
          return (
            <li key={index} className="chat-item">
              <p>{item.type}</p>
              <p><strong>You:</strong> {item.prompt}</p>
              <p><em>{time}</em></p>
              <p><strong>GPT:</strong> {item.response}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchRecent;
