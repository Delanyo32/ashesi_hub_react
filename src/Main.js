import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Info from './pages/PersonalInfo/info'
import DoneSignUp from './pages/DoneSignUp/doneSignUp'
import ProjectInformation from './pages/ProjectInformation/ProjectInformation'
import Dashboard from './pages/Dashboard/Dashboard'
import Milestones from './pages/Milestones/Milestones'
import ActivitiesDashboard from './pages/ActivitiesDashboard/ActivitiesDashboard'
import ActivityPage from './pages/ActivityPage/ActivityPage'


class Main extends React.Component{

  //
  render(){
    //console.log(this.props.stitch)
    const full_height={height:"100vh"}
    const page = (
      <main style={full_height}>
        <Switch>
          <Route exact path='/' render={(props) => <Login {...props} stitch={this.props.stitch}/>}/>
          <Route path='/signUp' render={(props) => <SignUp {...props} stitch={this.props.stitch}/>}/>
          <Route path='/info'  render={(props) => <Info {...props} stitch={this.props.stitch}/>}/>
          <Route path='/done'  render={(props) => <DoneSignUp {...props} stitch={this.props.stitch}/>}/>
          <Route path='/projectInformation'  render={(props) => <ProjectInformation {...props} stitch={this.props.stitch}/>}/>
          <Route path='/activities/:id'  render={(props) => <ActivityPage {...props} stitch={this.props.stitch}/>}/>
          <Route path='/activities'  render={(props) => <ActivitiesDashboard {...props} stitch={this.props.stitch}/>}/>
          
        </Switch>
      </main>
    )
    return page
  }
}


export default Main
