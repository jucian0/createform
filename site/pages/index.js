import Head from 'next/head'
import ControlledForm from './../components/controlled'
import ControlledFormValidation from './../components/controlledWithValidation'
import UncontrolledForm from './../components/uncontrolled'
import DebouncedForm from './../components/debounced'
import CustomInputs from './../components/customInputs'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>React Data Forms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Link href="/page1" as={`${process.env.ASSET_PREFIX}/page1`}>
      <a>Go to page</a>
    </Link>
            <ControlledForm/>
            <ControlledFormValidation/>
            <UncontrolledForm/>
            <DebouncedForm/>
            <CustomInputs/>
      </main>
    </div>
  )
}
