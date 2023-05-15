import { makeAutoObservable } from 'mobx'

import { Code } from '../types/code.type'
import { generateNewCode } from '../utils'
import { EXPIRY_IN_SECONDS } from '../components/code-item'

class Store {
    constructor() {
        makeAutoObservable(this)
    }
    public codes: Code[] = []

    public add = (todo: Code) => {
        if (!todo.code) {
            todo.code = generateNewCode(6)
        }
        this.codes.push(todo)
    }

    public updateProgress = () => {
        const updatedCodeList = this.codes.map((item) => {
            if (!item.progress) {
                const value = generateNewCode(6)
                item.code = value
                item.progress = EXPIRY_IN_SECONDS
                return item
            }

            item.progress = item.progress - 1
            return item
        })
        this.codes = updatedCodeList
    }

    public updateOrder = (id: number, position: number) => {
        const updatedCodeList = [...this.codes]
        const [item] = updatedCodeList.splice(id, 1)
        updatedCodeList.splice(position, 0, item)
        this.codes = updatedCodeList
    }

    public generateCodeForList = (list: Code[]) => {
        const updatedCodeList = list.map((item) => {
            item.code = generateNewCode(6)
            return item
        })
        this.codes = updatedCodeList
    }
}
const CodeStore = new Store()
export default CodeStore
