import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer'>
    <div className='footer-img'></div>
    <p className='footer-item footer-p'>Copyright &copy; 2021 Gehslandia Inc.</p>
    <Link to='/' className='footer-item'><img className='footer-img' src="/caveman.png" alt="caveman" /></Link>
    <style jsx>{`
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        min-height: 75px;
        background-color: #ffa000;
        border-top: 2px solid #234465;
        border-bottom: 2px solid #234465;
      }
      .footer p {
        text-align: center;
        font-weight: bold;
        color: maroon;
        background-color: darkorange;
        font-size: 15px;
        padding: 7px 30px;
        border-radius: 20px;
      }
      .footer-img {
        width: 57px;
      }
      .footer-item {
        margin: 0 20px;
      }
      .footer-p:hover {
        color: blue;
        background-color: antiquewhite;
      }
    `}</style>
  </footer>
);

export default Footer;