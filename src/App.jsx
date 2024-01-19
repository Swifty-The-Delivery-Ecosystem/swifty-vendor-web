import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Footer from "./components/Footer";

// index.js or App.js
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faMagnifyingGlass, faRightFromBracket, faInstagram, faTwitter);

export default function App() {
  return (
    <>
      <NavBar />
      <Body />
      <Footer />
    </>
  );
}
