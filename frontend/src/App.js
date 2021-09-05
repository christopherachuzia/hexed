import './App.css';
import {Route,Switch} from 'react-router-dom'
import booklist from './components/container/booklist'
import library from './components/container/library'
import reports from './components/container/reports'
import ProtectedRoute from './components/customroutes'

function App() {

  return (

    <Switch>
      <Route exact path='/' component={library}></Route>
      <ProtectedRoute path='/booklist' component={booklist}></ProtectedRoute>
      <ProtectedRoute path='/report' component={reports}/>
    </Switch>
  );
}

export default App;
