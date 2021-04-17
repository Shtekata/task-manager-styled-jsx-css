const Music = () => (
    <div className='music'>
        <h1 className='music-h1'>Music Page</h1>
        <h2 className='music-h2'>This page is for relaxing in the moments when you are overworked, there are no ideas and you want new inspiration to come to you! :) </h2>
        <h1><iframe title='music' width="984" height="407" src="https://www.youtube.com/embed/BheqVR4zr84" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h1>
         <style jsx>{`
        .music-h1 {
            text-align: center;
            color: #234465;
            text-decoration: underline;
            margin: 1% 0 2% 0;
        }
        .music-h2 {
            margin: 2.5rem;
        }
        `}</style>
    </div>
);

export default Music;