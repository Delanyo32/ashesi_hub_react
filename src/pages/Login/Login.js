import React from 'react'
//import './login.css'
import styles from './login_styles.css'
import logo from './Logo [dark].svg';
import LoginInput from '../../components/LoginInput/LoginInput'
import LoginFooter from '../../components/LoginFooter/LoginFooter'



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

    handleEmailChange(text){
        this.setState({
            email:text
        })
    }


    render() {
        const page = (
            <div className={styles.body}>
                <header>
                    <a href=".">
                        <img src={logo} className={styles.logo_svg} alt="logo" />
                    </a>
                </header>

                <div className={styles.loginForm}>
                    <form action="" className={styles.form}>
                        <LoginInput value={this.state.email} label="email" onInputTextChange={this.handleEmailChange} />;
                        <LoginInput value={this.state.password} label="password" onInputTextChange={this.handlePasswordChange} />;
                        <input id="submit" className={styles.submit_button} type="submit" value="Begin"></input>
                    </form>
                </div>
                <LoginFooter />
            </div>
        )

        return page

    }

}



export default Login
