import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { create, useForm } from '@forms/useform'
import * as yup from 'yup'

const schemaValidation = yup.object().shape({
  name: yup.string().required("this field is required"),
  email: yup.string().required("this field is required").email("this field must be a valid email"),
});

const form = create({
  initialValues: {
    name: 'James S',
    email: 'james@james.com',
    password: '123456'
  },
  schemaValidation
})


const App: React.FC = () => {

  const [{ values, errors, touched }, { reset, onSubmit, input }] = useForm(form)

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" {...input('name', 'text')} />
      <Text>{touched.name && errors.name}</Text>
      <TextInput style={styles.input} placeholder="Email" {...input('email', 'email')} />
      <Text>{touched.email && errors.email}</Text>
      <TextInput style={styles.input} placeholder="Password" {...input('password', 'password')} />

      <Button title="Reset" onPress={reset} />
      <Button title="Submit" onPress={onSubmit(e => {
        // console.log(errors)
      })} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
  }
})

export default App
