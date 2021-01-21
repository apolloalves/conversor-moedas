

import React, { useState } from 'react'
import './ConversorMoedas.css';
import { Jumbotron, Form, Button, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ListarMoedas from './ListarMoedas'


function ConversorMoedas() {

  const [ valor, setValor ] = useState('1')

  function handleValor( event ) {
    //atualizar o estado do valor e remove tudo o que noa for numero
    setValor(event.target.value.replace(/\D/g, ''))

  }

  return(
    //react sempre espera um bloco de codigo inicio e fim
    
    <div>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={false}>Erro obtendo dados de conversão, tente novamente.</Alert>
      <Jumbotron>
        <Form>
          
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0" value={valor} onChange={handleValor}required />
            </Col>
            
            <Col sm="3">
            <Form.Control as="select" custom>
                <ListarMoedas />
            </Form.Control>
            </Col>
           
            <Col sm="1" className="text-center" style={{paddingTop:'5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>

          <Col Col sm="3">

            <Form.Control as="select" custom>
            <ListarMoedas />
            </Form.Control>

          </Col>
          <Col sm="2">
          <Button variant="success" type="submit">
            <Spinner animation="border" size="sm"/>Converter
          </Button>

          </Col>

          </Form.Row>
        </Form>
        <Modal show={false}>
          
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            Resultado da conversão aqui...
          </Modal.Body>
        
          <Modal.Footer>
            <Button variant="success">Nova Conversão</Button>
          </Modal.Footer>
       </Modal>

      </Jumbotron>

    </div>
  ) 
}

export default ConversorMoedas
