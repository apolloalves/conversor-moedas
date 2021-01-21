import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react';
import ConversorMoedas from './ConversorMoedas'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//switch de testes com describe 
describe( 'teste do componente de conversao de moedas', () => {

  it( 'Deve renderizar o componente', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConversorMoedas />, div);
    ReactDOM.unmountComponentAtNode(div)
    
  })

  it('deve simular uma conversão de moedas', async () => {

    const { findByTestId, getByTestId } = render(<ConversorMoedas/>)
    axiosMock.get.mockResolvedValueOnce( {
      data: {success: true, rates: { BRL: 4.564292, USD: 1.101049}}
    
    })

    //*evento de click
    fireEvent.click( getByTestId('btn-converter'))
    
    //await aguardar a chamada do axios e o retorno 
    const modal = await findByTestId('modal')

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextContent('1 BRL = 0.24 USD')
    
  })

})
