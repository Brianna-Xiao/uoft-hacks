import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-slate-800 font-semibold text-2xl">
        Welcome to NativeWind!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
} 