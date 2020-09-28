import { useForm, create } from '@forms/useform'
import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input, Range, ContainerJsonView, Button, Buttons } from '..'
import JSONPretty from 'react-json-pretty'

const form = create({
  initialValues: {
    data1: 'test',
    complexData: [
      {
        first: 'testComplexData',
        score: 45
      }
    ]
  }
})

export default function Controlled() {
  const [{ values, reset, onSubmit }, { input }] = useForm(form, {
    isControlled: true
  })

  return (
    <Row>
      <Col sm={6}>
        <form onSubmit={onSubmit(e => console.log(e))} onReset={reset}>
          <Input placeholder="data1" {...input('data1', 'text')} />
          <Input
            placeholder="complexData.0.first"
            {...input('complexData.0.first', 'text')}
          />
          <Input
            placeholder="complexData.0.score"
            {...input({ name: 'complexData.0.score', type: 'number' })}
          />
          <Buttons>
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </Buttons>
        </form>
      </Col>
      <Col sm={6}>
        <ContainerJsonView>
          <JSONPretty id="json-pretty" data={values}></JSONPretty>
        </ContainerJsonView>
      </Col>
    </Row>
  )
}
