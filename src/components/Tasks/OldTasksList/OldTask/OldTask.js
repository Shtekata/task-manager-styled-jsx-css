const OldTask = ({ task: x }) => (
    <div className='task'>
        <img className='task-img' src="/skull.png" alt="skull" />
        <h2 className='task-title'>{x.title}</h2>
        <h3 className='old-task-h3'>Description</h3>
        <p className='description'>{x.description}</p>
        <h3 className='old-task-h3'>Solution</h3>
        <p className='solution'>{x.solution}</p>
        <h3 className='isPublic'>Public: {x.isPublic?'Public Task':'Private Task!'}</h3>
        <div className='task-div'>
            <div className="old-task-author">
                <small>Author: </small> {x.creator.username}
            </div>
            <div className="old-task-createdAt">
                <small>Created at: </small> {`${x.createdAt.slice(0,10)} ${x.createdAt.slice(11,19)}`}
            </div>
        </div>
        <div className='task-div'>
            <div className="old-task-executor">
                <small>Executor: </small> {x.executor.username}
            </div>
            <div className="old-task-executedOn">
                <small>Executed on: </small> {`${x.executedOn.slice(0,10)} ${x.executedOn.slice(11,19)}`}
            </div>
        </div>
        <style jsx>{`
            .task {
                border: 2px solid #234465;
                margin-bottom: 35px;
                border-radius: 5px;
            }
            .task-img{
                width: 32px;
                height: 32px;
                padding: 3px 0 0 3px;
            }
            .task-div{
                padding-right: 1%;
                margin-bottom: 0.5%;
                display: flex;
                justify-content: space-between;
            }
            .task-title{
                display: inline-block;
                text-align: center;
                width: 90%;
                padding: 1.2rem 0 0 0;
            }
            .description {
                word-wrap: break-word;
                padding: 0 10px;
                font-style: italic;
                margin: 1% auto;
                ;
            }
            .solution {
                padding: 0 10px 1rem 10px;
            }
            .old-task-author, .old-task-createdAt {
                padding: 1rem;
            }
            .old-task-executor, .old-task-executedOn {
                padding: 1rem 1rem 2rem 1rem;
            }
            .old-task-h3 {
                text-align: left;
                padding: 0 3rem;
            }
            .isPublic {
                text-align: left;
                margin: .5rem 0 1rem 3rem;
            }
        `}</style>
    </div>
);

export default OldTask;