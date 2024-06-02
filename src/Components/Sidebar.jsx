import { BsChatText } from "react-icons/bs";
const Sidebar = () => {
  // Function to handle the drag start event and set the drag data
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <aside>
        {/* Draggable node */}
        <div
          className="appnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <BsChatText style={{ fontSize: "15px", margin: "5px" }} />
          Message
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
