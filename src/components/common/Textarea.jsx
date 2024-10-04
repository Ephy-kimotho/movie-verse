/* eslint-disable react/prop-types */
import { useField } from "formik";

function Textarea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col">
      <label className="font-bold text-night text-lg sm:text-xl mb-1">
        {label}:
      </label>
      <textarea
        {...props}
        {...field}
        className={`border-none bg-white text-base sm:text-lg text-night shadow-md py-4 pl-3 sm:pl-5 h-40 rounded-md  ${
          meta.touched && meta.error && "outline-tomato outline outline-2"
        }`}
      />
      {meta.error && meta.touched && (
        <p className="text-tomato text-base font-bold font-karla">{meta.error}</p>
      )}
    </div>
  );
}

export default Textarea;
