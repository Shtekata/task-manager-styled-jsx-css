import { useContext, useEffect, useState } from "react";
import TaskFormView from "../TaskFormView";
import * as taskService from '../../../../services/taskService';
import { Context } from "../../../Core/Context";

const EditTask = ({ match, history }) => {
    const [task, setTask] = useState({});
    const [state, dispatch] = useContext(Context);

    useEffect(() => taskService.getEntity({ _id: match.params._id })
        .then(x => {
            x.entity.isPublic = x.entity.isPublic === true ? 'on' : '';
            setTask(x.entity)
        })
        .catch(x => dispatch({ type: 'err', payload: x.message })), [match]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        taskService.editEntity(task)
            .then(x => { e.target.reset(); history.push({ pathname: `/tasks/details/${task._id}`, state: { task: x.entity } }) })
            .catch(x => {
                 !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                dispatch({ type: 'err', payload: x.message });
            });
    };
    
    const onChangeHandler = (e) => {
        if (e.target.name === 'isPublic')
            return setTask(x => ({ ...x, isPublic: task.isPublic === 'on' ? '' : 'on' }))
        setTask(x => ({ ...x, [e.target.name]: e.target.value }));
    };

    return (
        <TaskFormView type='edit' task={task} onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler} />
    )
};
export default EditTask;