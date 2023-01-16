import React, {useEffect, useState } from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import { List, RadioButton, Text, Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from 'react-native-awesome-alerts';

import { getMyManager, getChefsOfManager, getProjectStepDone, getManager, updateManager } from '../API/todoAPI';
import Logo from '../images/profil.svg';


export default function Profil (hierarchy,username,token){ //Pour une raison étrange (probablement dû au link dans la navigation), tous se trouve dans hierarchy
    
    const {height, width} = useWindowDimensions();
    const [myManager, setMyManager] = useState('')
    const [listChefs, setListChefs] = useState([])
    const [pendingProject, setPendingProject] = useState([])
    const [managerChecked, setManagerChecked] = useState("")
    const [managerList, setManagerList] = useState([])
    const [visible, setVsisble] = useState(false)
    const [showable,setShowable] = useState(false)


    const navigation = useNavigation();

    const renderListItemChefs = () => {
        const listItems = []
        for(let item of listChefs){
            listItems.push(
                <List.Item
                    titleStyle={{color:"#01796f"}}
                    key={item}
                    title={item}
                    left={props => <List.Icon {...props} icon="account" color='#01796f'/>}
                />
            );
        }
        return listItems
    }


    const renderListItemProject = () => {
        const listItems = []
        for(let item of Object.keys(pendingProject)){
            listItems.push(
                <List.Item
                    titleStyle={{color:"#01796f",fontWeight:"bold"}}
                    key={pendingProject[item].title}
                    title={pendingProject[item].title} 
                    left={props => <List.Icon {...props} icon="eye" color='#01796f'/>}
                    onPress={() => {
                        navigation.navigate("TodoList");
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
                getProjectStepDone(usernameInArray).then(project => {
                    setPendingProject(project)
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
            <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Votre Profil : {hierarchy.username.toUpperCase()}</Text>
            <View style={{marginTop:"5%", marginBottom:'5%', alignItems:"center"}}>
                <Logo width={width/1.5} height={height/6} />
            </View>
            <List.Section>
                {hierarchy.hierarchy === "ProjectChef" ? (
                 <>
                    <List.Accordion
                        theme={{ colors: { primary: '#22577A' }}}
                        titleStyle={{fontWeight:"bold"}}
                        style={{padding:15, backgroundColor:"#90D7B4"}}
                        title="Votre manager"
                        left={props => <List.Icon {...props} icon="account-multiple" />}>
                        <List.Item left={props => <List.Icon {...props} icon="account" color='#01796f'/>} titleStyle={{color:"#01796f",fontWeight:"bold"}} title={myManager} />
                    </List.Accordion>
                    <View
                        style={{
                            borderBottomColor: '#01796f',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <List.Accordion
                        theme={{ colors: { primary: '#22577A' }}}
                        titleStyle={{fontWeight:"bold"}}
                        style={{padding:15, backgroundColor:"#90D7B4"}}
                        title="Vos demandes en cours"
                        left={props => <List.Icon {...props} icon="briefcase-clock" />}>
                        {pendingProject.length !==0 ? renderListItemProject() : []}
                    </List.Accordion>
                </>): (
                <>
                    <List.Accordion
                        theme={{ colors: { primary: '#22577A' }}}
                        style={{padding:15, backgroundColor:"#90D7B4"}}
                        title="Vos collaborateurs"
                        left={props => <List.Icon {...props} icon="account-multiple" />}>
                            {listChefs.length !== 0 ? renderListItemChefs() : []}
                    </List.Accordion>

                    <List.Accordion
                        theme={{ colors: { primary: '#22577A' }}}
                        style={{padding:15, backgroundColor:"#90D7B4"}}
                        title="Action(s) Requise(s)"
                        left={props => <List.Icon {...props} icon="briefcase-clock" />}>
                            {renderListItemProject()}
                    </List.Accordion>
                </>
            )}
        </List.Section>
        
        <AwesomeAlert
            show={showable}
            title="ATTENTION"
            message={"Vous vous apprêtez à changer de manager ("+managerChecked+"), êtes-vous sur ?"}
            showCancelButton={true}
            showConfirmButton={true}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            cancelText="Annuler"
            confirmText="Confirmer"
            confirmButtonColor="#B22222"
            cancelButtonColor="#90D7B4"
            onCancelPressed={() => {
                setShowable(false);
            }}
            onConfirmPressed={() => {
                updateManager(hierarchy.username,myManager,managerChecked,hierarchy.token).then(navigation.navigate("Projects"))
            }}
        />

        { hierarchy.hierarchy === "ProjectChef" ? (
            <Button 
                style={{marginHorizontal:35,marginTop:30,}} 
                labelStyle={visible ? {color:'white'}:{color:'#22577A'}} 
                buttonColor={!visible ? '#90D7B4' : '#01796f'} 
                mode="contained" 
                icon={visible ? "close":"account-switch"} 
                onPress={() => { setVsisble(!visible) } }>

                <Text style={visible ? {color: "white",fontWeight:"bold",textTransform: 'uppercase'} : {color: "#22577A",fontWeight:"bold",textTransform: 'uppercase'}}>
                    {visible ? "ANNULER" : "CHANGER DE MANAGER"}
                </Text>             
   
            </Button>
            ) : []} 

        {visible ? (
            <>
                {managerList.map((item)=> <View key={item.id} style={{ flexDirection: 'row',paddingLeft: 15, paddingTop: 10 }}>
                    <RadioButton
                        color='#90D7B4'
                        status={managerChecked === item.username ? 'checked' : 'unchecked'}
                        onPress={() => setManagerChecked(item.username)} />
                    <Text variant='titleMedium' style={styles.radio}>{item.username}</Text>
                </View>)} 
                <Button 
                    style={{marginHorizontal:35,marginTop:20}} 
                    buttonColor={'#B22222'} 
                    mode="contained" 
                    icon="alert" 
                    onPress={() => {setShowable(true)} }>
                        Valider
                </Button>
            </>
        ) : []}
        </View>
    )
}
const styles = StyleSheet.create({
    radio:{
      marginVertical:7, 
      color:"#01796f"
    }
})