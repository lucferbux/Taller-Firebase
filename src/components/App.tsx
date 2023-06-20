import React, { useEffect } from 'react';
import Layout from './layout/layout';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/Dashboard';
/* eslint-disable import/no-extraneous-dependencies */
import { getFirestore } from '@firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { firebaseConfig } from '../utils/firebase';

const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {
    console.log(firebaseConfig);
  }, []);

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </Layout>
      </Router>
    </FirestoreProvider>
  );
};

export default App;
