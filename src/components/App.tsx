import React, { useEffect } from "react";
import Layout from "./layout/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import Loader from "./elements/Loader";
import Dashboard from "./routes/Dashboard";
import { getFirestore } from "@firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { firebaseConfig } from "../utils/firebase";


const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {

    console.log(firebaseConfig);
  }, []);
  
  // TODO: Change redirect to Dashboard
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
          <Loader/>
        </Layout>
      </Router>
    </FirestoreProvider>
  );
};

export default App;
