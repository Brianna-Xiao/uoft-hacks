import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const menuItems = [
    { title: 'Edit Profile', icon: require('../assets/editprofile.png') },
    { title: 'Languages', icon: require('../assets/language.png') },
    { title: 'History', icon: require('../assets/history.png') },
    { title: 'Settings', icon: require('../assets/settings.png') },
    { title: 'Log Out', icon: require('../assets/logout.png') },
  ];

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
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => console.log(`Pressed ${item.title}`)}
          >
            <View style={styles.menuItemContent}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 30,
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
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 24,
    color: '#999',
  },
}); 