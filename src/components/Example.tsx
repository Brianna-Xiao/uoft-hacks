import { View, Text, TouchableOpacity } from 'react-native';

export default function Example() {
  return (
    <View className="p-4">
      <Text className="text-xl font-bold text-blue-500">
        Hello NativeWind!
      </Text>
      
      <TouchableOpacity 
        className="mt-4 bg-blue-500 p-4 rounded-lg active:bg-blue-600"
        onPress={() => console.log('Pressed!')}
      >
        <Text className="text-white text-center font-semibold">
          Press Me
        </Text>
      </TouchableOpacity>
    </View>
  );
} 