import { StyleSheet, Text, View } from 'react-native';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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