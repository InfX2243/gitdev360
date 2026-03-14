import React, { useEffect, useState } from "react";
import { getRateLimit } from "../../services/githubAPI";

const RateLimitBadge = () => {
  const [rate, setRate] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [bounce, setBounce] = useState(false);

  const fetchRateLimit = async () => {
    try {
      const res = await getRateLimit();
      setRate(res.data.rate);
      updateTimeLeft(res.data.rate.reset);
    } catch (err) {
      console.error("Failed to fetch rate limit", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRateLimit();
  }, []);

  // Revalidate rate limit periodically (handles multi-tab usage)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRateLimit();
    }, 3000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (!rate) return;

    const interval = setInterval(() => {
      updateTimeLeft(rate.reset);

      setBounce(true);
      setTimeout(() => setBounce(false), 400);
    }, 1000);

    return () => clearInterval(interval);
  }, [rate]);

  // Calculate countdown
  const updateTimeLeft = (resetTimestamp) => {
    const now = Date.now();
    const resetTime = resetTimestamp * 1000;
    const diff = resetTime - now;

    if (diff <= 0) {
      setTimeLeft("00:00:00");
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
  };

  if (!rate) return null;

  const resetDate = new Date(rate.reset * 1000).toLocaleDateString();
  const resetTime = new Date(rate.reset * 1000).toLocaleTimeString();

  return (
    <div className="rate-limit-badge" style={{ marginTop: "20px" }}>
      <strong className={bounce ? "bounce" : ""}>
        {rate.remaining}
      </strong>{" "}
      / {rate.limit} requests remaining
      <div className="rate-reset">
        Resets in {timeLeft}
        <br />
        {resetDate} at {resetTime}
      </div>
    </div>
  );
};

export default RateLimitBadge;
