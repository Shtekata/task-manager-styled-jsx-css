import DragNDrop from "./DragNDrop";

const KanbanBoard = () => {
    return (
        <div className='kanban-board'>
            <DragNDrop />
            <style jsx>{`
            .kanban-board{
                color: white;
                background-color: thistle;
                font-size: calc(10px + 2vmin);
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            `}</style>
        </div>
    )
};
export default KanbanBoard;