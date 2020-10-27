import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input, Range, ContainerJsonView, Button, Buttons } from '..'
import JSONPretty from 'react-json-pretty'
import { useForm } from '@forms/useform'

const initialValues = {
  name: 'Jesse',
  email: 'jesse@jesse.com',
  score: 25
}

export default function QuickStartDemo() {
  const { register, resetForm, resetFieldValue, state } = useForm({
    initialValues,
    isControlled: true
  })

  return (
    <>
      <Row>
        <Col sm={6}>
          <Input placeholder="Name" {...register('name')} />
          <Input placeholder="E-mail" type="email" {...register('email')} />
          <Range {...register('score')} />
        </Col>
        <Col sm={6} style={{ marginTop: 10 }}>
          <ContainerJsonView>
            <JSONPretty id="json-pretty" data={state.values}></JSONPretty>
          </ContainerJsonView>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Buttons>
            <Button type="button" onClick={resetForm}>
              Reset
            </Button>
            <Button type="button" onClick={() => resetFieldValue('score')}>
              Reset Score
            </Button>
          </Buttons>
        </Col>
      </Row>
    </>
  )
}
