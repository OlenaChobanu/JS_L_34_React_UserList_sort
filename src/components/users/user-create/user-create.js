import { useState } from "react";
import AppInput from "../../../shared/components/input-control";
import AppButton from "../../../shared/components/button";
import './user-create.css';

export default function UserCreate({
    cb, 
        user = {name: '', lastName: '', age: '', isActive: true,},
    title = 'Create User',
}){
    const [state, setState] = useState(user);

    function setProperty(e){
        const newState = {...state};
        newState[e.target.name] = e.target.value;
        setState(newState);
    }

    return (
        <div className="create-container">
            <AppInput 
                placeholder='Name' 
                name={'name'}
                value={state.name} 
                onChange={setProperty}
            ></AppInput>
            <AppInput 
                placeholder='Last Name' 
                name={'lastName'}

                value={state.lastName} 
                onChange={setProperty}
            ></AppInput>
            <AppInput 
                placeholder='Age' 
                name={'age'}
                value={state.age}  
                onChange={setProperty}
            ></AppInput>
            <AppButton cb={() => cb(state)}>{title}</AppButton>
        </div>
    )
}