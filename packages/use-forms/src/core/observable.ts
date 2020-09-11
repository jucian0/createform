type Subscriber<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscriber<TValues>>

function Observer() {

   let subscribers: Subscribers = []

   function subscriber<TValue>(fn: Subscriber<TValue>) {
      subscribers = [...subscribers, fn]
      return () => {
         subscribers.filter(subscriber => subscriber !== fn)
      }
   }

   function notify<TValues>(data: TValues) {
      subscribers.forEach(subscriber => subscriber(data))
   }

   return {
      notify,
      subscriber
   }
}