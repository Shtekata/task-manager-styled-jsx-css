import { useContext, useEffect, useState } from 'react';
import * as taskService from '../../../../services/taskService';
import { Context } from '../../../Core/Context';

const DetailsTask = ({match, location, history}) => {
    const [task, setTask] = useState({});
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        if (match.params._id && !task.title) {
            dispatch({ type: 'isLoad', payload: true });
            return taskService.getEntity({ _id: match.params._id }).then(x =>
            { dispatch({ type: 'isLoad', payload: false }); setTask(x.entity) })
        }
        else if(!task.title) setTask(location.state.task);
    }, [task]);

    const onClickHandler = () => history.push('/');
    return (
        <section className="create">
            <form>
                <fieldset>
                    <legend>Details Task</legend>
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <span className="input">
                            <p className='title'>{task.title}</p>
                            <span className="actions"></span>
                        </span>
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <p>{task.description}</p>
                            <span className="actions"></span>
                        </span>
                    </div>
                    <div className="field">
                        <label htmlFor="solution">Solution</label>
                        <span className="input">
                            <p>{task.solution}</p>
                            <span className="actions"></span>
                        </span>
                    </div>
                    <div className="field">
                        <label htmlFor="isPublic">Public</label>
                        <span className='span-checkbox'>
                            <input type="checkbox" className='input-checkbox' name="isPublic" id='isPublic' checked={task.isPublic} onChange={()=>{}} />
                            <span className="actions"></span>
                        </span>
                    </div>
                    <input className="button submit" type="button" value='Back' onClick={onClickHandler} />
                </fieldset>
            </form>
            <style jsx>{`
            .title {
                margin: auto;
                font-weight: bold;
                font-size: 30px;
            }
            .create{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .button {
                display: block;
                padding: 0.6rem 1rem;
                border-radius: 0.4rem;
                text-decoration: none;
                font-weight: bold;
                background: #4b61a1;
                color: rgb(255, 255, 255);
                border: none;
                font-size: 1rem;
                margin-top: 2rem;
                outline: none;
            }
            form {
                max-width: 30rem;
                flex-grow: 1;
            }
            form, form fieldset, form legend, form label, form input {
                display: block;
            }
            form fieldset, form legend {
                border: 1px solid #666;
                background: #F9F9F9;
                border-radius: 0.3rem;
                box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.1);
            }
            form fieldset {
                padding: 2.5em 2em 2em 2em;
                position: relative;
            }
            form legend {
                width: 30%;
                padding: 0.5rem 1rem;
                left: -1px;
                top: -1.4rem;
                position: absolute;
            }
            form label {
                font-weight: bold;
                margin: .5rem;
            }
            .field .input {
                display: flex;
                position: relative;
                align-items: center;
            }
            .field .input:after {
                display: block;
                content: '';
            }
            .field .input input {
                border: none;
                flex: 1 1 auto;
                padding: 0.8rem;
                outline: none;
                background: transparent;
                z-index: 2;
                order: 2;
            }
            .field .input .fas {
                z-index: 2;
                position: relative;
                padding: 0 0 0 0.8rem;
                font-size: 0.9em;
                order: 1;
            }
            .field .input input+.actions {
                display: block;
                background: #FFF;
                border: 1px solid #CCC;
                border-radius: 0.3rem;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }
            .field .input input:focus+.actions {
                border-color: #090;
            }
            .field .input input:focus+.actions+.fas {
                color: #090;
            }
            .description {
                width: 17rem;
                height: 10vh;
                padding: 2rem;
                overflow: auto;
            }
            .span-checkbox {
                width: 100%;
                display: block;
            }
            .input-checkbox {
                margin: auto;
            }
            .err-msg {
                margin-top: 15px;
            }
        `}</style>
        </section>
    )
};
export default DetailsTask;