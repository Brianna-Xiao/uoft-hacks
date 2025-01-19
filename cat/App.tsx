import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import StatusScreen from './screens/StatusScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let imageSource;

            if (route.name === 'History') {
              imageSource = require('./assets/history.png');
            } else if (route.name === 'Profile') {
              imageSource = require('./assets/profile.png');
            } else if (route.name === 'Status') {
              imageSource = require('./assets/status.png');
            }

            return (
              <View style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer
              ]}>
                <Image source={imageSource} style={styles.icon} />
              </View>
            );
          },
          tabBarStyle: {
            height: 100,
            paddingTop: 15,
            paddingBottom: 20,
            borderTopWidth: 1,
            borderTopColor: '#999',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            paddingBottom: 12,
            marginTop: 8,
          },
        })}
        initialRouteName="History"
      >
        <Tab.Screen name="Status"  component={StatusScreen}/>
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
  },
  focusedIconContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  icon: {
    width: 32,
    height: 32,
  },
});
