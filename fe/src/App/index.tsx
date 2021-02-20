import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import processStore from '../redux/store'
import AuthPage from './pages/Auth'

function App() {
  return (
    <Container>
      <Provider store={processStore.getStore()}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
          </Switch>
        </Router>
      </Provider>
    </Container>
  )
}

export default App
