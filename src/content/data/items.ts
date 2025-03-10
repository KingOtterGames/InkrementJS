/**
 * Type Definitions
 */
export type Item = {
    id: string
    name: string
}

/**
 * Data
 */
const Data: Item[] = [
    {
        id: '1',
        name: 'Item 1',
    },
]

/**
 * Lookup Function
 */
const Lookup: { [key: string]: Item } = {}
Data.forEach((item: Item) => {
    Lookup[item.id] = item
})

const getById = (id: string) => {
    return Lookup[id]
}

// Array Function
const array = () => Data

const ItemsContent = {
    array,
    getById,
}

export default ItemsContent
