import React from 'react'
import info_css from './info.css'
import TextInput from '../../components/TextInput/TextInput'
import Dropdown from '../../components/Dropdown/Dropdown';
import Dropdown_sm from '../../components/Dropdown_sm/Dropdown_sm';
import TextInput_sm from '../../components/TextInput _sm/TextInput_sm';
import TextArea from '../../components/TextArea/TextArea';

class Info extends React.Component {

    render() {
        const page = (
            <div className={info_css.loginDone}>

                <header>
                    <a href=".">
                        <svg className={info_css.logo_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 41">
                            <g fill="none" fillRule="evenodd">
                                <path fill="#3C424F" d="M16.436,11.216 C22.092,11.216 26.908,15.248 26.908,22.808 L26.908,40 L18.508,40 L18.508,24.04 C18.508,20.568 16.324,18.944 13.636,18.944 C10.556,18.944 8.42799999,20.736 8.42799999,24.712 L8.42799999,40 L0.0279999905,40 L0.0279999905,0.8 L8.42799999,0.8 L8.42799999,14.632 C9.93999999,12.56 12.74,11.216 16.436,11.216 Z M51.884,12 L60.284,12 L60.284,40 L51.884,40 L51.884,37.368 C50.372,39.44 47.572,40.784 43.876,40.784 C38.22,40.784 33.404,36.752 33.404,29.192 L33.404,12 L41.804,12 L41.804,27.96 C41.804,31.432 43.988,33.056 46.676,33.056 C49.756,33.056 51.884,31.264 51.884,27.288 L51.884,12 Z M84.308,11.216 C91.644,11.216 97.692,17.656 97.692,26 C97.692,34.344 91.644,40.784 84.308,40.784 C80.556,40.784 77.812,39.496 75.964,37.368 L75.964,40 L67.564,40 L67.564,0.8 L75.964,0.8 L75.964,14.632 C77.812,12.504 80.556,11.216 84.308,11.216 Z M82.628,32.832 C86.492,32.832 89.292,30.2 89.292,26 C89.292,21.8 86.492,19.168 82.628,19.168 C78.764,19.168 75.964,21.8 75.964,26 C75.964,30.2 78.764,32.832 82.628,32.832 Z"
                                />
                                <path fill="#00DF91" d="M106.092,40.784 C103.18,40.784 100.772,38.376 100.772,35.464 C100.772,32.552 103.18,30.144 106.092,30.144 C109.004,30.144 111.412,32.552 111.412,35.464 C111.412,38.376 109.004,40.784 106.092,40.784 Z"
                                />
                            </g>
                        </svg>
                    </a>
                </header>

                <div className={info_css.content}>

                    <h3 className={info_css.pageTitle}>
                        Personal Information
                    </h3>

                    <form className={info_css.form}action="">


                    <TextInput label="Full Name"/> 
                    <TextInput label="Country of Citizenship"/> 
                    {/* <TextInput label="Residential Address"/>  */}
                    <TextArea label="area code"/>
                    <Dropdown_sm label="Major" options={["CS","BA","MA","EE","MIS"]}/>
                    <Dropdown label="Expected year of Graduation" options={[2021,2020,2019,2018]}/>
                    <TextInput_sm label="phone #"/>
                    <Dropdown label="is your GPA geater than 2.3?"  options={["yes","no"]}/>
                     
                        <input id="submit" className={info_css.submit_btn}type="submit" value="continue" />
                    </form>
                </div>

                <footer className={info_css.footer}>
                    <p className={info_css.footer__copy}> &copy; 2017
                        <a href=".">Raphael</a> &amp;
                        <a href=".">Delanyo</a>
                    </p>
                    <p className={info_css.footer__help}> help </p>
                </footer>
            </div>
        )
        return page
    }
}

export default Info
