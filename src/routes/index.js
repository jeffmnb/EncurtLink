import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerRoute } from './DrawerRoute/Drawer.routes';
export const RoutesApp = () => {
    return (
        <NavigationContainer>
            <DrawerRoute />
        </NavigationContainer>
    )
}