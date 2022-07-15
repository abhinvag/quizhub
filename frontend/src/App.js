import "./css/main.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={Admin} />
          <Route path="/createquiz" component={CreateQuiz} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
