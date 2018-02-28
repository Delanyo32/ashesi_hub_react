import React, { Component } from 'react';
import css from './MultiDataForm.css';
import add from '../../assets/images/addArrow.png'
import { ToastContainer, toast } from 'react-toastify';
//import  BSON  from 'mongodb-extjson';



class MultiDataForm extends Component {

    constructor(props) {
        super(props);
        this.handlePropsChange = this.handlePropsChange.bind(this)
      }
    
    handlePropsChange(array) {
        this.props.onProjectLeadChange(array);
    } 
    errormodal = (text) => toast.error(text);
    success = (text) => toast.success(text)

    addField(){
      let object = {
        id:(this.props.data.length),
        name: '',
        role: '',
        motivation:'',
        file:''
    }

    let newArray = this.props.data.slice()
    newArray.push(object)

    this.handlePropsChange(newArray)
  }

//   const client = new stitch.StitchClient('hub-rnabd');
//   const formatted = 
//   client.login('eric.daniels@mongodb.com', 'mypassword').then(() =>
//     client.executeServiceFunction("storageContainer", "put",{
// "body": {'$binary': {'base64': "", "subType": "00"}},
// "contentType": "application/pdf",
// "acl": "public-read",
// "bucket": "ashesihub",
// "key":"eric-test-cv.pdf"
// }).then((data)=>{
//     console.log(data)
//     })
//   )


  storeCV(file,item){

    var fileReader = new FileReader();

    this.props.stitch.then(stitch=>{
        
    let s3 = stitch
    let s = this

    
    //console.log( file[0])

    fileReader.onload = function () {
        var data = fileReader.result;
        var formatted = data.replace("data:application/pdf;base64,","")
        var filename = item.name + "_cv.pdf"
       //console.log(formatted)
      
        s3.executeServiceFunction("storageContainer", "put",{
            "body": {'$binary': {'base64': formatted, "subType": "00"}},
            "contentType": "application/pdf",
            "acl": "public-read",
            "bucket": "ashesihub",
            "key": filename
        }).then((data)=>{
            s.success("Upload Successful")
            item.file = data.location
            
        })
        
    };

    fileReader.readAsDataURL(file[0]);

    })
    

}



renderList(entries){
    const list = entries.map((item) => {
        return (
                <div className={css.piForm} key={item.id}>
                    
                    <div className={css.group_50}>
                        <input  className={css.group__input} type="text" onBlur={(e)=>{item.name=e.target.value}} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Name</label>
                    </div>

                    <div className={css.group_50}>
                        <input  className={css.group__input} type="text" onBlur={(e)=>{item.role=e.target.value}} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Role</label>
                    </div>

                    <div className={css.group}>
                        <textarea name="motivation" rows="4" className={css.group__input} onBlur={(e)=>{item.motivation=e.target.value}} required></textarea>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label} >Motivation</label>
                    </div>

                    <div className={css.group_50}>
                        <input type="file" className={css.inputfile} id="file"  name="file" accept=".pdf" onChange={(e)=>{this.storeCV(e.target.files,item)}}/>
                        <label className={css.inputfileLabel} htmlFor="file" >
                            <svg className={css.inputfileLabel__svg} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                            />
                            </svg>
                        <span>Upload C.V&hellip;</span></label>
                    </div>
                </div>
        );
      });
      return list
}
    
  render() {
    return (
        <div>
            <div className={css.piForm}  action="" >
            <ToastContainer />
                <div className={css.groupHeading}>
                    <h4 className={css.groupHeading__title} data-tooltip="Click to add a project lead.">Project Lead Information</h4>     
                    <a onClick={()=>{this.addField()}}><img className={css.groupHeading__add} src={add} alt=""/></a>
                </div>
                {this.renderList(this.props.data)}
            </div>
        </div>
    );
  }
}

export default MultiDataForm;
