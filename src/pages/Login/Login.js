import React from 'react'
//import './login.css'
import styles from './login_styles.css'
import logo from './Logo [dark].svg';
import LoginInput from '../../components/LoginInput/LoginInput'
import LoginFooter from '../../components/LoginFooter/LoginFooter'
import { ToastContainer, toast } from 'react-toastify';




class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handlePasswordChange(text) {
        this.setState({
            password: text
        });
    }

    handleEmailChange(text) {
        this.setState({
            email: text
        })
    }

    componentDidMount() {
        if (this.props.stitch.authedId()) {
            this.props.stitch.logout()
            console.log("logged out")
        }

    }


    errormodal = (text) => toast.error(text);

    login() {
        // 
        const { history } = this.props;

        this.props.stitch.login(this.state.email, this.state.password, {})
            .then((userId) => {
                console.log("Successfully logged in as user", userId);
                let db  = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");
                let users = db.collection("users");
                    users.find({ "owner_id": userId}, null).execute().then((data) => {
                        console.log(data[0])
                        if (data[0]) {
                            history.push('/dashboard')
                        }else{
                            history.push('/info')
                        }
                    })  
                })
                    .catch((error) => {
                        console.log("Error logging in with email/password auth:", error.error);
                        this.errormodal(error.error)
                    });
            }


    render() {
                //this.props.stitch.auth.providers.userpass.sendEmailConfirm('akacquaah@gmail.com').catch((error)=>{console.log(error.error)})
                console.log(this.props.stitch)
        const page = (

                    <div className={styles.body}>
                        <ToastContainer />
                        <header>
                            <a href=".">
                                <img src={logo} className={styles.logo_svg} alt="logo" />
                            </a>
                        </header>

                        <div className={styles.loginForm}>
                            <form className={styles.form}>
                                <LoginInput value={this.state.email} label="email" onInputTextChange={this.handleEmailChange} />;
                        <span className={styles.signupText}>no account yet? <a className={styles.signupText__link} href='/signUp'>sign up</a></span>
                                <LoginInput value={this.state.password} label="password" onInputTextChange={this.handlePasswordChange} />;
                        <input id="submit" className={styles.submit_button} type="button" value="Begin" onClick={() => this.login()}></input>
                            </form>
                        </div>
                        <LoginFooter />
                    </div>
                )

        return page

            }

}



    export default Login
