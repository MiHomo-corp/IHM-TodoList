import React from 'react'
import ModificationTask from "../components/ModificationTask"

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(route){
    const { task } = route.route.params;

    return (
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(<ModificationTask token={token} task={task}/>)
          }}
        </TokenContext.Consumer>
    )
}