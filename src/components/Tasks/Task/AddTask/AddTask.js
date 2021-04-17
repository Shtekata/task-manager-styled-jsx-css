import { useContext, useState } from "react";
import TaskFormView from "../TaskFormView";
import * as taskService from '../../../../services/taskService';
import { Context } from "../../../Core/Context";

const AddTask = ({history}) => {
    const [task, setTask] = useState({});
    const [state, dispatch] = useContext(Context);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        taskService.createEntity(task)
            .then(x => { e.target.reset(); history.push('/') })
            .catch(x => {
                if(x.message.includes('E11000 duplicate key error')) return dispatch({type:'info',payload:'The Title is already in use! Choose a different Title.'})
                dispatch({ type: 'err', payload: x.message });
            });
    };

    const onChangeHandler = (e) => {
        if (e.target.name === 'isPublic')
            return setTask(x => ({ ...x, isPublic: task.isPublic === 'on' ? '' : 'on' }))
        setTask(x => ({ ...x, [e.target.name]: e.target.value }));
    };


    return (
        <TaskFormView task={{}} onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler} />
    )
};
export default AddTask;