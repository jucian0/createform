import { Field, PrimitiveValue } from './Types'

export function isCheckbox(field: Field): boolean {
   return field.type === 'checkbox'
}

export function isRadio(field: Field): boolean {
   return !!field?.querySelector('input[type="radio"]')
}

export function extractRadioElements(field: Field) {
   return Array.from<Field>(field.querySelectorAll('input[type="radio"]'))
}

export function extractFieldValue(field: Field): PrimitiveValue {
   if (isCheckbox(field)) {
      return field.checked
   } else if (isRadio(field)) {
      return field.querySelector<HTMLInputElement>(
         'input[type="radio"]:checked'
      )?.value
   } else {
      return field.value
   }
}

export function setFieldValue(field: Field, value: PrimitiveValue) {
   if (isCheckbox(field)) {
      field.checked = value as boolean
   } else if (isRadio(field)) {
      const elements = extractRadioElements(field)
      for (const element of elements) {
         element.checked = element.value === value
      }
   } else {
      field.value = value as string
   }
}
