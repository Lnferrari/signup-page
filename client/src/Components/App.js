import { useContext } from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import { Redirect } from 'react-router';
import UserContext from '../context/UserContext';
import Login from './Login';
import Signup from './Signup';
import UserList from './UserList';
import { logoutUser } from '../helpers/apiCalls';

function App() {
  const { user, setUser } = useContext(UserContext)

  const handleLogout = async () => {
    const resApi = await logoutUser()
    alert(resApi.message);
    setUser(null);
  }

  return (
    <div className="App">
      <Router>
        <nav>
          {
            !user
            ? <>
                <NavLink to='/signup' activeClassName='active'>
                  Signup
                </NavLink>
                <NavLink to='/login' activeClassName='active'>
                  Login
                </NavLink>
              </>
            : <>
                <NavLink to='/users' activeClassName='active'>
                  Users
                </NavLink>
                <p onClick={handleLogout}>
                  Logout
                </p>
              </>
          }
          
        </nav>
        <Switch>
          <main>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/users' component={UserList} />
          </main>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
