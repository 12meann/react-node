import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./component/Todos";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import Login from "./component/Login";
import AuthContextProvider from "./context/AuthContext";
import TodosContextProvider from "./context/TodosContext";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <TodosContextProvider>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Todos} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
          </TodosContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
