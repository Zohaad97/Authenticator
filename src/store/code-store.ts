import { makeAutoObservable } from 'mobx'

import { Code } from '../types/code.type'
import { generateNewCode } from '../utils'

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

    public generateCode = (id: number) => {
        const updatedCodeList = this.codes.map((item, index) => {
            if (index === id) {
                const value = generateNewCode(6)
                item.code = value
            }
            return item
        })
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
