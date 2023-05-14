import React, { FC } from 'react'

type Props = {
    progress: number
    size: number
}

const ProgressBar: FC<Props> = ({ progress, size }) => {
    const radius = size / 2
    const circumference = 2 * Math.PI * radius
    const progressOffset = ((100 - progress) / 100) * circumference

    return (
        <svg width={size} height={size} className={`w-${size} h-${size}`}>
            <circle
                cx={radius}
                cy={radius}
                r={radius - 2}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-700"
            />
            <circle
                cx={radius}
                cy={radius}
                r={radius - 2}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                className={
                    progressOffset < 30 ? 'text-red-700' : 'text-blue-500 '
                }
            />
        </svg>
    )
}

export default ProgressBar
