import { useFormContext } from "react-hook-form";

export default function FormSelectInput({ inputLabel, inputKey, options, placeholder }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-2">
                {inputLabel}
            </label>
            <select
                {...register(inputKey, { required: `${inputLabel} is required` })}
                className="w-full rounded px-4 py-2.5 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            >
                <option value="">{placeholder ?? `Select ${inputLabel}`}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {errors[inputKey] && (
                <p className="text-red-400 text-sm mt-1.5">{errors[inputKey].message}</p>
            )}
        </div>
    );
}