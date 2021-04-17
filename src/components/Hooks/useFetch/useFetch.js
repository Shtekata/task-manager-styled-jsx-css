import { useContext, useEffect, useState } from "react";
import * as taskService from '../../../services/taskService';
import { Context } from "../../Core/Context";

const useFetch = ({ initialValue, render }) => {
    const [tasks, setTasks] = useState(initialValue);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'isLoad', payload: true });
        const query = state.user ? '' : '?isPublic=true';
        taskService.getEntities(query)
            .then(x => {
                x = x === undefined ? { entities: [] } : x;
                return [{
                    title: 'To Do',
                    items: x.entities.filter(x => x.isToDo === true && x.isDeleted === false)
                }, {
                    title: 'In Progress',
                    items: x.entities.filter(x => x.isInProgress === true && x.isDeleted === false)
                }, {
                    title: 'Done',
                    items: x.entities.filter(x => x.isDone === true && x.isDeleted === false)
                }];
            })
            .then(x => {
                setTasks(x)
                dispatch({ type: 'isLoad', payload: false });
            })
            .catch(x => {
                dispatch({ type: 'err', payload: x.message });
            });
    }, [render, state.user]);

    return [tasks];
};
export default useFetch;