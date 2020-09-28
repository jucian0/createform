/* eslint-disable react/jsx-props-no-spreading */
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { Row, Col } from 'react-grid-system'
import React from 'react'
import { Buttons, Button, ContainerJsonView } from './../'
import 'react-datepicker/dist/react-datepicker.css'
import JSONPretty from 'react-json-pretty'
import { create, useForm, useCustomInput } from '@forms/useform'

const form = create({
  initialValues: {
    candies: {
      iceCream: [{ value: 'chocolate', label: 'Chocolate' }]
    },
    date: new Date('05/26/2020')
  }
})

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function CustomInputs() {
  // const ReactJson = require('react-json-view')
  const [{ values, reset }] = useForm(form, { isControlled: true })
  const register = useCustomInput(form)

  return (
    <Row>
      <Col lg={6}>
        <Select
          className="custom-select"
          options={options}
          {...custom('candies.iceCream.0')}
        />
        <DatePicker
          className=""
          showPopperArrow={false}
          selected={values.date}
          {...register('date')}
        />
        <Buttons>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={() => {}}>Submit</Button>
        </Buttons>
      </Col>
      <Col sm={6}>
        <ContainerJsonView>
          <JSONPretty id="json-pretty" data={values}></JSONPretty>
        </ContainerJsonView>
      </Col>
    </Row>
  )
}
