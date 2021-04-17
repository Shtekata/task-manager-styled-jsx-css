import { useContext, useEffect, useState } from 'react';
import * as taskService from '../../../services/taskService';
import { Context } from '../../Core/Context';
import Aside from '../../Shared/Aside';
import Task from './OldTask';

const OldTasksList = () => {

    const [tasks, setTasks] = useState([]);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [labels, setLabels] = useState([]);

    const [state, dispatch] = useContext(Context);


    useEffect(() => {
        dispatch({ type: 'isLoad', payload: true });
        taskService.getEntities('?isDeleted=true').then(x => {
            setTasks(x.entities);
            if (currentTasks.length === 0) setCurrentTasks(x.entities);
            setLabels([['old-tasks/all', 'All'], ...x.entities.map(x => [`old-tasks/${x.title}`, x.title])]);
            dispatch({ type: 'isLoad', payload: false });
        });
    }, []);

    const onAsideItemClickApp = (title) => {
        console.log(title)
        if (title === 'All') return setCurrentTasks(tasks);
        const task = tasks.filter(x => x.title === title);
        setCurrentTasks(task);
    };

    return (
        <div className='article'>
            <div className='task-list'>
                <h1 className='title'>Old Tasks</h1>
                <div>
                    {currentTasks.map(x => <Task key={x._id} task={x} />)}
                </div>
            </div>
            <Aside onAsideItemClick={onAsideItemClickApp} labels={labels} />
            <style jsx>{`
            .task-list {
               width: 100%;
            }
            .title {
                text-align: center;
                color: #234465;
                text-decoration: underline;
                margin: 1% 0 2% 0;
            }
            .article {
                display: flex;
                height: 100%;
            }
            `}</style>
        </div>
    );
};

export default OldTasksList;