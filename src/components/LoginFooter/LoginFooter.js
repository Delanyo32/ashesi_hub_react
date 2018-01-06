import React, { Component } from 'react';
import css from './LoginFooter.css';

class LoginFooter extends Component {
    render() {
        return (
            <footer className={css.footer}>
                <p className={css.footer__copy}> &copy; 2017
                    <a href=".">Raphael</a> &amp;
                    <a href=".">Delanyo</a>
                </p>
                <p className={css.footer__help}> help </p>
            </footer>
        );
    }
}

export default LoginFooter;
