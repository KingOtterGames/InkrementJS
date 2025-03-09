import { Props } from '@schemas/props'

function Dashboard({ state, dispatch }: Props) {
    return <>{Object.keys(state).toLocaleString()}</>
}

export default Dashboard
