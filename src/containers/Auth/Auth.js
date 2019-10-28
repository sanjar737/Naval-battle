import React from 'react';
import cssClasses from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


function Auth({ form, onChangeInputHandler, onSubmitHandler }) {

    function controlList() {
        const controls = form.controls
        const controlList = Object.keys(controls).map((control, index) => {
            return (
                <Input key={index}
                    error={controls[control].error}
                    label={controls[control].label}
                    name={controls[control].name}
                    onChange={(e) => onChangeInputHandler(e, control)}
                />
            )
        })

        return controlList
    }



    return (
        <div className={cssClasses.Auth}>
            <form onSubmit={onSubmitHandler}>
                <h1>Naval Battle</h1>
                {controlList()}
                <Button type='submit' disabled={!form.valid}>Ok</Button>
            </form>
        </div>
    )
}

export default Auth