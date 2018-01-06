import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Info from './pages/PersonalInfo/info'
import DoneSignUp from './pages/DoneSignUp/doneSignUp'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/signUp' component={SignUp}/>
      <Route path='/info' component={Info}/>
      <Route path='/done' component={DoneSignUp}/>
    </Switch>
  </main>
)

export default Main
