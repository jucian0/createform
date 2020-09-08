![Logo](img/logo3.png)
<h1 align="center">Welcome to useForm 👋</h1>


[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useform/blob/master/LICENSE) [![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/Jucian0/useform/tree/master/test) ![npm bundle size](https://img.shields.io/bundlephobia/min/useforms) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/useforms) [![npm version](https://img.shields.io/badge/npm-v1.0-ff69b4)](https://www.npmjs.com/package/useforms) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/Jucian0/useform&hashtags=reactjs,hook,javascript,forms)

> useFom provide a way to create complex forms easily.

### 🏠 [Homepage](https://useform.org)

### ✨ [Demo](https://codesandbox.io/s/useform-2u2ju)

<a href="https://codesandbox.io/s/useform-2u2ju">
  <img width="150" alt="Example in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Install

```sh
yarn add useforms
```
```sh
npm install useforms
```

## Run tests

```sh
yarn test
```

## Description


Forms are an important part of web applications, and with react it's possible to create greats forms,  
react hooks are a game-changer when we think about forms, with hooks is very simple to create forms, and you can go on without libraries.  
But when we wanna complex forms with many validations and complex objects with several layer and properties is appropriate to use a library form to manager the state of inputs and its validations.  
For this reason, there is useForm, with useForm we can make greats forms and complex validations with less line code.

UseForm provides a way to create complex forms easily, this hook returns an object of values ​​in the same shape that it receives, this is possible using dot notation. Therefore, 
it does not matter if the object is complex or has many properties or array, 
the result is the same. This process turns very easily to create forms from an object with several layers, 
the same layers and properties are replicated in the final object, 
this approach prevents you to type more code to convert an object from form to backend object type. The same process is realized with errors object and touched object.

## Usage

```jsx
  import {useform} from "useforms"

  const initialValues = {
    first:"one",
    second:{
      other:[
        {
          x:12
        }
      ]
    }
  }

    const finalValues = {
    first:"one",
    second:{
      other:[
        {
          x:12
        }
      ]
    }
  }

  <input {...input("second.other.0.x", "number")}/>
                    /*or*/
  <input {...input({name:"second.other.0.x", type:"number"})}/>
  
```


Don't need the tag form, unless if you want to use uncontrolled inputs.

By default react data forms work with Yup Validation.
 - Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformations.


## Get Started

The first example of creating forms is a controlled form, useForm receive an initialObject with optional some properties:

  * `onChange`: Defines when form state will update.
  * `debounce`: Defines a form with debounce values.
  * `initialValues`: Defines initial state of form.
  * `validations`: Receives a validation schema yup.

```jsx
  import {useForm} from 'useforms'

  const initialValues = {
      name:"Jesse",
      email:"jesse@jesse.com",
      pets:["felix"]
  }

  function ControlledForm(){

      const [{values, reset},{input}] = useForm({onChange:true, initialValues})
      
      return (
        <>
            <input {...input("email", "email")}/>
                    /* or  */
            <input {...input({name:"email", type:"email", required:true})}/>

            <input {...input("name" ,"name")}/>            
            <input {...input("pets.0" ,"text")}/>
            <input {...input("pets.1" ,"text")}/>         
            <input {...input("accept", "checkCol")}/>
            <input value="1" {...input("others.radio", "radio")}/>First
            <input value="2" {...input("others.radio", "radio")}/>Second
            <input value="3" {...input("others.radio", "radio")}/>Third
        </>   
      )
  }
```
<br/>

<a href="https://codesandbox.io/s/useform-2u2ju">
  <img width="150" alt="Example in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

In this case I created a form without a `validation` and with ` onChange` option, it is worth mentioning that useForm by default works with uncontrolled inputs. 

Uncontrolled inputs provide better performance because they drastically reduce the amount of time render component.
<br/>

`useForm` provide a `input` function, this function as a link with input and a object property of form state.

<br/>

| properties 	| description                                                                                                                                                                                   	|
|------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `onSubmit`   	| is a void function that accepts a function as a parameter, this function is used when you choose uncontrolled inputs                                                                          	|
| `setInput`      	| is a void function that change the current value of a specific input, this function receives two parameters, the first parameter is the name of input and the second is de new value.                                                                                                                                     	|
| `setInputs`      	| is a void function that change the current state of form, this function receives the new value of form as a parameter.                                                                                                                                   |
| `reset`      	| is a void function that reset form for the initial state.                                                                                                                                     	|
| `resetInput` 	| is a void function that resets an input for the initial state. That function receives the input name as a parameter.                                                                          	|
| `values`     	| object of values your form.                                                                                                                                                                   	|
| `input`      	| is a function that returns properties for the input component, this function receives the name and type as a parameter or an object with input properties.                                         	|
| `custom`     	| is a function that returns properties for custom input component like React Select or React Datepicker, this function receives the name and type as a parameter or an object with input properties 	|
| `errors`     	| object of errors your form. 	|
| `touched`     | object with all inputs present in your form with the boolean value.	|

<br/>

## useValidation
`useValidation` is a hook validation, that hook receives values of form and a schema validation created by Yup and returns the object errors at every change in values form.

`
  Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformations.
`

[Yup]:https://github.com/jquense/yup

 ```tsx
    const validation = {....Yup}

    const values = {...object values provides by useForm}

    const errors = useValidation(values, validation)
 ```

## Author

👤 **Jucian0**

* Website: https://medium.com/@jucian0
* Twitter: [@juciano\_barbosa](https://twitter.com/juciano\_barbosa)
* Github: [@jucian0](https://github.com/jucian0)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Jucian0/useform/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/useform/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Jucian0](https://github.com/jucian0).<br />
This project is [MIT](https://github.com/Jucian0/useform/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
