import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input, Range, ContainerJsonView, Button, Buttons, Checkbox } from '..'
import * as yup from 'yup'
import JSONPretty from 'react-json-pretty'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 'jesse',
    email: 'jesse@jesse.com',
    pets: ['felix'],
    accept: false
  },
  schemaValidation
})

const schemaValidation = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('This field must be a valid e-mail')
    .required('This field is required'),
  pets: yup.array(yup.string().required('This field is required')),
  accept: yup.bool().oneOf([true], 'Field must be checked')
})

export default function Validation() {
  const [
    { values, reset, onSubmit, errors, touched },
    { input }
  ] = useForm(form, { isControlled: true })

  return (
    <Row>
      <Col sm={4}>
        <span>Form</span>
        <form onSubmit={onSubmit(e => console.log(e))} onReset={reset}>
          <Input
            placeholder="Name"
            {...input('name', 'text')}
            error={touched.name && errors.name}
          />
          <Input
            placeholder="E-mail"
            {...input('email', 'email')}
            error={touched.email && errors.email}
          />
          <Input
            placeholder="Pets"
            {...input('pets.0', 'text')}
            error={
              touched.pets && touched.pets[0] && errors.pets && errors.pets[0]
            }
          />
          <Checkbox
            placeholder="Accept"
            {...input('accept', 'checkbox')}
            error={touched.accept && errors.accept}
          />
          <Buttons>
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </Buttons>
        </form>
      </Col>
      <Col sm={4}>
        <span>Values</span>
        <JSONPretty id="json-pretty" data={values}></JSONPretty>
      </Col>
      <Col sm={4}>
        <span>Errors</span>
        <JSONPretty id="json-pretty" data={errors}></JSONPretty>
      </Col>
    </Row>
  )
}
