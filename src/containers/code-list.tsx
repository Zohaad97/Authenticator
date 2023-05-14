import CodeItem from '../components/code-item'
import { observer } from 'mobx-react'
import CodeStore from '../store/code-store'
import { useNavigate } from 'react-router-dom'

const CodeList = observer(() => {
    const navigate = useNavigate()
    const list = CodeStore.codes
    const onCodeExpired = (index: number) => {
        CodeStore.generateCode(index)
    }

    return (
        <div className="list-disc w-full">
            <ul>
                {list.map((item, index) => (
                    <CodeItem
                        key={`${index}`}
                        id={index}
                        onCodeExpired={onCodeExpired}
                        code={item.code || 0}
                        title={item.title}
                        logo={item.logoUrl}
                    />
                ))}
            </ul>
            <button
                onClick={() => navigate('/create')}
                type="submit"
                className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
                Create
            </button>
        </div>
    )
})

export default CodeList
