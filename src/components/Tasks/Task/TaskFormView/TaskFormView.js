import { useHistory } from "react-router";
import Message from "../../../Errors/Message";

const TaskFormView = ({ type, task, titleMsg, descriptionMsg, solutionMsg, onSubmitHandler, onChangeHandler }) => {
    const history = useHistory();
    const backToHome = () => history.push('/');
    return (
        <section className="create">
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>{type ? 'Edit Task' : 'Add new Task'}</legend>
                    <p className="field">
                        <label htmlFor="title">Title</label>
                        <span className="input">
                            <input type="text" name="title" id="title" placeholder="Title" value={task.title} onChange={onChangeHandler} />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <Message msg={titleMsg} />
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea rows="4" cols="45" type="text" name="description" id="description"
                                placeholder="Description" value={task.description} onChange={onChangeHandler}></textarea>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <Message msg={descriptionMsg} />
                    {type ?
                     <p className="field">
                        <label htmlFor="solution">Solution</label>
                        <span className="input">
                            <textarea rows="4" cols="45" type="text" name="solution" id="solution"
                                placeholder="Solution" value={task.solution} onChange={onChangeHandler}></textarea>
                            <span className="actions"></span>
                        </span>
                    </p> : true}
                    <Message msg={solutionMsg} />
                    <p className="field">
                        <label htmlFor="isPublic">Public</label>
                        <span className='span-checkbox'>
                            <input type="checkbox" className='input-checkbox' name="isPublic" id='isPublic' checked={task.isPublic} onChange={onChangeHandler} />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <div className="form-view-buttons">
                        <button className="button submit" type="submit">{type ? 'Edit' : 'Add'}</button>
                        <button className="button submit" type="button" onClick={backToHome}>Back</button>
                    </div>
                </fieldset>
            </form>
            <style jsx>{`
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
            .form-view-buttons {
                display: flex;
                justify-content: space-around;
            }
            form {
                max-width: 30rem;
                flex-grow: 1;
            }
            form, form fieldset, form legend, form label, form input, form textarea {
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
                z-index: 0;
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
            form textarea {
                border-radius: 0.5rem;
                padding: 0.8rem;
            }
            form textarea:focus {
                outline: none;
                border-color: #090;
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
export default TaskFormView;