import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  category: "blue" | "red" | "green",
}

function Button({ text, category, ...buttonProps}: ButtonProps) {
  return (
    <button 
    className={`${styles.container} ${styles[category]}`}
    {...buttonProps}
    >
      {text}
    </button>
  )
}

export default Button