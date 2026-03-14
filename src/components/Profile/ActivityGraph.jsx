import React from "react";

const ActivityGraph = ({ activity }) => {
  if (!activity || activity.length === 0) {
    return (
      <div className="activity-graph">
        <h3>Activity Summary</h3>
        <p className="empty-state">No recent public activity</p>
      </div>
    );
  }

  const pushEvents = activity.filter(
    (event) => event.type === "PushEvent"
  );

  const commitCount = pushEvents.reduce(
    (sum, event) => sum + (event.payload?.commits?.length || 0),
    0
    );

  const activeDays = new Set(
    activity.map((event) =>
      new Date(event.created_at).toDateString()
    )
  ).size;

  const lastActiveDate = new Date(activity[0].created_at);
  const daysAgo = Math.floor(
    (Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Simple activity level heuristic
  let activityLevel = "Low Activity";
  if (commitCount > 30) activityLevel = "Very Active";
  else if (commitCount > 10) activityLevel = "Active";

  return (
    <div className="activity-graph">
      <h3>Activity Summary</h3>

      <div className={`activity-badge ${activityLevel.toLowerCase().replace(" ", "-")}`}>
        {activityLevel}
      </div>

      <div className="activity-stats">
        <div>
          <strong>{commitCount}</strong>
          <span>Commits (recent)</span>
        </div>
        <div>
          <strong>{activeDays}</strong>
          <span>Active Days</span>
        </div>
        <div>
          <strong>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</strong>
          <span>Last Active</span>
        </div>
      </div>

      <p className="activity-note">
        Based on publicly visible GitHub activity
      </p>

    </div>
  );
};

export default ActivityGraph;
