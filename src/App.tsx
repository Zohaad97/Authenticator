import './App.css'

import CodeList from './containers/code-list'
import CodeStore from './store/code-store'
import { DEFAULT_DATA } from './data'
import CodeForm from './containers/code-form'

function App() {
    // To initialize dummy data
    CodeStore.generateCodeForList(DEFAULT_DATA)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="w-full px-4 lg:px-0 flex flex-col items-center justify-center flex-1 lg:w-1/3">
                <CodeForm />
                <CodeList />
            </main>
        </div>
    )
}

export default App
