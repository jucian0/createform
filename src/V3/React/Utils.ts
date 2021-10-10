export function isCheckbox(type: string) {
   return type === 'checkbox'
}

export function isParsableToNumber(value: string) {
   return !isNaN(parseInt(value, 10))
}
