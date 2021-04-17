const About = () => (
    <div className='about'>
        <h1 className='about-h1'>This is Kanban Management System</h1>
        <h2 className='about-h2'>Here are some details about working with the application and its functionalities:</h2>
        <h3 className='about-h3'>Available Actions Guest Users:</h3>
        <h4 className='about-h4'>In the project, you can:</h4>
        <p className='about-p'>- register, but you have some validation properties.</p>
        <p className='about-p'>- login, if you already registered.</p>
        <p className='about-p'>- view all public tasks.</p>
        <h3 className='about-h3'>Available Actions Logged In Users</h3>
        <h4 className='about-h4'>In the project, you can:</h4>
        <p className='about-p'>- logout.</p>
        <p className='about-p'>- view all tasks.</p>
        <p className='about-p'>- create a new task.</p>
        <p className='about-p'>- move tasks only one category left or right, with keep pressed left mouse button.</p>
        <p className='about-p'>- move to a done category only if the task has a solution.</p>
        <p className='about-p'>- edit task, when double click on the task or on the corresponding button.</p>
        <p className='about-p'>- view details of the task, when click on the details task button.</p>
        <p className='about-p'>- delete task, when click on the delete task button.</p>
        <p className='about-p'>- navigate to 'Old Tasks' view.</p>
        <p className='about-p'>- delete tasks.</p>
        <h3 className='about-h3'>Additional Clarifications:</h3>
        <p className='about-p'>When you click on the email in the navigation bar, you go to the profile page.</p>
        <p className='about-p'>There you can add additional information about you.</p>
        <p className='about-p'>Of course there is also a page for wrong paths.</p>
        <p className='about-p'>Deleted tasks in 'Done' category goes to 'Old Tasks' view.</p>
        <p className='about-p'>In 'Old Tasks' view are all successfully finished tasks, with solution, executor and execution time.</p>
        <p className='about-p'>This app have responsive design and can be use with mobile phone.</p>
        <p className='about-p'>Are used styled-jsx, Formik, Yup, useReducer, HOC(guarded routes), Hook(using fetch), Error Boundary which fetches to server, moking and test with msv server, deployed on Heroku</p>
        <strong>Note: this is a free to use project!</strong>
        <p className='about-p'>Enjoy it!</p>
        <style jsx>{`
        .about-h1 {
            text-align: center;
            color: #234465;
            text-decoration: underline;
            margin: 2rem 1rem 2rem 1rem;
            font-size: 2.7rem;
        }
        .about-h2 {
            margin: 2rem 1rem 2rem 1rem;
            font-size: 1.9rem;
        }
        .about-h3 {
            margin: 2rem 1rem 2rem 1rem;
            font-size: 1.5rem;
        }
        .about-h4 {
            margin: 2rem 1rem 2rem 1rem;
            font-size: 1.3rem;
        }
        .about-p {
            text-align: left;
            margin: 1rem 1rem 1rem 10rem;
            font-size: 1.1rem;
        }
        `}</style>
    </div>
);

export default About;