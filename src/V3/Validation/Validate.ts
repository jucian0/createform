/**
 * Validate class will receive a value and some function validators and will execute them.
 *
 * @export Validate
 */
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
