function useForm(param: any) {

   const [state, setState] = useState(param.values)
   const listInputsRef = useRef<any>({})

   useEffect(() => {
      // const sub = param.subscriber.subscriber(setState)

      return () => {
         //  sub()
      }
   }, [])

   function registerInput(props: any) {
      const inputProps = {
         ...listInputsRef.current,
         [props.name]: { ...props, ref: React.createRef<HTMLInputElement>() },
      }

      /**
       * creating a input props an put one on a specific key in listInputsRef.
       */
      listInputsRef.current = inputProps
      return listInputsRef.current[props.name]
   }

   function register(name: string, type: string) {

      function onChange(e: any) {
         param.setValues({ [e.target.name]: e.target.value })
      }

      const props = registerInput({
         defaultValue: param.get()[name],
         name,
         type,
         onChange
      })

      return props

   }

   return [state, { onSubmit: param.onSubmit, register }]
}