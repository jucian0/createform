![Logo](img/logo3.png)


# UseForm🚀
[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useform/blob/master/LICENSE) [![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/Jucian0/useform/tree/master/test) ![npm bundle size](https://img.shields.io/bundlephobia/min/useforms)![npm bundle size](https://img.shields.io/bundlephobia/minzip/useforms)[![npm version](https://img.shields.io/badge/npm-v1.0-ff69b4)](https://www.npmjs.com/package/useforms) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=useform+and+validations&url=https://github.com/Jucian0/useform&hashtags=reactjs,hook,javascript,forms)



## Docs  https://useform.org/

React data forms provide a way to create complex forms easily, react data forms provide a hook called `userForm`, this hook returns an object of values ​​in the same shape that it receives, this is possible using dot notation. Therefore, it does not matter if the object is complex or has many properties or array, the result is the same. The same process is realized with errors object and touched object.

```jsx
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

# Get Started

## useForm hook


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
