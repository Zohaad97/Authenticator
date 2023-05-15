import CodeItem, { EXPIRY_IN_SECONDS } from '../components/code-item'
import { observer } from 'mobx-react'
import CodeStore from '../store/code-store'
import { useNavigate } from 'react-router-dom'
import { DragEvent } from 'react'

const CodeList = observer(() => {
    const navigate = useNavigate()
    const list = CodeStore.codes

    const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString())
    }
    const handleDrop = (e: DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault()
        const oldIndex = e.dataTransfer.getData('text/plain')
        CodeStore.updateOrder(Number(oldIndex), index)
    }

    return (
        <div className="list-disc w-full">
            <ul>
                {list.map((item, index) => (
                    <li
                        key={`${index}`}
                        draggable
                        onDrop={(e) => handleDrop(e, index)}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <CodeItem
                            code={item.code || 0}
                            title={item.title}
                            logoUrl={item.logoUrl}
                            progress={item.progress || EXPIRY_IN_SECONDS}
                        />
                    </li>
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
