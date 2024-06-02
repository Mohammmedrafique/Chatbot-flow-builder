import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Components/Sidebar";
import UpdateNode from "./Components/UpdateNode";
import Notification from "./Components/Notification";
import newNode from "./Components/newNode";
import "./index.css";
import Topbar from "./Components/Topbar";
import DownloadButton from "./Components/DownloadButton";

let id = 0; // ID counter for new nodes

const App = () => {
  const reactFlowWrapper = useRef(null); // Reference to the React Flow wrapper
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // State for managing nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // State for managing edges
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // React Flow instance
  const [nodeSelected, setNodeSelected] = useState(false); // State to track if a node is selected
  const [changeNode, setChangeNode] = useState(null); // State to track the node being updated
  const [errorMessage, setErrorMessage] = useState(null); // State for custom error message notification
  const [messageColor, setMessageColor] = useState(null); // State for custom color for error & success notification
  const [targetHandles, setTargetHandles] = useState([]); // State to track target handles when new edges are created between nodes

  // Function to handle node selection
  const update = useCallback((event, node) => {
    setChangeNode(node);
    setNodeSelected(true);
  }, []);

  // Variables to track source and target handles
  let sourceHandles = [];
  let targetHandle = [];

  // Function to handle new connections (edges) between nodes
  const onConnect = useCallback(
    (params) => {
      if (sourceHandles.includes(params.source)) return;
      sourceHandles = sourceHandles.concat(params.source);

      setEdges(
        (eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds) // Add arrowhead to the edge
      );

      if (targetHandle.includes(params.target)) return;
      targetHandle = targetHandle.concat(params.target);
      setTargetHandles(targetHandle);
    },
    [setEdges]
  );

  // Function to handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Function to handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Creating a new node
      const newerNode = {
        id: `node_${id}`,
        type: "node",
        position,
        data: { heading: "Send Message", label: `text message ${id}` },
      };

      id++;
      setNodes((nds) => nds.concat(newerNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Hide the React Flow attribution for personal/hobby projects
  let proOptions = { hideAttribution: true };

  // Custom node types with header and label
  const nodeTypes = useMemo(
    () => ({
      node: newNode,
    }),
    []
  );

  // Function to save the node flow and validate connections
  const saveFlow = () => {
    const totalNodes = reactFlowInstance.getNodes().length;

    // Validate that each node has at least one connection
    if (targetHandles.length !== totalNodes - 1) {
      setErrorMessage("Cannot save Flow");
      setMessageColor("redMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage("Saved Flow");
      setMessageColor("greenMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  function nodeColor(node) {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  }

  return (
    <div className="appflow" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="topbar">
            <Notification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
            onNodeClick={update}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        {nodeSelected ? (
          <div className="rightbar">
            <Topbar saveFlow={saveFlow} />
            <UpdateNode
              selectedNode={changeNode}
              setNodeSelected={setNodeSelected}
              setNodes={setNodes}
            />
          </div>
        ) : (
          <div className="rightbar">
            <Topbar saveFlow={saveFlow} />
            <Sidebar />
          </div>
        )}
        <MiniMap nodeColor={nodeColor} />
        <DownloadButton />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
