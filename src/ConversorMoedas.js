

import React, { useState } from 'react'
import './ConversorMoedas.css';
import { Jumbotron, Form, Button, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faFileExport } from '@fortawesome/free-solid-svg-icons'
import ListarMoedas from './ListarMoedas'
import axios from 'axios'


function ConversorMoedas() {

  //usando o Axios para requisoes http 
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=236a579ddcc708789b044bf4c54d9575'

  const [ valor, setValor ] = useState('1')
  const [ moedaDe, setMoedaDe] = useState('BRL')
  const [ moedaPara, setMoedaPara ] = useState( 'USD'); 
  const [ exibirSpinner, setExibirSpinner ] = useState(false);
  const [ formValidado , setFormValidado] = useState(false)
  const [ exibirModal, setExibirModal] = useState(false)
  const [ resultadoConversao, setResultadoConversao] = useState('');
  const [ exibirMensagemErro, setExibirMensagemErro] = useState( false)


  
  function handleValor( event ) {
    //atualizar o estado do valor e remove tudo o que noa for numero
    setValor(event.target.value.replace(/\D/g, ''))

  }

  function handleMoedaDe( event ) {
    setMoedaDe( event.target.value )
    
  }

  function handleMoedaPara( event ) {
    setMoedaPara(event.target.value )

  }

  function handleFecharModal( event ) {
    setValor('1')
    setMoedaDe('BRL')
    setMoedaPara('USD')
    setFormValidado(false)
    setExibirModal(false)
  }

  function converter( event ) {
    //quebra o evento de reload da pagina 
    event.preventDefault()
    //faz a validação do form
    setFormValidado( true )

    if(event.currentTarget.checkValidity() === true) {
      //TODO implmentar a chamada ao Fixer.IO
      
      // Fazendo requisao 

      // exibi o Spinner para evitar multiplos cliques
      setExibirSpinner( true )
      
      //requisicao do tipo GET com promisses
      //
      axios.get(FIXER_URL)
      .then(res => {
        const cotacao = obterCotacao(res.data)
        if( cotacao) {
          setResultadoConversao( `${valor} ${moedaDe} = ${cotacao} ${moedaPara}` )
          setExibirModal(true)
          setExibirSpinner( false )
          setExibirMensagemErro(false)
        
        }else{
          exibirErro();

        }

      })
      .catch(err => exibirErro())
    }
  }

  function obterCotacao( dadosCotacao ) {
    if(!dadosCotacao || dadosCotacao.success !== true ) {
      return false;
    }

    const cotacaoDE = dadosCotacao.rates[moedaDe]
    const cotacaoPara = dadosCotacao.rates[moedaPara]
    const cotacao = (1 / cotacaoDE * cotacaoPara) * valor 
    
    return cotacao.toFixed(2)


  }

  function exibirErro() {
    setExibirMensagemErro(true)
    setExibirSpinner( false )
  }

  return(
    //react sempre espera um bloco de codigo inicio e fim
    
    <div>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={exibirMensagemErro}>Erro obtendo dados de conversão, tente novamente.</Alert>
      <Jumbotron>
    
      {/* "noValidade" -> Indicate that the form is not to be validated on submit: */}
        <Form onSubmit={converter} noValidade validated={formValidado}>
          
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0" value={valor} onChange={handleValor}required />
            </Col>
            
            <Col sm="3">
            <Form.Control as="select" value={moedaDe} onChange={handleMoedaDe}>
                <ListarMoedas />
            </Form.Control>
            </Col>
           
            <Col sm="1" className="text-center" style={{paddingTop:'5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>

          <Col Col sm="3">

            <Form.Control as="select" value={moedaPara} onChange={handleMoedaPara}>
            <ListarMoedas />
            </Form.Control>

          </Col>
          <Col sm="2">
          <Button variant="success" type="submit">
        
          {/* escondendo spinner com condicao ternario */}
            <span className={exibirSpinner ? null : 'hidden'}>
              <Spinner animation="border" size="sm"/>
            </span>
            <span className={exibirSpinner ? 'hidden' : null}>
              Converter
            </span>
          </Button>

          </Col>

          </Form.Row>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
           {resultadoConversao}
          </Modal.Body>
        
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>Nova Conversão</Button>
          </Modal.Footer>
       </Modal>

      </Jumbotron>

    </div>
  ) 
}

export default ConversorMoedas
