import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../pages/Home';
import { MyLinks } from '../../pages/MyLinks';

import {Feather, Ionicons} from '@expo/vector-icons';

export const DrawerRoute = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator  drawerContentOptions={{
            activeBackgroundColor:'#1ddbb9',
            activeTintColor:'#FFF',
            labelStyle:{fontSize:20}  
        }}>
            
            <Drawer.Screen name='Encurtar' component={Home} options={{
                drawerIcon: ({focused, color, size}) => (
                    <Feather name='link' size={size} color={color} style={{left:7}} />
                ) }}/>

            <Drawer.Screen name='MyLinks' component={MyLinks} options={{
                drawerIcon:({focused, color, size})=> (
                    <Ionicons name="bar-chart-outline" size={size} color={color} style={{left:7}}/>
                )
            }}/>
        </Drawer.Navigator>
    )
}