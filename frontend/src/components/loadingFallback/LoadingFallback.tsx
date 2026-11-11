import styles from "./LoadingFallback.module.css";
import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

function LoadingFallback() {
  return (
    <div className={styles.container}>
      <Square
        size="35"
        stroke="5"
        strokeLength="0.25"
        bgOpacity="0.1"
        speed="1.2"
        color="#a47de8"
      />
    </div>
  )
}

export default LoadingFallback
