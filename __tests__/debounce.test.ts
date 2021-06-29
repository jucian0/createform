import { debounce } from '../src/utils'

describe('Test debounce function', () => {
   jest.useFakeTimers()

   it('should call immediately function callback', () => {
      const callback = jest.fn()

      const debounced = debounce(callback, 100, true)

      debounced()
      jest.advanceTimersByTime(0)

      expect(callback).toBeCalled()
   })

   it('should call function callback when the time is up', () => {
      const callback = jest.fn()

      const debounced = debounce(callback, 300)

      debounced()
      jest.advanceTimersByTime(300)

      expect(callback).toBeCalled()
   })
})
