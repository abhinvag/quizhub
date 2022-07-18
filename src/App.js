import "./css/main.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
//import Header from "./components/Header";
import CreateQuiz from "./pages/CreateQuiz";
import Quiz from "./pages/Quiz";
import GiveQuiz from "./pages/GiveQuiz";
import QuizHistory from "./pages/QuizHistory";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={Admin} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/createquiz" component={CreateQuiz} />
          <Route path="/givequiz" component={GiveQuiz} />
          <Route path="/history" component={QuizHistory} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
