import React, {useEffect, useState } from 'react'
import { View, Text, Button, FlatList} from 'react-native'
import { List, RadioButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

import { getMyManager, getChefsOfManager, getProjectStepDone, getManager, updateManager } from '../API/todoAPI';
import Todolists from './Todolists';

export default function Profil (hierarchy,username,token){ //Pour une raison étrange (probablement dû au link dans la navigation), tous se trouve dans hierarchy

    const [myManager, setMyManager] = useState('')
    const [listChefs, setListChefs] = useState([])
    const [pendingProject, setPendingProject] = useState([])
    const [managerChecked, setManagerChecked] = useState("")
    const [managerList, setManagerList] = useState([])
    const [visible, setVsisble] = useState(false)

    const navigation = useNavigation();

    const renderListItemChefs = () => {
        const listItems = []
        for(let item of listChefs){
            listItems.push(
                <List.Item
                    key={item}
                    title={item}
                />
            );
        }
        return listItems
    }


    const renderListItemProject = () => {
        if(hierarchy.hierarchy === "Manager"){ // Nous pouvons pas le mettre dans le callback car il y avait des erreurs avec le "usernameInArray" qui était de longueur 0 même si il était rempli
            getProjectStepDone(listChefs).then(project => {
                setPendingProject(project)
            });
        }
        const listItems = []
        for(let item of Object.keys(pendingProject)){
            listItems.push(
                <List.Item
                    key={pendingProject[item].title}
                    title={pendingProject[item].title} 
                    onPress={() => {
                        navigation.navigate("TodoList", {
                            title: pendingProject[item].title,
                            usernameOfOwner : pendingProject[item].owner.username
                        });
                    }}/>
            );
        }
        return listItems
    }

    const callback = () => {
        if(hierarchy.hierarchy === "ProjectChef"){
            getMyManager(hierarchy.username).then(manager => {
                setMyManager(manager)
            });
            getProjectStepDone([hierarchy.username]).then(project => {
                setPendingProject(project)
            })
        getManager().then(managers => {
            setManagerList(managers)
            })
        }
        else{
            const usernameInArray = []
            getChefsOfManager(hierarchy.username,token).then(projectChefs => {
                projectChefs.forEach(element => {
                    usernameInArray.push(element.username)
                });
                setListChefs(usernameInArray)
            });
        }
    }   
    useEffect(()=> {
        callback()
    }, [])

    return (
        <View>
            <Text style={{fontWeight:"bold", padding:20}}>{hierarchy.username}</Text>
            <List.Section>
                {hierarchy.hierarchy === "ProjectChef" ? (
                 <><List.Accordion
                        title="Votre responsable"
                        left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title={myManager} />
                    </List.Accordion>
                    <List.Accordion
                        title="Vos demandes en cours"
                        left={props => <List.Icon {...props} icon="folder" />}>
                            {pendingProject.length !==0 ? renderListItemProject() : []}
                    </List.Accordion>
                </>): (
                <><List.Accordion
                    title="Vos esclaves"
                    left={props => <List.Icon {...props} icon="folder" />}>
                        {listChefs.length !== 0 ? renderListItemChefs() : []}
                </List.Accordion>
                <List.Accordion
                    title="Les projets nécessitant une réponse"
                    left={props => <List.Icon {...props} icon="folder" />}>
                        {renderListItemProject()}
                </List.Accordion>
            </>
                )}
        </List.Section>
        { hierarchy.hierarchy === "ProjectChef" ? (
            <Button title={visible ? "Annuler" : "Changer de responsable"} onPress={() => { setVsisble(!visible) } } />
            ) : []} 
        {visible ? (
            <><FlatList
                style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
                data={managerList}
                renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                    <RadioButton
                        status={managerChecked === item.username ? 'checked' : 'unchecked'}
                        onPress={() => setManagerChecked(item.username)} />
                    <Text>{item.username}</Text>
                </View>} />
                <Button title='Valider' onPress={() => { updateManager(hierarchy.username,myManager,managerChecked,hierarchy.token).then(navigation.navigate("TodoLists"))} } /></>
        ) : []}
        </View>
    )
}
