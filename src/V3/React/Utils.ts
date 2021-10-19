export function isCheckboxOrRadio(type: string) {
   return type === 'checkbox' || type === 'radio'
}

export function isParsableToNumber(value: string) {
   return !isNaN(parseInt(value, 10))
}
