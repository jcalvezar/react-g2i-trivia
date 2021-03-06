import logo from './g2i logo.png';
import title from './trivia title.png';
import button from './start.gif';
import {
  Link
} from "react-router-dom";

function HomePage() {

  return (
    <div className="container home">
      <div style={{ padding: '20px' }}>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <img src={title} alt="title" />
      </div>
      <Link className="boton" to="/trivia">
        <img src={button} alt="button" />
      </Link>
    </div>
  );
}

export default HomePage;