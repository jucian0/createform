import './styles.css';
import { createForm } from '@use-form/use-form';

const useLoginForm = createForm({
  initialValues: {
    email: 'juciano@juciano.com',
    password: '1234567',
    agree: true,
    gender: 'masculine',
    distance: 10,
  },
});

export function FormExample() {
  const {
    state,
    register,
    setFieldValue,
    setFieldsValue,
    reset,
    resetValues,
    resetTouched,
    resetErrors,
    setFieldsError,
    setFieldsTouched,
    handleSubmit,
  } = useLoginForm({
    mode: 'onChange',
  });

  function handleEmail() {
    setFieldValue('email', 'jose@jose.com');
  }

  function handleReset() {
    reset();
  }

  function handleResetValues() {
    resetValues();
  }

  function handleResetTouched() {
    resetTouched();
  }

  function handleResetErrors() {
    resetErrors();
  }

  function handleAllValues() {
    setFieldsValue({
      email: 'jose@jose.com',
      password: '1234567891011121314151618',
      gender: 'female',
      agree: false,
      distance: 10,
    });

    setFieldsTouched((state) => ({
      ...state,
      email: true,
    }));
  }

  function handleSetErrors() {
    setFieldsError((state) => ({
      ...state,
      password: 'Senha deve conter no mínimo 8 caracteres',
    }));
  }

  console.log('state', state.errors);

  return (
    <div>
      <h1>Form</h1>
      <form
        onSubmit={handleSubmit((e, isValid) => {
          console.log(e, isValid);
        })}
      >
        <input type="text" ref={register('email')} />
        <input type="password" autoComplete="on" ref={register('password')} />
        <input type="checkbox" ref={register('agree')} />
        <select ref={register('location.state')}>
          <option value="">Select a state</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
        </select>
        <div ref={register('gender')}>
          <input type="radio" name="gender" id="1" value="masculine" />
          Masculine
          <input type="radio" name="gender" id="2" value="female" />
          Female
        </div>
        <input type="text" ref={register('location.city')} />
        <input type="text" ref={register('location.zip')} />
        <input type="range" ref={register('distance')} />

        <button type="submit">Submit</button>
        <button onClick={handleEmail} type="button">
          Set email
        </button>
        <button onClick={handleAllValues} type="button">
          Set All values
        </button>
        <button onClick={handleReset} type="button">
          Reset
        </button>
        <button onClick={handleResetValues} type="button">
          Reset Values
        </button>
        <button onClick={handleResetTouched} type="button">
          Reset Touched
        </button>
        <button onClick={handleResetErrors} type="button">
          Reset Errors
        </button>
        <button onClick={handleSetErrors} type="button">
          Set Errors
        </button>
      </form>
    </div>
  );
}
