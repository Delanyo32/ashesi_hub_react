import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Info from './pages/PersonalInfo/info'
import DoneSignUp from './pages/DoneSignUp/doneSignUp'
import ProjectInformation from './pages/ProjectInformation/ProjectInformation'



class Main extends React.Component{

  //
  render(){
    //console.log(this.props.stitch)
    const page = (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <Login {...props} stitch={this.props.stitch}/>}/>
          <Route path='/signUp' render={(props) => <SignUp {...props} stitch={this.props.stitch}/>}/>
          <Route path='/info'  render={(props) => <Info {...props} stitch={this.props.stitch}/>}/>
          <Route path='/done'  render={(props) => <DoneSignUp {...props} stitch={this.props.stitch}/>}/>
          <Route path='/projectInformation'  render={(props) => <ProjectInformation {...props} stitch={this.props.stitch}/>}/>
        </Switch>
      </main>
    )
    return page
  }
}


export default Main
