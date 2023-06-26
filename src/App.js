import logo from './logo.svg';
import { useRoutes } from './utils/hooks/useRoutes';
import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from './utils/hooks/auth.hook';
import { Loader } from './utils/component/Loader';
import { AuthContext } from './utils/context/AuthContext';
import { Navbar } from './utils/component/NavBar';


function App() {
  const {token, login, logout, userId, ready,role} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated,role)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, role
    }}>
      <Router>
       {/* {isAuthenticated && <Navbar />} */}
        <div className="container">
          {routes}
          </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
