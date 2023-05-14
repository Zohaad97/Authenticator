import CodeItem from '../components/code-item'
import { observer } from 'mobx-react'
import CodeStore from '../store/code-store'

const CodeList = observer(() => {
    const list = CodeStore.codes
    const onCodeExpired = (index: number) => {
        CodeStore.generateCode(index)
    }

    return (
        <ul className="list-disc w-full">
            {list.map((item, index) => (
                <CodeItem
                    id={index}
                    onCodeExpired={onCodeExpired}
                    code={item.code || 0}
                    title={item.title}
                    logo={item.logoUrl}
                />
            ))}
        </ul>
    )
})

export default CodeList
