function propToPath(prop: any) {
   return prop.replace(/["|']|\]/g, '').split(/\.|\[/)
}

function isPrimitive(value: any) {
   return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
   )
}

export function set<T extends object>(
   defaultObject: T,
   prop: string,
   value: any
) {
   const paths = propToPath(prop)

   function setPropertyValue(object: Partial<T> = {}, index: number) {
      let clone = Object.assign({}, object)

      if (paths.length > index) {
         if (Array.isArray(object)) {
            paths[index] = parseInt(paths[index])
            clone = object.slice() as any
         }
         clone[paths[index]] = setPropertyValue(object[paths[index]], index + 1)

         return clone
      }
      return value
   }

   return setPropertyValue(defaultObject, 0)
}

export function del<T extends object>(defaultObject: T, prop: string) {
   const paths = propToPath(prop)

   function deletePropertyValue(object: object, index: number) {
      let clone: any = Object.assign({}, object)

      if (paths.length > index) {
         if (Array.isArray(object)) {
            paths[index] = parseInt(paths[index])
            clone = object.slice()
            clone.splice(paths[index], 1)
            return clone
         }
         const result = deletePropertyValue(object[paths[index]], index + 1)
         typeof result === 'undefined'
            ? delete clone[paths[index]]
            : (clone[paths[index]] = result)

         return clone
      }
      return undefined
   }

   return deletePropertyValue(defaultObject, 0)
}

export function get<T extends object>(defaultObject: T, prop: string) {
   const paths = propToPath(prop)

   function getPropertyValue(object: object = {}, index: number): any {
      const clone = Object.assign({}, object)
      if (paths.length === index + 1) {
         if (typeof Array.isArray(clone[paths[index]]) !== 'undefined') {
            console.log(clone[paths[index]])
            if (!clone[paths[index]]) {
               return clone[paths[index]]
            }
            return clone[paths[index]].slice()
         } else if (typeof clone[paths[index]] === 'object') {
            return Object.assign({}, clone[paths[index]])
         }
         return clone[paths[index]]
      }
      return getPropertyValue(object[paths[index]], index + 1)
   }

   return getPropertyValue(defaultObject, 0)
}

export function merge<T extends object>(
   defaultObject: T,
   prop: string,
   value: any
) {
   const targetValue = get(defaultObject, prop)
   if (typeof targetValue === 'undefined' || isPrimitive(value)) {
      throw new Error('Target value is undefine, verify your property path')
   }

   if (Array.isArray(value)) {
      if (!Array.isArray(targetValue)) {
         throw new Error('The bot values should be arrays')
      }
      const resultValue = targetValue.concat(value)
      return set(defaultObject, prop, resultValue)
   }

   const resultValue = Object.assign(targetValue, value)

   return set(defaultObject, prop, resultValue)
}
