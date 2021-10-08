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

   public required(message: string) {
      return function (value: any) {
         if (value === null || value === undefined || value === '') {
            return message || 'This field is required'
         }
         return null
      }
   }

   public minLength(message: string) {
      return function (value: any, length: number) {
         if (value.length < length) {
            return message || `This field must be at least ${length} characters`
         }
         return null
      }
   }

   public maxLength(value: any, length: number) {
      if (value.length > length) {
         return `This field must be at most ${length} characters`
      }
   }

   public min(value: any, min: number) {
      if (value < min) {
         return `This field must be at least ${min}`
      }
   }

   public max(value: any, max: number) {
      if (value > max) {
         return `This field must be at most ${max}`
      }
   }

   public email(value: any) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
         return 'Invalid email address'
      }
   }

   public url(value: any) {
      if (
         !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
            value
         )
      ) {
         return 'Invalid URL'
      }
   }

   public number(value: any) {
      if (isNaN(value)) {
         return 'This field must be a number'
      }
   }

   public integer(value: any) {
      if (isNaN(value) || value % 1 !== 0) {
         return 'This field must be an integer'
      }
   }

   public float(value: any) {
      if (isNaN(value)) {
         return 'This field must be a number'
      }
   }

   public boolean(value: any) {
      if (typeof value !== 'boolean') {
         return 'This field must be a boolean'
      }
   }

   public regex(value: any, regex: RegExp) {
      if (!regex.test(value)) {
         return 'Invalid value'
      }
   }

   public date(value: any) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
         return 'Invalid date'
      }
   }

   public dateTime(value: any) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) {
         return 'Invalid date time'
      }
   }

   public dateISO(value: any) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
         return 'Invalid date'
      }
   }

   public domain(value: any) {
      if (
         !/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(
            value
         )
      ) {
         return 'Invalid domain'
      }
   }

   public ip(value: any) {}

   public ipv4(value: any) {}

   public ipv6(value: any) {}

   public uuid(value: any) {}
}
