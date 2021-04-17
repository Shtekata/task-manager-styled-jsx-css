import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Aside from './Aside';

describe('Aside component', () => {
    it('Should not to have class active without is clicked.', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Relax'));

        expect(screen.getByText('Relax').getAttribute('class')).not.toContain('active');
    })

    it('Should add class active when is clicked', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Relax'));
        
        await waitFor(() => screen.getByText('Relax'));

        expect(screen.getByText('Relax').getAttribute('class')).toContain('active');
    })

   it('Should have basic background color', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Contact Us'));

       expect(window.getComputedStyle(screen.getByText('Contact Us'))['background-color']).not.toEqual('rgb(75, 97, 161)');
   })
    
    it('Should change background color when is clicked', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Contact Us'));
        
        await waitFor(() => screen.getByText('Contact Us'));

        expect(window.getComputedStyle(screen.getByText('Contact Us'))['background-color']).toEqual('rgb(75, 97, 161)');
    })

    it('Should have border-radius 50px', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Contact Us'));

       expect(window.getComputedStyle(screen.getByText('Contact Us'))['border-radius']).toEqual('50px');
    })
    
    it('Should have text-decoration none', async () => {
        
        const labels = [['home', 'Home'], ['tasks/add', 'Add Task'], ['old-tasks', 'Old Tasks'],
        ['about', 'About'], ['musical', 'Relax'], ['contact-us', 'Contact Us'], ['ala-bala', '404']];
        
        const onAsideItemClick = () => { };
        
        render(
            <BrowserRouter>
                <Aside labels={labels} onAsideItemClick={onAsideItemClick} />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Contact Us'));

       expect(window.getComputedStyle(screen.getByText('Contact Us'))['text-decoration']).toEqual('none');
   })
})