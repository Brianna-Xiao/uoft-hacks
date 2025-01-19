import { StyleSheet, Text, View, Image } from 'react-native';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Image 
          source={require('../assets/coin.png')}
          style={styles.coinImage}
        />
      </View>
      <Text style={styles.title}>Shop</Text>
      <View style={styles.contentContainer}>
        <Text>Available Items</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coinContainer: {
    position: 'absolute',
    top: 10,          // reduced from 50
    right: 80,        // changed from left: 20
    zIndex: 1,
  },
  coinImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  }
});