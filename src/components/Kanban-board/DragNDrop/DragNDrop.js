import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Core/Context/Context";
import * as taskService from '../../../services/taskService';
import { useHistory } from "react-router";
import useFetch from "../../Hooks/useFetch";

const DragNDrop = () => {
    const [render, setRender] = useState(false);
    const [data] = useFetch({initialValue: [], render });
    const [list, setList] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [startItem, setStartItem] = useState(null);

    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        setList(data);
    }, [data])

    const dragItem = useRef();
    const currentItem = dragItem.current;
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params.cord;
        dragNode.current = e.target;
        setStartItem({ i: params.cord.i, done: params.done });
        setTimeout(() => setDragging(true), 0);
        dragNode.current.addEventListener('dragend',
            () => handleDragEnd({ _id: params._id, col: params.cord.i, row: params.cord.ii }));
    };

    const handleDragEnter = (e, params) => {
        let rowDiff = Math.abs(startItem.i - params.i);
        if ((currentItem.i !== params.i || currentItem.ii !== params.ii) && (rowDiff === 1 || rowDiff === 0)) {
            if (params.i === 2 && !startItem.done) return dispatch({ type: 'info', payload: 'You have to write solution first!' });
            setList(x => {
                let newList = JSON.parse(JSON.stringify(x));
                newList[params.i].items.splice(params.ii, 0, newList[currentItem.i].items.splice(currentItem.ii, 1)[0]);
                dragItem.current = params;
                return newList;
            })
        }
    }

    const handleDragEnd = ({ _id, col, row }) => {
        if (dragItem.current !== null && (col !== dragItem.current.i || row !== dragItem.current.ii)) {
            taskService.shiftEntity({ _id, col: dragItem.current.i, row: dragItem.current.ii })
                .catch(x => {
                    !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                    dispatch({ type: 'err', payload: x.message });
                });
        };
        if (dragNode.current !== null) dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setDragging(false);
        setStartItem(null);
    };

    const getStyles = (params) => {
        if (currentItem.i === params.i && currentItem.ii === params.ii) return 'current dnd-item';
        return 'dnd-item';
    }

    const onDoubleClickHandler = ({ _id }) => {
        if (!state.user) return dispatch({ type: 'info', payload: 'You have first to Log In!' });
        history.push(`/tasks/edit/${_id}`);
    };

    const onEditClickHandler = ({ _id }) => {
        if (!state.user) return dispatch({ type: 'info', payload: 'You have first to Log In!' });
        history.push(`/tasks/edit/${_id}`);
    };

    const onDetailsClickHandler = ({ _id }) => {
        if (!state.user) return dispatch({ type: 'info', payload: 'You have first to Log In!' });
        history.push(`/tasks/details/${_id}`);
    };

    const onDeleteHandler = ({ _id, row }) => {
        if (!window.confirm('Are you sure you want to delete the task?')) return;
        if (row !== 2) return taskService.deleteEntity(_id)
            .then(x => render ? setRender(false) : setRender(true))
            .catch(x => {
                !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                dispatch({ type: 'err', payload: x.message });
            });
        taskService.partiallyEditEntity({ _id, isDeleted: true, user: state.user })
         .then(x => render ? setRender(false) : setRender(true))
            .catch(x => {
                !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                dispatch({ type: 'err', payload: x.message });
            });
    }

    return (
        <Fragment>
            <div className='drag-and-drop'>
                {list.map((x, i) => (
                    <div
                        key={x.title}
                        className="dnd-group"
                        onDragEnter={dragging && !x.items.length ? (e) => handleDragEnter(e, { i, ii: 0 }) : null}
                    >
                        <div className="group-title">{x.title}</div>
                        {x.items.map((y, ii) => (
                            <div
                                key={y._id}
                                draggable
                                className={dragging ? getStyles({ i, ii }) : "dnd-item"}
                                onDragStart={(e) => handleDragStart(e, { cord: { i, ii }, _id: y._id, done: y.solution })}
                                onDragEnter={dragging ? (e) => handleDragEnter(e, { i, ii }) : null}
                                onDoubleClick={e => onDoubleClickHandler({ _id: y._id })}
                            >
                                <p className='dnd-item-title'>{y.title}</p>
                                <p className='dnd-item-description'>{y.description.length > 100 ? y.description.slice(0, 100) + '...' : y.description}</p>
                                <div className="dnd-buttons">
                                    <button className='dnd-button dnd-button-edit' onClick={()=>onEditClickHandler({ _id: y._id })}>Edit</button>
                                    <button className='dnd-button dnd-button-details' onClick={()=>onDetailsClickHandler({ _id: y._id })}>Details</button>
                                    <button className='dnd-button dnd-button-delete' onClick={()=>onDeleteHandler({_id: y._id, row: i})}>Delete</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        ))}
                    </div>
                
                ))}
            </div>
            {list.length>0 ?
                <div className="div-dnd-help">
                    <p className="dnd-help">By holding down the mouse button with a single click you can move the task.</p>
                    <p className="dnd-help">With double click on left mouse button you can edit task.</p>
                </div>
                :
                true
            }
            <style jsx>{`
            .drag-and-drop{
                padding: 1rem .5rem 0 .5rem;
                display: grid;
                gap: 1rem;
                align-items: baseline;
                grid-template-columns: repeat(auto-fill, 32%);
                justify-content: center;
            }
            .dnd-group{
                background-color: rgb(247, 225, 240);
                border-radius: 5px;
                padding: .5rem;
            }
            .group-title{
                color: brown;
                text-align: left;
                margin-bottom: .5rem;
                font-size: 1.5rem;
            }
            .dnd-item{
                color: blue;
                background-color: white;
                min-height: 150px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            .dnd-item:hover{
                cursor: pointer;
            }
            .dnd-item *{
                font-size: 1.2rem;
            }
            .dnd-item:not(:last-of-type){
                margin-bottom: .5rem;
            }
            .dnd-item-title {
                font-weight: bold;
                font-weight: bold;
                padding: 1.1rem 0;
            }
            .dnd-item-description {
                font-size: 1rem;
                padding: 0.4rem 1rem;
            }
            .current{
                background-color: mistyrose;
            }
            .dnd-help {
                font-size: 1.2rem;
            }
            .div-dnd-help {
                display: flex;
                justify-content: space-around;
                padding: 1rem;
            }
            .dnd-buttons {
                display: flex;
                width: 100%;
                justify-content: space-around;
            }
            .dnd-button {
                font-size: 0.8rem;
                padding: 0.3rem 0.6rem;
                border-radius: 15px;
                margin-bottom: 0.5rem;
                background-color: antiquewhite;
                outline: none;
                border-color: aliceblue;
            }
            .dnd-button:hover {
                cursor: pointer;
            }
            .dnd-button-edit {
                color: seagreen;
            }
            .dnd-button-delete {
                color: brown;
            }
            .dnd-button-details {
                color: goldenrod;
            }
            `}</style>
        </Fragment>
    )
};
export default DragNDrop;