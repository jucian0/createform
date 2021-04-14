![Logo](img/logo3.png)

<h1 align="center">Welcome to useForm 👋</h1>

[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useform/blob/master/LICENSE) [![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/use-form/use-form/tree/master/test) ![npm bundle size](https://img.shields.io/bundlephobia/min/@use-form/use-form) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@use-form/use-form) [![npm version](https://img.shields.io/badge/npm-v1.0-ff69b4)](https://www.npmjs.com/package/@use-form/use-form) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/use-form/use-form&hashtags=reactjs,hook,javascript,forms)

> useFom provide a way to create complex forms easily.

### 🏠 [Homepage](https://useform.org)

### ✨ [Demo](https://codesandbox.io/s/useform-2u2ju)

<a href="https://codesandbox.io/s/useform-2u2ju">
  <img width="150" alt="Example in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Description

Forms are an important part of web applications, and with react it's possible to create greats forms,  
react hooks are a game-changer when we think about forms, with hooks is very simple to create forms, and you can go on without libraries.  
But when we wanna complex forms with many validations and complex objects with several layer and properties is appropriate to use a library form to manager the state of inputs and its validations.  
For this reason, there is useForm, with useForm we can make greats forms and complex validations with less line code.

UseForm provides a way to create complex forms easily, this hook returns an object of values ​​in the same shape that it receives, this is possible using dot notation. Therefore,
it does not matter if the object is complex or has many properties or array,
the result is the same. This process turns very easily to create forms from an object with several layers,
the same layers and properties are replicated in the final object,
this approach prevents you to type more code to convert an object from form to backend object type. The same process is realized with errors object and touched objects.

## What to expect with useForm

- Performer forms - useForm provides a way to complete a form and submit it without any rerender, by default useForm creates uncontrolled forms.
- Easy to write - useForm has an easy way to write forms with less code. register function return necessary input's properties and it is all we need to manage all events in a native HTML `input`. Writhe forms without form tag.
- Easy validation - By default useform uses yup validation, we can write complex validation without effort.

## Installation

```
  npm i @use-form/use-form
```

```
  yarn add @use-form/use-form
```

## Usage

`useForm` provides a `register` function, this function as a link with input and a object property of form state.

<QuickStartDemo />
<br />

```javascript
import { useForm } from "@use-form/use-form";

/*
 *  initial Values optional
 */
const initialValues = {
  name: 'Jesse',
  email: 'jesse@jesse.com',
  score: 25,
}

const {
  register,
  state: { values },
} = useForm({ initialValues, isControlled: true })
```

Use dot notation to create advanced objects or to map object values. Type an entry name and type or an entry property object.

```jsx
   <Input placeholder="Name" {...register("name")}/>
   <Input placeholder="E-mail" type="email" {...register("email")}/>
   <Range {...register("score")}/>
```

### [Post](https://dev.to/jucian0/building-forms-with-useform-1cna)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Jucian0/useform/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/useform/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Jucian0](https://github.com/useform).<br />
This project is [MIT](https://github.com/useform/useform/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
