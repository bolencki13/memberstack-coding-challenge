import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import processStore from '../redux/store'
import AuthPage from './pages/Auth'
import DashboardPage from './pages/Dashboard'

function App() {
  return (
    <Container>
      <Provider store={processStore.getStore()}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </Provider>
    </Container>
  )
}

export default App
