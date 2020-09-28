import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input, Range, ContainerJsonView, Button, Buttons } from './../'
import JSONPretty from 'react-json-pretty'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 'Jesse',
    email: 'jesse@jesse.com',
    pets: ['felix'],
    others: {}
  }
})

export default function Demo() {
  const [{ values, reset, resetInput }, { input }] = useForm(form, {
    isControlled: true
  })

  return (
    <>
      <Row justify="center">
        <Col md={12} style={{ textAlign: 'center' }}>
          <h1>Demo</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Input placeholder="Name" {...input('name', 'text')} />
          <Input placeholder="E-mail" {...input('email', 'email')} />
          <Input placeholder="Pets 0" {...input('pets.0', 'text')} />
          <Input placeholder="Pets 1" {...input('pets.1', 'text')} />
          <Input placeholder="Others" {...input('others.car.kind', 'text')} />
          <Range {...input('score', 'range')} />
          <Buttons>
            <Button type="button" onClick={reset}>
              Reset
            </Button>
            <Button type="button" onClick={() => resetInput('score')}>
              Reset Score
            </Button>
          </Buttons>
        </Col>
        <Col sm={6}>
          <ContainerJsonView>
            <JSONPretty id="json-pretty" data={values}></JSONPretty>
          </ContainerJsonView>
        </Col>
      </Row>
    </>
  )
}
