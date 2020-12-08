import React from 'react'

import Layout from "./HOC/Layout/Layout";

import Quiz from "./containers/Quiz/Quiz";

function App() {
  return (
      <Layout>
          <div className="App">
              <Quiz/>
          </div>
      </Layout>

  );
}

export default App;
