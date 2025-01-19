import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ShopScreen from './screens/ShopScreen';
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

            if (route.name === 'Shop') {
              imageSource = require('./assets/shop.png');
            } else if (route.name === 'Profile') {
              imageSource = require('./assets/profile.png');
            } else if (route.name === 'Status') {
              imageSource = require('./assets/status.png');
            }

            return (
              <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
                <Image source={imageSource} style={styles.icon} />
              </View>
            );
          },
          tabBarShowLabel: false,
          headerStyle: {
            height: 110,
          },
        })}
      >
        <Tab.Screen name="Status" component={StatusScreen} />
        <Tab.Screen 
          name="Shop" 
          component={ShopScreen}
          options={{
            headerRight: () => (
              <View style={styles.headerCoinContainer}>
                <Image 
                  source={require('./assets/coin.png')} 
                  style={styles.headerCoin}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  focusedIcon: {
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerCoinContainer: {
    marginRight: 15,
  },
  headerCoin: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
  }
});