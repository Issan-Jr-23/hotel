
import "./login.css"
export const ButtonNext = ({ onClick, children }) => {
  return (
    <button
      className="button-next"
      onClick={onClick} 
      style={{ backgroundColor: "#0070f0" }}
    >
      {children}
    </button>
  );
};
