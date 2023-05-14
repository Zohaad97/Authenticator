import { FormEvent, useState } from 'react'

import CodeStore from '../store/code-store'
import { Code } from '../types/code.type'
import { useNavigate } from 'react-router-dom'
const INITIAL_STATE: Code = {
    title: '',
    logoUrl: '',
}
const CodeForm = () => {
    const [form, setForm] = useState(INITIAL_STATE)
    const navigate = useNavigate()

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const name = currentTarget.name
        const value = currentTarget.value
        setForm({ ...form, [name]: value })
    }
    const handleSubmit = async () => {
        if (form.title && form.logoUrl) {
            CodeStore.add(form)
            setForm(INITIAL_STATE)
            navigate('/')
        } else {
            alert('Title or logo url is empty')
        }
    }
    return (
        <div className="w-full flex flex-wrap justify-between items-center flex-col">
            <h2 className="mb-4">Create a new code</h2>
            <div className="w-full mb-4">
                <input
                    onChange={handleChange}
                    value={form['title']}
                    name={'title'}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 `}
                    placeholder={'Title'}
                />
            </div>
            <div className="w-full mb-4 ">
                <input
                    onChange={handleChange}
                    value={form['logoUrl']}
                    name={'logoUrl'}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 `}
                    placeholder={'https://example.png'}
                />
            </div>
            <div className="w-full">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default CodeForm
