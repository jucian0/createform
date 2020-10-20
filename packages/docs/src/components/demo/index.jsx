import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Input,Range, ContainerJsonView, Button, Buttons} from './../'
import JSONPretty from 'react-json-pretty';
import {useFormTest} from '@forms/useform'

const initialValues = {
   name:"Jesse",
   email:"jesse@jesse.com",
   pets:["felix"],
   others:{
   },
}

export default function Demo(){
   const {register,resetForm,resetFieldValue ,state}= useFormTest({initialValues, isControlled:true})

   return (
      <>
         <Row justify="center">
            <Col md={12} style={{textAlign:"center"}}><h1>Demo</h1></Col>
         </Row>
         <Row>
            <Col sm={6}>
            <Input placeholder="Name" {...register("name")}/>
            <Input placeholder="E-mail" {...register("email", "email")}/>
            <Input placeholder="Pets 0" {...register("pets.0")}/>
            <Input placeholder="Pets 1" {...register("pets.1")}/>
            <Input placeholder="Others" {...register("others.car.kind")}/>
            <Range {...register("score", "range")}/>
            <Buttons>
                  <Button type="button" onClick={resetForm}>Reset</Button>
                  <Button type="button" onClick={()=>resetFieldValue('score')}>Reset Score</Button>
               </Buttons>
            </Col>
            <Col sm={6}>
               <ContainerJsonView>
                  <JSONPretty id="json-pretty" data={state.values}></JSONPretty>
               </ContainerJsonView>
            </Col>
         </Row>
      </>
   )
}