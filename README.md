# React Forms
[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/react-data-forms/blob/master/LICENSE) [![npm version](https://img.shields.io/badge/npm-v1.0-ff69b4)](https://www.npmjs.com/package/react-data-formse)  [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/Jucian0/react-data-forms&hashtags=reactjs,hook,javascript,forms)
# React Forms 🚀

https://react-data-forms.org/

https://codesandbox.io/s/react-data-forms-2u2ju


# Get Started




The first example of creating forms is a controlled form, useForm receive an initialObject with optional some properties:

  * `onChange`: Defines when form state will update.
  * `debounce`: Defines a form with debounce values.
  * `initialValues`: Defines initial state of form.
  * `validations`: Receives a validation schema yup.

```jsx
  import {useForm} from 'react-data-forms'

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

| onSubmit   	| is a void function that accepts a function as a parameter, this function is used when you choose uncontrolled inputs                                                                          	|
|------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| reset      	| is a void function that reset form for the initial state.                                                                                                                                     	|
| resetField 	| is a void function that resets an input for the initial state. That function receives the input name as a parameter.                                                                          	|
| values     	| object of values your form.                                                                                                                                                                   	|
| input      	| is a function that returns properties for the input component, this function receives the name and as a parameter or an object with input properties.                                         	|
| custom     	| is a function that returns properties for custom input component like React Select or React Datepicker, this function receives the name and as a parameter or an object with input properties 	|