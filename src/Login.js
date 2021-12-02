import React, {Component} from 'react'

import axios from 'axios'
import Input from './Input'




class Login extends Component{

    state = {
        controls: {
            email: {
                label: 'پست الکترونیک',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'پست الکترونیک'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'رمز عبور',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'رمز عبور'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            rememberMe: {
                label: 'مرا به خاطر بسپار',
                elementType: 'input',
                elementConfig: {
                    type: 'checkbox',
                  
                },
                checked: false,
               
            },
           
        },
        isSignUp:true,
    
  
    }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const user = rememberMe ? localStorage.getItem('email') : '';
        const pass = rememberMe ? localStorage.getItem('password') : '';

//use setState for nested states

this.setState(prevState => ({ 
    ...prevState,
    controls: {
        ...prevState.controls,
        email: {
            ...prevState.controls.email, 
            value:user
        },
        password:{
            ...prevState.controls.password,
            value:pass
        },
        rememberMe:{
            ...prevState.controls.rememberMe,
            checked:rememberMe
        }
    }
}))
        
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    // checkboxFunc(cheked){
    //     if (cheked) {
    //         cheked=false
            
    //     }else{
    //         cheked=true
    //     }
    //     return cheked
    // }
    inputHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
               checked:event.target.checked,
            //    this.checkboxFunc(this.state.controls.rememberMe.checked),

                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
                
            }
        }
        // const input = event.target;
        // const value = input.type === 'checkbox' ? input.checked : input.value;
        console.log(this.state.controls.rememberMe.checked);
// if (updatedControls.rememberMe.checked) {
    
// }
        this.setState({controls: updatedControls})

   
    }
   
    submitHandler = ( event ) => {
        event.preventDefault();
       
            
            const authData = {
                email:this.state.controls.email.value,
                password:this.state.controls.password.value,
                returnSecureToken: true
            };
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAMficc34B8_AdPfNoy2c-KG4NVVPbswA';
            if (!this.state.isSignUp) {
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAMficc34B8_AdPfNoy2c-KG4NVVPbswA';
            }
            axios.post(url, authData)
                .then(response => {
                    console.log(response);
                    
                })
                .catch(err => {
                    console.log(err);
                   
                });
               
                localStorage.setItem('rememberMe',this.state.controls.rememberMe.checked);
                localStorage.setItem('email', this.state.controls.rememberMe.checked ? this.state.controls.email.value : '');
                localStorage.setItem('password', this.state.controls.rememberMe.checked ? this.state.controls.password.value : '');
       
        // this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp );
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{isSignUp:!prevState.isSignUp}
        })
    }


    render(){
        
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        let form=(
            <form  className={'col-sm-6 ml-auto mr-auto'} onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement=>{
                    return<Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    checked={formElement.config.checked}
                    label={formElement.config.label}
                    key={formElement.id}
                    inValid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event)=>this.inputHandler(event, formElement.id)}
                    
                    />
                })}
                <button  className="btn-success ml-auto mr-auto mb-5">ورود</button>
            </form>
            
    )
     
        
        return(
           
            <div>
              
                {form}
                <button
                onClick={this.switchAuthModeHandler}
                className="btn-warning ml-auto mr-auto mb-5">نمایش فرم {this.state.isSignUp ? 'ورود' : 'ثبت نام'}</button>
            </div>
        )  
    }
}


export default Login;