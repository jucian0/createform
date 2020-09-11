
const form = create({
   name: '',
   email: '',
   password: ''
})


const form1 = builder()
   .add({ name: '', controlled: true, validation: yup.string() })
   .add({ email: '', debounced: true, validation: yup.string() })
   .add({ 'first.email': '', debounced: true, validation: yup.string() })


const contextform1 = useForm(form1)

const contextform = useForm(form)   