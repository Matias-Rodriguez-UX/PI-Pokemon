import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LandingPage } from './components/LandingPage';
import Home from './components/Home';
import { CreateForm } from './components/CreateForm'
import Details from './components/Details';

const urlImg = 'https://cdn.pixabay.com/photo/2023/01/02/16/22/16-22-19-650_1280.png'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <img src={urlImg} alt="title pokemon" className='pageTitle' style={{
          width: '50%',
          height: '50%'
        }} />
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
