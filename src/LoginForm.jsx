import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { nameChange, errorStatusChange, onChange } from './loginSlice';
import { fetchAuth } from "./loginSlice";

const LoginForm = () => {

    const dispatch = useDispatch();
    const {error} = useSelector(state => state.login);
    const {HOST} = useSelector(state => state.login);
    const {username} = useSelector(state => state.login);

    const inpt = document.querySelector('.login__input');
    const sbmtBtn = document.querySelector('.login__submit');

    useEffect(() => {
        onError();
    }, [error, username])

    const handleChange = (e) => {
        if(!e.target.value.match(/^user\d+$/)) {
            dispatch(errorStatusChange(true))
        } else {
            offError()
            dispatch(nameChange(e.target.value))
        }
    } 

    const onError = () => {
        if (error) {
            inpt.style.border = '1px solid red'
            sbmtBtn.setAttribute('disabled', null)
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('login__error');
            errorMessage.textContent = 'Incorrect input format';
            inpt.after(errorMessage);
            
        } else return
    }


    const offError = () => {
        if (error) {
            dispatch(errorStatusChange(false))
            sbmtBtn.removeAttribute('disabled')
            inpt.style.border = 'none'
            const errorMessage = document.querySelector('.login__error');
            errorMessage.remove();
        } else return   
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchAuth({url: `${HOST}/ru/data/v3/testmethods/docs/login`, username: username}))
    }

    return (
        <div className="login">
          <form action="" className="login__form" onSubmit={onSubmit}>
            <legend>Enter your username</legend>
            <input type="text" className="login__input" required minLength={5} onChange={handleChange}/>
            <div className="login__subtitle">In the format "userN", where N is a number.</div>
            <input type="submit" className="login__submit"/>
          </form>
        </div>
    )
}

export default LoginForm;