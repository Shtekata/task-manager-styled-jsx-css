import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OldTask from './OldTask';

describe('OldTask component', () => {
    it('Should display name', () => {
        const task = {
            title: 'Pesho',
            creator: { username: 'Gosho' },
            createdAt: '123456789123456789',
            executor: { username: 'Mosho' },
            executedOn: '123456789123456789'
        }
        render(
            <BrowserRouter>
                <OldTask task={task} />
            </BrowserRouter>
        );
        expect(document.querySelector('h2').textContent).toBe('Pesho');
    })
})