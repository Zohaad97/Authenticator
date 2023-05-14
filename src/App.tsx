import './App.css'

import CodeList from './containers/code-list'
import CodeStore from './store/code-store'
import { DEFAULT_DATA } from './data'
import CodeForm from './containers/code-form'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
    // To initialize dummy data
    if (CodeStore.codes.length === 0) {
        CodeStore.generateCodeForList(DEFAULT_DATA)
    }
    const router = createBrowserRouter([
        {
            path: '/',
            element: <CodeList />,
        },
        {
            path: '/create',
            element: <CodeForm />,
        },
    ])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="w-full px-4 lg:px-0 flex flex-col items-center justify-center flex-1 lg:w-1/3">
                <RouterProvider router={router} />
            </main>
        </div>
    )
}

export default App
