import { useEffect, useState } from "react";

const Sidebar = () => {
  // State to control the visibility of the usage message
  const [showUsage, setShowUsage] = useState(true);

  // useEffect to hide the usage message after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setShowUsage(false);
    }, 5000);
  }, [showUsage]);

  // Determine the display style based on showUsage state
  const displayUsage = showUsage ? "" : "none";

  // Function to handle the drag start event and set the drag data
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      {/* Usage instruction message, hidden after 5 seconds */}
      <div className="description" style={{ display: displayUsage }}>
        Drag below node to the pane on the left to add new nodes.
      </div>
      <aside>
        {/* Draggable node */}
        <div
          className="appnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <span
            className="material-symbols-outlined"
            style={{ paddingBottom: 5 }}
          >
            maps_ugc
          </span>
          Message
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
