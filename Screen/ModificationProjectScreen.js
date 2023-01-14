import React from 'react'
import ModificationProject from "../components/ModificationProject"
import { View } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(navigation,route){
    const { project, onUpdateProject} = navigation.route.params;

    return (
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(
                  <View
                  style={{
                    backgroundColor:"#EBF7F3",
                    flex: 1,
                    //justifyContent: 'center',
                    //alignItems: 'center'
                  }}
                >
                <ModificationProject token={token} project={project} onUpdateProject={onUpdateProject}/>
                </View>)
          }}
        </TokenContext.Consumer>
    )
}