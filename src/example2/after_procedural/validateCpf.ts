const FIRST_DIGIT_FACTOR = 10
const SECOND_DIGIT_FACTOR = 11
const SUBTRACTION_NUMBER = 11

function cleanCpf(cpf: string) {
   return cpf.replace('.', '').replace('.', '').replace('-', '').replace(' ', '')
}

function isIdenticalDigits(cpf: string) {
   return cpf.split('').every((c) => c === cpf[0])
}

function getCheckDigits(cpf: string) {
   return cpf.slice(-2)
}

function calculateCheckDigit(cpf: string, factor: number) {
   const total = [...cpf].reduce((total, digit) => {
      if (factor > 1) total += parseInt(digit) * factor--
      return total
   }, 0)
   const rest = total % SUBTRACTION_NUMBER
   return rest < 2 ? 0 : SUBTRACTION_NUMBER - rest
}

export function validateCpf(rawCpf: string | null | undefined) {
   if (rawCpf === null) return false
   if (rawCpf === undefined) return undefined
   const cpf = cleanCpf(rawCpf)
   if (isIdenticalDigits(cpf)) return false
   const calculatedCheckDigit1 = calculateCheckDigit(cpf, FIRST_DIGIT_FACTOR)
   const calculatedCheckDigit2 = calculateCheckDigit(cpf, SECOND_DIGIT_FACTOR)
   const checkDigits = getCheckDigits(cpf)
   const calculatedCheckDigits = `${calculatedCheckDigit1}${calculatedCheckDigit2}`
   return checkDigits === calculatedCheckDigits
}
