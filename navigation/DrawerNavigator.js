import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigation from './StackNavigation';
import Profile from '../screens/Profile';

const Draw = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Draw.Navigator screenOptions={{headerShown: false}}>
            <Draw.Screen name='Inicio' component={StackNavigation}/>
            <Draw.Screen name='Perfil' component={Profile}/>
        </Draw.Navigator>
    )
}

export default DrawerNavigator;