import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CoinDisplay from "./pages/CoinDisplay";
import Graphs from "./pages/Graphs";
import Home from "./pages/Home";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/News" component={CoinDisplay} />
          <Route exact path="/Graphs" component={Graphs} />
        </Switch>
      </Router>
    </div>
  );
}
