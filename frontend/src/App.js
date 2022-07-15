import "./css/main.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
