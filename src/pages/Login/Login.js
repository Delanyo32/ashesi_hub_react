import React from 'react'
//import './login.css'
import styles from './login_styles.css'
import logo from './Logo [dark].svg';
import LoginInput from '../../components/LoginInput/LoginInput'
import LoginFooter from '../../components/LoginFooter/LoginFooter'
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button,Input  } from 'antd';



class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resetEmail:'',
            visible: false
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    onChangeEmailAddress = (e) =>{
        this.setState({resetEmail:e.target.value})
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        //console.log(e);
        this.props.stitch.then(stitch => {
            stitch.auth.provider('userpass').sendPasswordReset(this.state.resetEmail)
            .then(() => {
                this.success("Successfully sent password reset link!");
            })
            .catch(err => {
                this.errormodal("Error sending password reset link:", err);
            });
        })
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
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
        this.props.stitch.then(stitch => {
            if (stitch.authedId()) {
                stitch.logout()
                console.log("logged out")
            }
        })


    }


    errormodal = (text) => toast.error(text);
    success = (text) => toast.success(text)
    notify = (text) => toast(text);

    login() {
        // 
        this.notify("logging you in....")
        const { history } = this.props;
        this.props.stitch.then(stitch => {
            stitch.login(this.state.email, this.state.password, {})
                .then((userId) => {
                    console.log("Successfully logged in as user", userId);
                    let db = stitch.service("mongodb", "mongodb-atlas").db("hub");
                    let users = db.collection("users");
                    users.find({ "owner_id": userId }, null).execute().then((data) => {
                        console.log(data[0])
                        if (data[0]) {
                            history.push('/activities')
                        } else {
                            history.push('/info')
                        }
                    })
                })
                .catch((error) => {
                    console.log("Error logging in with email/password auth:", error.message);
                    this.errormodal(error.message)
                });
        })


    }


    render() {
        //this.props.stitch.auth.providers.userpass.sendEmailConfirm('atoacquaah@yahoo.com').catch((error)=>{console.log(error.error)})

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
                        <span className={styles.signupText_2}>Forgot Password? <a className={styles.signupText__link} onClick={this.showModal}>reset password</a></span>
                        <Modal
                            title="Reset Password"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                        <Input placeholder="Email Address" onChange={this.onChangeEmailAddress}/>
                        </Modal>
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
