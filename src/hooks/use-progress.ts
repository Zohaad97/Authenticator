import { useState, useEffect, useCallback } from 'react'

const useTimer = (seconds: number) => {
    const [progress, setProgress] = useState(seconds)

    useEffect(() => {
        if (progress === 0) return
        const timer = setInterval(() => {
            setProgress((progress) => progress - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [progress, seconds])

    const reset = useCallback(() => {
        setProgress(seconds)
    }, [seconds])
    return { progress, reset }
}

export default useTimer
