import React from 'react'
import ModificationProject from "../components/ModificationProject"

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(route){
    const { project } = route.route.params;
    console.log(route)
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(<ModificationProject token={token} project={project}/>)
          }}
        </TokenContext.Consumer>
    )
}