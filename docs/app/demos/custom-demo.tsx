import { createForm } from "@createform/react";
import Select from "react-select";

const useForm = createForm({
  initialValues: {
    date: "",
    profession: null,
  },
  mode: "onChange",
});

export function CustomFormDemo() {
  const { handleReset, handleSubmit, state, setFieldValue } = useForm();
  const { values } = state;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((e) => {
        console.log(e, state);
      })}
      onReset={handleReset(() => { })}
      className="border dark:border-gray-800 p-5 rounded"
    >
      <div className="mb-6">
        <Select
          className=""
          placeholder="Select a profession..."
          onChange={(e) => setFieldValue("profession", e)}
          value={values.profession}
          options={[
            { label: "Software developer", value: "1" },
            { label: "Devops", value: "2" },
          ]}
        />
      </div>
      <button
        type="submit"
        className="text-white py-2 px-4 mr-2 mb-2 text-md font-medium focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white dark:text-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Submit <span aria-hidden="true">→</span>
      </button>
      <button
        type="reset"
        className="py-2 px-4 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Reset
      </button>
    </form>
  );
}
