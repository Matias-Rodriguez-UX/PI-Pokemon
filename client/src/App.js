import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LandingPage } from './components/LandingPage';
import Home from './components/Home';
import { CreateForm } from './components/CreateForm'
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Pokemon</h1>
        <Switch>
          <Route exact path={'/'} component={LandingPage} />
          <Route path={'/home'} component={Home} />
          <Route path={'/pokemon'} component={CreateForm} />
          <Route path={'/:id'} component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
