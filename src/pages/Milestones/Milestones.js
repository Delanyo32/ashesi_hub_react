import React from 'react'
import css from './Milestones.css'

import Table from '../../components/Table/Table'
class Milestones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            selectedTab:"milestone",
            milestoneData: {},
            milestones: [],
            project:{},
            milestoneIndex:this.props.match.params.id
        };

        this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this)
        this.handlePropsChange = this.handlePropsChange.bind(this);

    }

    handlePropsChange(data) {
        this.setState({
            milestoneData: data
        });
    }
    componentDidMount() {
        this.findMilestones()
        this.getCurrentUser()
    }

    updateData(milestones){
        const { history } = this.props;
        let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");
        let projects = db.collection("projects");
        var id = this.state.project._id
        console.log(id)

        projects.updateOne({ _id: id }, { $set: { milestones: milestones } }).then(() => {
            console.log("done")
            history.push("/dashboard")
        })
        .catch((error)=>{
            console.log(error.error)
        })
    }

    handleMilestoneUpdate(updateData){
        var currentMilestone = Object.assign({}, this.state.milestoneData)
        if(updateData.type==="budget"){
            if(currentMilestone.moneySpent){
                currentMilestone.moneySpent=(parseInt(currentMilestone.moneySpent)+parseInt(updateData.value)).toString()
                
            }else{
                currentMilestone["moneySpent"]=updateData.value
                
            }
        }else if(updateData.type==="lives"){
            if(currentMilestone.currentlivesAffected){
                currentMilestone.currentlivesAffected = (parseInt(currentMilestone.currentlivesAffected)+parseInt(updateData.value)).toString()
                
            }else{
                currentMilestone["currentlivesAffected"]=updateData.value
                
            } 
        }else if(updateData.type==="target"){
            if(currentMilestone.targets[updateData.targetIndex].currentTargetValue){
                currentMilestone.targets[updateData.targetIndex].currentTargetValue = (parseInt(currentMilestone.targets[updateData.targetIndex].currentTargetValue)+parseInt(updateData.value)).toString()
                
            }else{
                currentMilestone.targets[updateData.targetIndex]["currentTargetValue"]=updateData.value
                
            }
        }
        var newMilestones = this.state.project.milestones.slice()
        newMilestones[this.state.milestoneIndex]=currentMilestone

        this.updateData(newMilestones)

    }



    renderTabs(){
        
        if(this.state.selectedTab==="milestone"){
            var mileData = {}
            mileData["key"] = this.state.milestoneData.milestone
            if(this.state.milestoneData.moneySpent){
                mileData["current"]=this.state.milestoneData.moneySpent
            }else{
                mileData["current"] = "0"
            }
            mileData["value"] = this.state.milestoneData.milestoneBudget
            var data  = []
            data.push(mileData)
            return <Table label="Milestone Budget" data={data} onMilestoneUpdate={this.handleMilestoneUpdate}/>
        }
        if(this.state.selectedTab==="affected"){
            var mileData = {}
            mileData["key"] = this.state.milestoneData.impactUnit
            if(this.state.milestoneData.currentlivesAffected){
                mileData["current"] = this.state.milestoneData.currentlivesAffected
            }else{
                mileData["current"] = "0"
            }
            mileData["value"] = this.state.milestoneData.impactLives
            var data  = []
            data.push(mileData)
            return <Table label="Lives to Affect" data={data} onMilestoneUpdate={this.handleMilestoneUpdate}/>
        }
        if(this.state.selectedTab==="targets"){
            var data  = []
            this.state.milestoneData.targets.forEach(target => {
                var mileData = {}
                mileData["key"] = target.targetUnit
                if(target.currentTargetValue){
                    mileData["current"] = target.currentTargetValue
                }else{
                    mileData["current"] = "0"
                }
                mileData["value"] = target.targetValue
                data.push(mileData)
            });
            return <Table label="Set Targets" data={data} onMilestoneUpdate={this.handleMilestoneUpdate}/>
        }
    }

    toggleTable(tab){
        this.setState({
            selectedTab:tab
        })
    }

    route(){
        const { history } = this.props;
        history.push("/dashboard")
    }

    findMilestones() {
        let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");
        let projects = db.collection("projects");
        projects.find({ "owner_id": this.props.stitch.authedId() }, null).execute().then((data) => {
            console.log(this.props.match.params.id)
            if (data[0].milestones && data[0].milestones[this.props.match.params.id]) {
                this.setState({
                    project:data[0]
                })
                this.setState({
                    milestoneData: data[0].milestones[this.state.milestoneIndex]
                })
            }else{
                const { history } = this.props;
                history.push("/dashboard")
            }
        });

    }

    logout(){
        if (this.props.stitch.authedId()) {
            this.props.stitch.logout()
            console.log("logged out")
            const { history } = this.props;
            history.push("/")
        }
    }


    getCurrentUser(){
        let db  = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

        let users = db.collection("users");

        users.find({"owner_id":this.props.stitch.authedId()},null).execute().then((data)=>{
            if(data[0]){
              this.setState({user:data[0]})
            }
        })


    }




    sendData() {
        let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

        let projects = db.collection("projects");

        projects.find({ "owner_id": this.props.stitch.authedId() }, null).execute().then((data) => {
            let project = data[0]

            let milestones = null

            if (project.milestones) {
                milestones = project.milestones
            } else {
                milestones = []
            }

            milestones.push(this.state.milestoneData)
            project["milestones"] = milestones

            projects.updateOne({ _id: project._id }, { $set: { milestones: milestones } }).then(() => {
                console.log(milestones)
            });
        });

    }

    render() {
        const page = (
            <div className={css.loginDone}>

                <header className={css.header__dashboard}>
                    <a href=".">
                        <svg className={css.logo_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 41">
                            <g fill="none" fillRule="evenodd">
                                <path fill="#3C424F" d="M16.436,11.216 C22.092,11.216 26.908,15.248 26.908,22.808 L26.908,40 L18.508,40 L18.508,24.04 C18.508,20.568 16.324,18.944 13.636,18.944 C10.556,18.944 8.42799999,20.736 8.42799999,24.712 L8.42799999,40 L0.0279999905,40 L0.0279999905,0.8 L8.42799999,0.8 L8.42799999,14.632 C9.93999999,12.56 12.74,11.216 16.436,11.216 Z M51.884,12 L60.284,12 L60.284,40 L51.884,40 L51.884,37.368 C50.372,39.44 47.572,40.784 43.876,40.784 C38.22,40.784 33.404,36.752 33.404,29.192 L33.404,12 L41.804,12 L41.804,27.96 C41.804,31.432 43.988,33.056 46.676,33.056 C49.756,33.056 51.884,31.264 51.884,27.288 L51.884,12 Z M84.308,11.216 C91.644,11.216 97.692,17.656 97.692,26 C97.692,34.344 91.644,40.784 84.308,40.784 C80.556,40.784 77.812,39.496 75.964,37.368 L75.964,40 L67.564,40 L67.564,0.8 L75.964,0.8 L75.964,14.632 C77.812,12.504 80.556,11.216 84.308,11.216 Z M82.628,32.832 C86.492,32.832 89.292,30.2 89.292,26 C89.292,21.8 86.492,19.168 82.628,19.168 C78.764,19.168 75.964,21.8 75.964,26 C75.964,30.2 78.764,32.832 82.628,32.832 Z"
                                />
                                <path fill="#00DF91" d="M106.092,40.784 C103.18,40.784 100.772,38.376 100.772,35.464 C100.772,32.552 103.18,30.144 106.092,30.144 C109.004,30.144 111.412,32.552 111.412,35.464 C111.412,38.376 109.004,40.784 106.092,40.784 Z"
                                />
                            </g>
                        </svg>
                    </a>
                    <div className={css.header__dashboard__profile}>
                        <h3 className={css.header__dashboard__profile_name}>{this.state.user.fullName}</h3>
                        {/* <p className={css.header__dashboard__profile_email}>dero@ashesi.edu</p> */}
                        <a onClick={()=>{this.logout()}} className={css.header__dashboard__profile_logout}>logout</a>
                    </div>


                </header>
                <div className={css.underdashheader}>
                    <h2 className={css.underdashheader__title}>Project Dashboard</h2>
                    <div className={css.underdashheader__section}>
                        <a onClick={()=>{this.route()}} className={css.underdashheader__section__projinfo}>Back to Milestones</a>
                    </div>
                </div>

                <div className={css.milestoneTitle}>
                    <div className={css.milestoneTitle__self}>Milestones</div>
                    <div className={css.milestoneTitle__free}>{this.state.milestoneData.milestoneReason}</div>
                    <div className={css.milestoneTitle__free_sub}>Click on a tab to display its information, then click ona section to update it.</div>
                </div>

                <div className={css.milestoneTab}>
                    <span className={css.milestoneTab__span} onClick={()=>{this.toggleTable("milestone")}}>milestone budget (amt)</span>
                    <span className={css.milestoneTab__span} onClick={()=>{this.toggleTable("targets")}} >Milestone Targets</span>
                    <span className={css.milestoneTab__span} onClick={()=>{this.toggleTable("affected")}}># of affected lives</span>
                </div>

                
                {this.renderTabs()}

                <footer className={css.footer}>
                    <p className={css.footer__copy}> &copy; 2017
                    <a href=".">Raphael</a> &amp;
                    <a href=".">Delanyo</a>
                    </p>
                    <p className={css.footer__help}> help </p>
                </footer>

            </div>
        )
        return page
    }
}

export default Milestones
