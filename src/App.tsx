import React from 'react';
import Home from './pages/Home';
import Layout from './components/layout/Layout';

function App() {
  return (
    // <Layout children={<Home/>} />
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
