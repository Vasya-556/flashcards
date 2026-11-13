import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string,
  category: "default" | "checkbox" | "file",
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>,
}

function Input({ label, category, labelProps, ...inputProps}: InputProps) {
  return (
    <div className={styles.container}>
      <label {...labelProps}>
        {label}
        <input
          {...inputProps}
          type={
            category === "default"
            ? "text"
            : category
          }
        >
        </input>
      </label>      
    </div>
  )
}

export default Input
