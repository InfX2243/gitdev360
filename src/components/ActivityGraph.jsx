import React from "react";

const ActivityGraph = ({ activity }) => {
    return (
        <div className="activity-graph">
            <h3>Recent Activity</h3>
            <p>{activity.length} events fetched</p>
            {/* Later: replace with a graph visualization */}
        </div>
    );
};

export default ActivityGraph;