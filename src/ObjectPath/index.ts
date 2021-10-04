export class ObjectPath {
   public getFieldsProperty(fields: object, property: string) {
      function getDeepValue(obj: object, path: string): any {
         const value = obj[path]?.[property] ? obj[path][property] : obj[path]

         if (typeof value === 'object') {
            const keys = Object.keys(value)
            let newObj = {}
            if (Array.isArray(value)) {
               newObj = []
            }
            keys.forEach(key => {
               newObj[key] = getDeepValue(value, key)
            })

            return newObj
         }

         return value
      }

      const defaultState = Object.keys(fields).reduce((acc, key) => {
         const value = getDeepValue(fields, key)

         return {
            ...acc,
            [key]: value
         }
      }, {})

      return defaultState
   }
}
