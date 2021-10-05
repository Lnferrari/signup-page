import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import Signup from './Signup';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to='/signup' activeClassName='active'>
            Signup
          </NavLink>
          <NavLink to='/login' activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/users' activeClassName='active'>
            Users
          </NavLink>
        </nav>
        <Switch>
          <main>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/users' component={UserList} />
          </main>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
