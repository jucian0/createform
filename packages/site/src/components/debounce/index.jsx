import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input, Range, ContainerJsonView } from './../'
import JSONPretty from 'react-json-pretty'
import { create, useForm } from '@forms/useform'

const form = create()
export default function Debounce() {
  const [{ values, reset }, { input }] = useForm(form, { debounce: 500 })

  return (
    <Row>
      <Col sm={6}>
        <Input placeholder="data1" {...input('data1', 'text')} />
        <Input
          placeholder="complexData.0.first"
          {...input('complexData.0.first', 'text')}
        />
        <Input
          placeholder="complexData.0.score"
          {...input({ name: 'complexData.0.score', type: 'number' })}
        />
      </Col>
      <Col sm={6}>
        <ContainerJsonView>
          <JSONPretty id="json-pretty" data={values}></JSONPretty>
        </ContainerJsonView>
      </Col>
    </Row>
  )
}
