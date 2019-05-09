import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Layout from './Layout/layout'


//routes importing
import Home from './Pages/landingPage'
class App extends Component {
  render() {

    let route = (
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    )

    return (
      <Layout>
        {route}
      </Layout>
    );
  }
}

export default App;
