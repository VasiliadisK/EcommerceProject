import { useFormContext } from "react-hook-form";

export default function FormTextInput({
  inputLabel,
  inputKey,
  inputType,
  inputMaxLength,
  inputMinLength,
  pattern,
  patternMessage,
  placeholder,
  step,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-white mb-2">
        {inputLabel}
      </label>
      <input 
      type={inputType ? inputType : "text"}
      step={step}

        {...register(inputKey, {
          required: `${inputLabel} is required`,
          //Conditionally render the minLength and maxLength validation based on the input
          //e.g email input doesn't require min or max char lenth
          ...(inputMaxLength && {
            maxLength: {
              value: inputMaxLength,
              message: `Up to ${inputMaxLength} characters are allowed`,
            },
          }),
          ...(inputMinLength && {
            minLength: {
              value: inputMinLength,
              message: `At least ${inputMinLength} characters are required`,
            },
          }),
          ...(pattern && patternMessage && {
            pattern: {
              value: pattern,
              message: patternMessage,
            },
          })
        })}
        className="w-full rounded px-4 py-2.5 bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
        placeholder={placeholder ? placeholder : `Enter your ${inputLabel}`}
      />
      {errors[inputKey] && (
        <p className="text-red-400 text-sm mt-1.5">
          {errors[inputKey].message}
        </p>
      )}
    </div>
  );
}
