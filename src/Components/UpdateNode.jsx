import { useState, useEffect } from "react";
// import { useReactFlow } from 'reactflow';
import { GoArrowLeft } from "react-icons/go";

// Component to update the selected node
const UpdateNode = ({
  selectedNode,
  setNodeSelected,
  setNodes,
  setNewNodeLabel,
}) => {
  // State to manage the node's name
  const [nodeName, setNodeName] = useState(selectedNode.data["label"]);
  // const reactFlowInstance = useReactFlow();
  // console.log(reactFlowInstance.getNodes());
  let id = selectedNode.id;

  useEffect(() => {
    // Update the nodeName state when the selected node changes
    setNodeName(selectedNode.data["label"]);
  }, [id]);

  // Update the node data in the nodes state whenever nodeName changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // Create a new object to notify React Flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
        return node;
      })
    );
  }, [selectedNode, nodeName, setNodes]);

  // Function to switch from the update sidebar to the main node content sidebar
  const mainSidebar = () => {
    setNodeSelected(false);
  };

  return (
    <>
      <div className="update">
        <div className="back">
          <span
            className="material-symbols-outlined"
            style={{ marginRight: 10, cursor: "pointer",color:"#62646b" }}
            onClick={mainSidebar}
          >
           <GoArrowLeft/>
          </span>
          <h2 style={{ paddingLeft: 50, margin: 0 ,color:"#62646b"}}>Message</h2>
        </div>
      </div>
      <div style={{ width: `100%`, height: 2, background: "rgb(214, 212, 212)" }}></div>

      <div className="update">
        <h3>Text</h3>
        <textarea
          rows="4"
          cols="25"
          value={nodeName}
          onChange={(evt) => {
            setNodeName(evt.target.value);
            // setNewNodeLabel(evt.target.value);
          }}
          style={{ marginBottom: 15, borderRadius: 5 }}
        />
      </div>
      <div style={{ width: `100%`, height: 2, background: "rgb(214, 212, 212)" }}></div>
    </>
  );
};

export default UpdateNode;
