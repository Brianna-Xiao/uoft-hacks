import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Sleep from '../components/Sleep';
import { Subscription } from 'expo-sensors/build/Pedometer';
import Sick from '../components/Sick';

export default function StatusScreen() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [orientation, setOrientation] = useState('');
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        if (accelerometerData.z > 0.7) {
          setOrientation('up');
          setIsPaused(true);
        } else {
          setOrientation('');
        }
      })
    );
    Accelerometer.setUpdateInterval(1000);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setIsPaused(false);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds]);

  const startTimer = () => {
    if (minutes) {
      setSeconds(parseInt(minutes) * 60);
      setIsActive(true);
      setMinutes('');
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setIsPaused(false);
  };

  const toggleTimer = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              {!isActive ? (
                <Sleep />
              ) : orientation === 'up' ? (
                <Sick />
              ) : (
                <Sleep />
              )}
            </View>
            <View style={styles.timerContainer}>
              {!isActive ? (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={minutes}
                    onChangeText={setMinutes}
                    placeholder="Enter minutes"
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={startTimer}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.controlButton]}
                      onPress={toggleTimer}
                    >
                      <Text style={styles.buttonText}>
                        {isPaused ? 'Resume' : 'Pause'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.controlButton, styles.stopButton]}
                      onPress={stopTimer}
                    >
                      <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  timerContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: 120,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#699AB2',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  controlButton: {
    marginHorizontal: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#8B6B54',
  },
});