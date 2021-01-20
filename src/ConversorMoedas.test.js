import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react';
import ConversorMoedas from './ConversorMoedas'


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


it( 'Deve renderizar o componente', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConversorMoedas />, div);
  ReactDOM.unmountComponentAtNode(div)
})