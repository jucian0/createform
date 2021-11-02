export function createException(...args: any[]): Error {
   throw new Exception(args[0], args[1])
}

export class Exception extends Error {
   constructor(name: string, message: string) {
      super(message)
      this.name = name
      this.message = message
   }
}
