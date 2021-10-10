export type Validator = (...args: any[]) => (value: any) => string | null

/**
 * REQUIRED VALIDATOR
 *
 * Required validator checks if the value is not null or undefined.
 * @param message  The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function required(message = 'This field is required') {
   return function (value: any) {
      if (value === null || value === undefined || value === '') {
         return message
      }
      return null
   }
}

/**
 * MIN LENGTH VALIDATOR
 *
 * Min length validator checks if the value is longer than the min length.
 * @param length The length of the string.
 * @param message  The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * MAX LENGTH VALIDATOR
 *
 * Max length validator checks if the value is shorter than the max length.
 * @param length The length of the string.
 * @param message  The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * MIN VALIDATOR
 *
 * Min validator checks if the value is greater than the min value.
 * @params min The minimum value.
 * @param message  The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * MAX VALIDATOR
 *
 * Max validator checks if the value is less than the max value.
 * @param max The maximum value.
 * @param message  The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * EMAIL VALIDATOR
 *
 * Email validator checks if the value is a valid email.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function email(message = 'This field must be a valid email') {
   return function (value: any) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
         return message
      }
      return null
   }
}

/**
 * URL VALIDATOR
 *
 * Url validator checks if the value is a valid url.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * NUMBER VALIDATOR
 *
 * Number validator checks if the value is a valid number.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function number(message = 'This field must be a number') {
   return function (value: any) {
      if (isNaN(value)) {
         return message
      }
      return null
   }
}

/**
 * DATE VALIDATOR
 *
 * Date validator checks if the value is a valid date.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function integer(message = 'This field must be an integer') {
   return function (value: any) {
      if (!Number.isInteger(value)) {
         return message
      }
      return null
   }
}

/**
 * DATE VALIDATOR
 *
 * Date validator checks if the value is a valid date.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function float(message = 'This field must be a float') {
   return function (value: any) {
      if (!Number.isFinite(value)) {
         return message
      }
      return null
   }
}

/**
 * DATE VALIDATOR
 *
 * Date validator checks if the value is a valid date.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function boolean(message = 'This field must be a boolean') {
   return function (value: any) {
      if (typeof value !== 'boolean') {
         return message
      }
      return null
   }
}

/**
 * DATE VALIDATOR
 *
 * Date validator checks if the value is a valid date.
 * @param regex The regex to match.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
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

/**
 * DATE VALIDATOR
 *
 * Date validator checks if the value is a valid date.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function date(message = 'This field must be a date') {
   return function (value: any) {
      if (!(value instanceof Date)) {
         return message
      }
      return null
   }
}

/**
 * DATE TIME VALIDATOR
 *
 * Date time validator checks if the value is a valid date time.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function dateTime(message = 'This field must be a date time') {
   return function (value: any) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
         return message
      }
      return null
   }
}

/**
 * DATE ISO VALIDATOR
 *
 * Date iso validator checks if the value is a valid date iso.
 * @param message The message to display if the validation fails.
 * @returns  A validator function that checks if the value is a valid email.
 */
export function dateIso(message = 'This field must be a date time') {
   return function (value: any) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
         return message
      }
      return null
   }
}

/**
 * DOMAIN VALIDATOR
 *
 * Domain validator checks if the value is a valid domain.
 * @param message  The message to display if the value is not a valid credit card number.
 * @returns A validator function that checks if the value is a valid credit card number.
 */
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
