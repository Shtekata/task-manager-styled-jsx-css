import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders manager', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
  const linkElement = screen.getByText(/Manager/i);
  expect(linkElement).toBeInTheDocument();
});

test('always true test', () => expect(true).toBe(true));