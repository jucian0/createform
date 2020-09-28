import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 'James',
    email: 'james@james.com',
    password: '123456'
  }
})

const App: React.FC = () => {

  const [{ values }, { reset, onSubmit }] = useForm(form)

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />

      <Button title="Reset" onPress={reset} />
      <Button title="Submit" onPress={onSubmit(e => {
        console.log(e)
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
