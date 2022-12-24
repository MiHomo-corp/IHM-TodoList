import React from 'react'
import ModificationProject from "../components/ModificationProject"

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(navigation,route){
    const { project } = navigation.route.params;

    return (
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(<ModificationProject token={token} project={project}/>)
          }}
        </TokenContext.Consumer>
    )
}