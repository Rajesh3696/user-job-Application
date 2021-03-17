import './App.css';
import {Link,Route} from 'react-router-dom'
import Home from './Home'
import Form from './Form';
import Admin from './Admin'

function App() {
  return (
    <div className="App">
       <div className="navbar expand-lg bg-dark">
        <div className="row col-lg-12">
          <div className="col-md-2" >
            <Link className="home" to="/">Home</Link>
          </div>
          <div className="col-md-2">
            <Link className="Admin" to="/admin">Admin Dashboard</Link>
          </div>
          <div className="col-md-2 ">
            <Link className="Apply" to="/form">Apply</Link>
          </div>
        </div>
        </div>
        <Route path="/" component={Home} exact={true}/>
        <Route path='/form' component={Form}/>
        <Route path='/admin' component={Admin}/>
    </div>
  );
}

export default App;
