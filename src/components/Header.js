import PropTypes from "prop-types";
import Button from "./Button";
// allows you to know the route we're currently on
import { useLocation } from "react-router-dom";


// {} here is destructuring props
// - so instead of using {props.title} for <h1>, we can just use {title}
const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
  return (
    <header className="header">
      <h1>{title}</h1>

      {location.pathname === '/' && <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: "CoordiMate",
};

// enforce the type passed in
// - will give warning if type not correct
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }
export default Header;
