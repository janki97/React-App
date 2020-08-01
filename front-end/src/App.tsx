import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import BankaStrana from './components/BankaStrana';
import UpitStrana from './components/UpitStrana';
import { Container } from 'semantic-ui-react';
function App() {



  return (
    <Router>

      <Container>
      <Header/>
      <Switch >
      
       <Route path = "/banka">
         <BankaStrana/>
       </Route>
       <Route path = "/upit">
         <UpitStrana/>
       </Route>
       
      </Switch>
      </Container>
    </Router>
  );
}

export default App;
