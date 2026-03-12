import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";

export default function FormPasswordInput({ inputLabel, inputKey, onFocus, onBlur, validate }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-white mb-2">
        {inputLabel}
      </label>
      <div className="relative">
        <input
          {...register(inputKey, {
            required: `${inputLabel} is required`,
            ...(validate && { validate }),
          })}
          type={showPassword ? "text" : "password"}
          className="w-full rounded px-4 py-2.5 bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all pr-10"
          placeholder={`Enter your ${inputLabel}`}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      {errors[inputKey] && (
        <p className="text-red-400 text-sm mt-1.5">
          {errors[inputKey].message}
        </p>
      )}
    </div>
  );
}
