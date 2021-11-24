![Logo](img/logo3.png)

<h1 align="center">Welcome to useForm 👋</h1>

[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useform/blob/master/LICENSE) [![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/use-form/use-form/tree/master/test) ![npm bundle size](https://img.shields.io/bundlephobia/min/@use-form/use-form) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@use-form/use-form) [![npm version](https://img.shields.io/badge/npm-v1.0-ff69b4)](https://www.npmjs.com/package/@use-form/use-form) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/use-form/use-form&hashtags=reactjs,hook,javascript,forms)

> useFom provide a way to create complex forms easily.

### 🏠 [Homepage](https://useform.org)

### ✨ [Demo](https://codesandbox.io/s/useform-2u2ju)

<a href="https://codesandbox.io/s/useform-2u2ju">
  <img width="150" alt="Example in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Motivation

There are many ways to create forms in React, and there are many form libraries available, with different features. I must admit that there a lot of good form libraries,
so, why one more?

UseForm was born because I found great difficulty when I wanted to build complex forms with different steps or levels and with many fields.
When we need to build complex forms we can encounter issues like:

- A lot of rendering - Every change is made in the form state is reflected and the form component tree is rendered again and again.
- A lot of properties - When you use some libraries it is necessary to put many properties in one input, creating a lot of unnecessary code.
- Just one approach - You can use controlled forms or uncontrolled forms never both together in the same library.

UseForm is a library that solves all these problems.

## Description

Forms are an important part of web applications, and with react it's possible to create greats forms,  
react hooks are a game-changer when we think about forms, with hooks it is very simple to create forms, and you can go on without libraries.  
But when we wanna complex forms with many validations and nested objects with several layer and properties is appropriate to use a library form to manager the state of inputs and its validations.  
For this reason, there is useForm, with useForm we can make greats forms and complex validations with less line code.

```jsx
// FORMIk EXAMPLE
<input
  name="fieldName"
  onChange={handleChange}
  value={form.values.fieldName}
  onBlur={handleBlur}
/>

//USEFORM EXAMPLE
<input {...register('fieldName')}/>
```

UseForm provides a way to create complex forms easily, this hook returns an object of values ​​in the same shape that it receives, this is possible using dot notation. Therefore,
it does not matter if there is a nested object or has many properties or array,
the result is the same. This process turns very easily to create forms from nested objects,
the same layers and properties are replicated in the final object,
this approach prevents you to type more code to convert an object from form to backend object type. The same process is realized with errors object and touched objects.

## What to expect with useForm

- Performer forms - useForm provides a way to complete a form and submit it without any rerender, by default useForm creates uncontrolled forms.
- Easy to write - useForm has an easy way to write forms with less code.
  register function return necessary input's properties and it is all we need to manage all events in a native HTML `input`. Also, you can write forms without form tag.
- Easy validation - By default useform uses yup validation, we can write complex validation without effort.
- Easy to use - useForm is very easy to use, you can register a field with a single line of code.
- No dependencies - useForm does not depend on any library to work.

## Installation

```
  npm i @use-form/use-form
```

```
  yarn add @use-form/use-form
```

## Usage

`useForm` provides a `register` function, this function return all necessary properties to manage the input's events and validation.

<QuickStartDemo />
<br />

```javascript
import { useForm } from '@use-form/use-form'

/*
 *  initial Values optional
 */
const initialValues = {
  name: 'Jesse',
  email: 'jesse@jesse.com',
  score: 25
}

const {
  register,
  state: { values }
} = useForm({ initialValues, mode: 'onChange' })
```

Use dot notation to create nested objects or to map object values. Type an entry name and type or an entry property object.

```jsx
   <input placeholder="Name" {...register("name")}/>
   <input placeholder="E-mail" type="email" {...register("email")}/>
   <input type="range" {...register("score")}/>
```

### [Post](https://dev.to/jucian0/building-forms-with-useform-1cna)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/use-form/use-form/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/use-form/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for @use-form/use-form](https://reporoster.com/stars/use-form/use-form)](https://github.com/use-form/use-form/stargazers)

## 📝 License

Copyright © 2021 [useForm](https://github.com/use-form).<br />
This project is [MIT](https://github.com/use-form/use-form/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
