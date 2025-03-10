import * as PreviousVersion from './v0'

export type StateV1 = {
    version: number
    tab: string
    subtab: string
    currencies: {
        [key: string]: number
        gold: number
    }
    achievements: string[]
}

export const DefaultSave: StateV1 = {
    version: 1,
    tab: '',
    subtab: '',
    currencies: {
        gold: 0,
    },
    achievements: [],
}

export const convertPreviousVersion = (v0: PreviousVersion.State): StateV1 => {
    return {
        version: DefaultSave.version,
        tab: DefaultSave.tab,
        subtab: DefaultSave.subtab,
        currencies: {
            gold: DefaultSave.currencies.gold,
        },
        achievements: DefaultSave.achievements,
    }
}
