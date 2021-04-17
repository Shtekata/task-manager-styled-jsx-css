const ContactUs = () => (
    <div className='contact-us'>
        <div>
            <h1 className='contact-us-h1'>Contact Us Page</h1>
            <h2 className='contact-us-h2'>Us, this is me Asen Geshev !</h2>
            <h3 className='contact-us-h3'>If you want to contact me, here is my contact information:</h3>
            <h4 className='contact-us-h4'>Email: gesheval@gmail.com</h4>
            <h4 className='contact-us-h4'>Telefon: +359 887 65 85 29</h4>
            <h2 className='contact-us-git'>I have other ready-made projects that you can view on my github profile at the following address: https://github.com/Shtekata</h2>
        </div>
        <style jsx>{`
        .contact-us-h1 {
            text-align: center;
            color: #234465;
            text-decoration: underline;
            padding: 6rem 0 1rem 0;
        }
        .contact-us-h2 {
            padding: 1rem;
        }
        .contact-us-h3 {
            margin: .5rem 0 2rem 0;
            font-size: 1.3rem;
        }
        .contact-us-h4 {
            margin: 1rem;
            font-size: 1.1rem;
        }
        .contact-us-git {
            padding: 3rem 24rem;
        }
        `}</style>
    </div>
);

export default ContactUs;