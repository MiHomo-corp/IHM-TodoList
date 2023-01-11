import React from 'react'
import ModificationTask from "../components/ModificationTask"
import { View } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(route){
    const { task } = route.route.params;

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
                  <ModificationTask token={token} task={task}/>
                </View>)
          }}
        </TokenContext.Consumer>
    )
}