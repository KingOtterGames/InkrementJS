import { v4 as uuidv4 } from 'uuid'

export const create = () => {
    return uuidv4()
}

const Instance = {
    create,
}

export default Instance
