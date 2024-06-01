const Topbar = ({ saveFlow }) => {
  return (
    <div className="savingChange">
      {/* Button that triggers the saveFlow function when clicked */}
      <button onClick={saveFlow}>Save Changes</button>
    </div>
  );
};

export default Topbar;
