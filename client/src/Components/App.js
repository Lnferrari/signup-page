import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './Signup';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <main>
            <Route exact path='/' component={Signup} />
            <Route exact path='/users' component={UserList} />
          </main>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
