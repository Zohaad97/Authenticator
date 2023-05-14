import React, { FC, useEffect } from 'react'
import ProgressBar from './progress-bar'
import useTimer from '../hooks/use-progress'

type Props = {
    title: string
    code: number
    logo: string
    id: number
    onCodeExpired: (id: number) => void
}

const EXPIRY_IN_SECONDS = 30

const CodeItem: FC<Props> = ({ logo, title, code, onCodeExpired, id }) => {
    const { progress, reset } = useTimer(EXPIRY_IN_SECONDS)

    let codeSting = code.toString()
    codeSting = `${codeSting.substring(
        0,
        codeSting.length / 2
    )} ${codeSting.substring(codeSting.length / 2, codeSting.length)}`
    useEffect(() => {
        if (progress === 0) {
            onCodeExpired(id)
            reset()
        }
    }, [onCodeExpired, progress, reset, id])

    return (
        <div className="my-2 flex items-center py-4 border-b border-gray-300 rounded-lg shadow-md bg-white">
            <div className="ml-4">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1 px-2">
                <p className="text-black-300">{title}</p>
                <h2 className=" text-3xl font-semibold  text-gray-500">
                    {progress !== 0 ? codeSting : '--'}
                </h2>
            </div>
            <div className="mr-4 items-center">
                <ProgressBar
                    progress={
                        ((EXPIRY_IN_SECONDS - progress) / EXPIRY_IN_SECONDS) *
                        100
                    }
                    size={35}
                />
            </div>
        </div>
    )
}

export default CodeItem
