import React from 'react'
import projectinfo from './ProjectInformation.css'
import TextInput from '../../components/TextInput/TextInput'
import TextArea from '../../components/TextArea/TextArea';
import MultiDataForm from '../../components/MultiDataForm/MultiDataForm'
import MDF from '../../components/MDF/MDF'
import GroupHeader from '../../components/GroupHeader/GroupHeader'

class ProjectInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            projectSynopsis: '',
            projectLeads:[{
                id:0,
                name: '',
                role: '',
                motivation:'',
                file:''
            }],
            targetCommunity:[{
                id:0,
                community: '',
                population: [],
                need:'',
            }],
            communityEngagement: '',
            communityAssets:'',
            communityApproach:'',
            communityNeed:'',
            objeciveDescription:'',
            objectiveTarget:'',
            challenges:'',
            volunteerRoles:'',
            volunteerNumbers:'',
            volunteerSource:'',
            externalPartners:'',
            communitySharing:'',
            preference:''

        };

        this.handleProjectTitleChange = this.handleProjectTitleChange.bind(this);
        this.handleProjectSynopsisChange = this.handleProjectSynopsisChange.bind(this);
        this.handleProjectLeadChange = this.handleProjectLeadChange.bind(this)
        this.handleTargetCommunityChange = this.handleTargetCommunityChange.bind(this)
        this.handleCommunityEngagementChange = this.handleCommunityEngagementChange.bind(this)
        this.handleCommunityAssetsChange = this.handleCommunityAssetsChange.bind(this)
        this.handleCommunityApproachChange = this.handleCommunityApproachChange.bind(this)
        this.handlecommunityNeedChange = this.handlecommunityNeedChange.bind(this)
        this.handleObjeciveDescriptionChange  =  this.handleObjeciveDescriptionChange.bind(this)
        this.handleObjectiveTargetChange = this.handleObjectiveTargetChange.bind(this)
        this.handleChallengesChange = this.handleChallengesChange.bind(this)
        this.handleVolunteerRolesChange = this.handleVolunteerRolesChange.bind(this)
        this.handleVolunteerNumbersChange = this.handleVolunteerNumbersChange.bind(this)
        this.handleVolunteerSourceChange = this.handleVolunteerSourceChange.bind(this)
        this.handleExternalPartnersChange = this.handleExternalPartnersChange.bind(this)
        this.handleCommunitySharingChange = this.handleCommunitySharingChange.bind(this)
        this.handlePreferenceChange = this.handlePreferenceChange.bind(this)

    }


    
    handleProjectTitleChange(text) {
        this.setState({
            projectTitle: text
        });
    }

    handleProjectSynopsisChange(text) {
        this.setState({
            projectSynopsis: text
        });
    }

    handleProjectLeadChange(array) {
        this.setState({
            projectLeads: array
        });
    }

    handleTargetCommunityChange(array) {
        this.setState({
            targetCommunity: array
        });
    }

    handleCommunityEngagementChange(text) {
        this.setState({
            communityEngagement: text
        });
    }

    handleCommunityAssetsChange(text) {
        this.setState({
            communityAssets: text
        });
    }

    handleCommunityApproachChange(text) {
        this.setState({
            communityApproach: text
        });
    }

    handlecommunityNeedChange(text) {
        this.setState({
            communityNeed: text
        });
    }

    
    handleObjeciveDescriptionChange(text) {
        this.setState({
            objeciveDescription: text
        });
    }

    handleObjectiveTargetChange(text) {
        this.setState({
            objectiveTarget: text
        });
    }

    handleChallengesChange(text) {
        this.setState({
            challenges: text
        });
    }

    handleVolunteerRolesChange(text) {
        this.setState({
            volunteerRoles: text
        });
    }

    handleVolunteerNumbersChange(text) {
        this.setState({
            volunteerNumbers: text
        });
    }

    handleVolunteerSourceChange(text) {
        this.setState({
            volunteerSource: text
        });
    }

    handleExternalPartnersChange(text) {
        this.setState({
            externalPartners: text
        });
    }

    handleCommunitySharingChange(text) {
        this.setState({
            communitySharing: text
        });
    }

    handlePreferenceChange(text) {
        this.setState({
            preference: text
        });
    }




    sendData(){
        const { history } = this.props;
        let db  = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

        
        let users = db.collection("users");

        let obj = this.state

        //obj["owner_id"]=this.props.stitch.authedId()

        //console.log(obj)

        users.find({"owner_id":this.props.stitch.authedId()},null).execute().then((data)=>{
            var current_user = data[0]
            current_user.project["applicationData"] = this.state

            users.updateOne({ owner_id: this.props.stitch.authedId() }, { $set: { applicationData: this.state } })
            .then(() => { 
                console.log("inserted:")
                history.push('/activities')
             })
             .catch(err=>{
                console.log(err.error)
             })
            
        })



    }


    render() {
                const page = (
                    <div className={projectinfo.loginDone}>
        
                        <header>
                            <a href=".">
                                <svg className={projectinfo.logo_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 41">
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="#3C424F" d="M16.436,11.216 C22.092,11.216 26.908,15.248 26.908,22.808 L26.908,40 L18.508,40 L18.508,24.04 C18.508,20.568 16.324,18.944 13.636,18.944 C10.556,18.944 8.42799999,20.736 8.42799999,24.712 L8.42799999,40 L0.0279999905,40 L0.0279999905,0.8 L8.42799999,0.8 L8.42799999,14.632 C9.93999999,12.56 12.74,11.216 16.436,11.216 Z M51.884,12 L60.284,12 L60.284,40 L51.884,40 L51.884,37.368 C50.372,39.44 47.572,40.784 43.876,40.784 C38.22,40.784 33.404,36.752 33.404,29.192 L33.404,12 L41.804,12 L41.804,27.96 C41.804,31.432 43.988,33.056 46.676,33.056 C49.756,33.056 51.884,31.264 51.884,27.288 L51.884,12 Z M84.308,11.216 C91.644,11.216 97.692,17.656 97.692,26 C97.692,34.344 91.644,40.784 84.308,40.784 C80.556,40.784 77.812,39.496 75.964,37.368 L75.964,40 L67.564,40 L67.564,0.8 L75.964,0.8 L75.964,14.632 C77.812,12.504 80.556,11.216 84.308,11.216 Z M82.628,32.832 C86.492,32.832 89.292,30.2 89.292,26 C89.292,21.8 86.492,19.168 82.628,19.168 C78.764,19.168 75.964,21.8 75.964,26 C75.964,30.2 78.764,32.832 82.628,32.832 Z"
                                        />
                                        <path fill="#00DF91" d="M106.092,40.784 C103.18,40.784 100.772,38.376 100.772,35.464 C100.772,32.552 103.18,30.144 106.092,30.144 C109.004,30.144 111.412,32.552 111.412,35.464 C111.412,38.376 109.004,40.784 106.092,40.784 Z"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </header>
        
                        <div className={projectinfo.content}>
        
                            <h3 className={projectinfo.pageTitle}>
                                Application Information
                            </h3>
        
                            <form className={projectinfo.form}action="">
        
        
                            {/* <TextInput label="Project Title" onInputTextChange={this.handleProjectTitleChange}/>  */}
                            <TextArea label="Project Synopsis" onInputTextChange={this.handleProjectSynopsisChange}/>
                            <MultiDataForm data={this.state.projectLeads} stitch={this.props.stitch} onProjectLeadChange={this.handleProjectLeadChange}/>  
                            <MDF data={this.state.targetCommunity} onTargetCommunityChange={this.handleTargetCommunityChange}/> 
                            <GroupHeader label="Community Research"/>
                            <TextArea label="Have you engaged with Community members" onInputTextChange={this.handleCommunityEngagementChange}/>
                            <TextArea label="Which community assets can you leverage or Strenghten" onInputTextChange={this.handleCommunityAssetsChange} />
                            <TextArea label="What is your approach to addressing community need" onInputTextChange={this.handlecommunityNeedChange}/>

                            <GroupHeader label="Objectives"/>
                            <TextArea label="What are the objectives of the project?" onInputTextChange={this.handleObjeciveDescriptionChange} />
                            <TextArea label="How will you know you have met these objectives?" onInputTextChange={this.handleObjectiveTargetChange}/>


                            <GroupHeader label="Challenges"/>
                            <TextArea label="What do you see as plausible impediments?" onInputTextChange={this.handleChallengesChange}/>

                            
                            <GroupHeader label="Volunteers"/>
                            <TextArea label="What are the volunteer roles needed to execute this project?" onInputTextChange={this.handleVolunteerRolesChange}/>
                            <TextArea label="How many volunteers are to execute this project?" onInputTextChange={this.handleVolunteerNumbersChange}/>
                            <TextArea label="Where do you plan on sourcing volunteers from?" onInputTextChange={this.handleVolunteerSourceChange} />
                            <TextArea label="List any external partener organization" onInputTextChange={this.handleExternalPartnersChange}/>

                            <GroupHeader label="Ashesi Community"/>
                            <TextArea label="Share your plan for sharing your success with the Ashesi Community" onInputTextChange={this.handleCommunitySharingChange}/>
                            <TextArea label="Why should we pick this project over others?" onInputTextChange={this.handlePreferenceChange}/>

                            <GroupHeader label="Please download and fill the following (instrctions in the template)"/>
                            <a className={projectinfo.link} href="">Project Timeline and Budget Template</a>
                            <a className={projectinfo.link} href="">Simple Statement of Recommmendation</a>

                            
                             
                            <input id="submit" className={projectinfo.submit_btn}type="button" value="continue" onClick={() => this.sendData()}  />
                                
                            </form>
                        </div>
                        
                       
{/*         
                        <footer className={projectinfo.footer}>
                            <p className={projectinfo.footer__copy}> &copy; 2017
                                <a href=".">Raphael</a> &amp;
                                <a href=".">Delanyo</a>
                            </p>
                            <p className={projectinfo.footer__help}> help </p>
                        </footer> */}
                    </div>
                )

                    return page
    }
}

export default ProjectInformation
