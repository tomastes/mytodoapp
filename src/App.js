import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Setting from "./Components/Setting/Setting";
import Signup from "./Components/Signup/Signup";
import Layout from "./Layout/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import NotFound from "./utils/NotFound";

function App() {
  const [user] = useAuthState(auth);

  // ! login with redux
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(
  //         login({
  //           email: user.email,
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoUrl: user.photoURL,
  //           admin: true,
  //         })
  //       );
  //     }
  //   });
  // });

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/setting">{user ? <Setting /> : <Login />}</Route>
          <Route path="/login">{!user ? <Login /> : <Home />}</Route>
          <Route path="/signup">{!user ? <Signup /> : <Home />}</Route>
          {/* unknown route */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
