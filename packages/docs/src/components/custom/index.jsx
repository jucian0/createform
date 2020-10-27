/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from '@forms/useform'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { Row, Col } from 'react-grid-system'
import React from 'react'
import { Buttons, Button, ContainerJsonView } from './../'
import 'react-datepicker/dist/react-datepicker.css'
import JSONPretty from 'react-json-pretty'

const initialValues = {
  candies: {
    iceCream: [{ value: 'chocolate', label: 'Chocolate' }]
  },
  date: new Date('05/26/2020')
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function CustomInputs() {
  // const ReactJson = require('react-json-view')
  const { state, setFieldValue, setFieldTouched, resetForm } = useForm({
    isControlled: true,
    initialValues
  })

  return (
    <Row>
      <Col lg={6}>
        <Select
          className="custom-select"
          options={options}
          value={state.values?.candies?.iceCream}
          onChange={e => setFieldValue('candies.iceCream', e)}
        />
        <DatePicker
          className=""
          showPopperArrow={false}
          selected={state.values?.date}
          onChange={e => setFieldValue('date', e)}
        />
        <Buttons>
          <Button onClick={resetForm}>Reset</Button>
          <Button onClick={() => {}}>Submit</Button>
        </Buttons>
      </Col>
      <Col sm={6}>
        <ContainerJsonView>
          <JSONPretty id="json-pretty" data={state.values}></JSONPretty>
        </ContainerJsonView>
      </Col>
    </Row>
  )
}
