const Notification = ({ errorMessage, messageColor }) => {
  // Check if there is an errorMessage
  if (errorMessage) {
    // If there is an errorMessage, render a div with the errorMessage and apply the messageColor class
    return <div className={messageColor}>{errorMessage}</div>;
  }
  // If there is no errorMessage, render an empty div with the class 'savingChanges' and a padding of 19
  return <div className="savingChanges" style={{ padding: 19 }}></div>;
};

export default Notification;
