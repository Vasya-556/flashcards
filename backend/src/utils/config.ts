import dotenv from 'dotenv'; 

dotenv.config();

const setEnv = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Missing env value: ${key}`)
    }    
    return value
}

export {
    setEnv
}
