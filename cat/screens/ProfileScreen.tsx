import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image 
          source={require('../assets/profile.png')} 
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: Brianna</Text>
          <Text style={styles.infoText}>Age: 18</Text>
          <Text style={styles.infoText}>Favourite colour: Purple</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
}); 