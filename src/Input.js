import React from 'react'


const Input=(props)=>{
    let inputElement=null;
    
    if(props.inValid && props.shouldValidate && props.touched){
        // console.log(props.inValid);
      
    }
    switch(props.elementType){
        case('input'):
        if (props.elementConfig.type==="checkbox") {
            inputElement=  <input  {...props.elementConfig} checked={props.checked} onChange={props.changed} type="checkbox" />
        }else{
            inputElement=<input className="form-control"  {...props.elementConfig} value={props.value}  onChange={props.changed}/>
        }
       
        break;
        case('textarea'):
        inputElement=<textarea className="form-control"  {...props.elementConfig} onChange={props.changed}>{props.value}</textarea>
        break;
        case('select'):
        (inputElement=<select className="form-control" value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map(option=>{
                return <option key={option.value} value={option.value}>{option.label}</option>
            })}
        </select>)
        break;
        default:
        inputElement=<input className="form-control"  {...props.elementConfig} value={props.value} onChange={props.changed}/>

    }


    return(
        <div>
            <label>{props.label}</label>
            {inputElement}

        </div>
    )
}

export default Input;