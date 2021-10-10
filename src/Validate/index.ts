export class Validate {
   constructor() {}

   public validate(value: any, rules: Function[]) {
      for (let rule of rules) {
         const result = rule(value)
         if (result) {
            return result
         }
      }
      return null
   }
}

export function required(message = 'This field is required') {
   return function (value: any) {
      if (value === null || value === undefined || value === '') {
         return message
      }
      return null
   }
}

export function minLength(
   length: number,
   message = `This field must be at least ${length} characters long`
) {
   return function (value: any) {
      if (value.length < length) {
         return message
      }
      return null
   }
}

export function maxLength(
   length: number,
   message = `This field must be at most ${length} characters long`
) {
   return function (value: any) {
      if (value > length) {
         return message
      }
      return null
   }
}

export function min(
   min: number,
   message = `This field must be at least ${min}`
) {
   return function (value: any) {
      if (value < min) {
         return message
      }
      return null
   }
}

export function max(
   max: number,
   message = `This field must be at most ${max}`
) {
   return function (value: any) {
      if (value > max) {
         return message
      }
      return null
   }
}

export function email(message = 'This field must be a valid email') {
   return function (value: any) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
         return message
      }
      return null
   }
}

export function url(message = 'This field must be a valid url') {
   return function (value: any) {
      if (
         !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
            value
         )
      ) {
         return message
      }
      return null
   }
}

export function number(message = 'This field must be a number') {
   return function (value: any) {
      if (isNaN(value)) {
         return message
      }
      return null
   }
}

export function integer(message = 'This field must be an integer') {
   return function (value: any) {
      if (!Number.isInteger(value)) {
         return message
      }
      return null
   }
}

export function float(message = 'This field must be a float') {
   return function (value: any) {
      if (!Number.isFinite(value)) {
         return message
      }
      return null
   }
}

export function boolean(message = 'This field must be a boolean') {
   return function (value: any) {
      if (typeof value !== 'boolean') {
         return message
      }
      return null
   }
}

export function regex(
   regex: RegExp,
   message = 'This field must match the regex'
) {
   return function (value: any) {
      if (!regex.test(value)) {
         return message
      }
      return null
   }
}

export function date(message = 'This field must be a date') {
   return function (value: any) {
      if (!(value instanceof Date)) {
         return message
      }
      return null
   }
}

export function dateTime(message = 'This field must be a date time') {
   return function (value: any) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
         return message
      }
      return null
   }
}

export function dateIso(message = 'This field must be a date time') {
   return function (value: any) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
         return message
      }
      return null
   }
}

export function domain(message = 'This field must be a domain') {
   return function (value: any) {
      if (
         !/^(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?$/i.test(
            value
         )
      ) {
         return message
      }
      return null
   }
}
