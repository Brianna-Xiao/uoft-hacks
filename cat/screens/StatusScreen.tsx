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

var checkOrientation 

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
        const { z } = accelerometerData;
        if (z > 0.7) {
          // setOrientation('Phone is facing down');
          setOrientation('down');
        } else if (z < -0.7) {
          // setOrientation('Phone is facing up');
          setOrientation('up');
        } else {
          setOrientation('');
        }
      })
    );
    Accelerometer.setUpdateInterval(1000); //update once every second but maybe lower to make more seamless later
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
      setIsPaused(false);
      setMinutes('');
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.content}>
          <Text style={styles.title}>Status</Text>
            {orientation === 'up' ? (
              <Sick />
            ): (<Sleep />)}
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
              <View style={styles.activeTimerContainer}>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.button, styles.controlButton]}
                    onPress={togglePause}
                  >
                    <Text style={styles.buttonText}>
                      {isPaused ? 'Resume' : 'Pause'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.controlButton, styles.stopButton]}
                    onPress={stopTimer}
                  >
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* <Text style={styles.orientationText}>{orientation}</Text> */}
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerContainer: {
    padding: 20,
    marginBottom: 80,
    alignItems: 'center',
  },
  activeTimerContainer: {
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
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  controlButton: {
    marginHorizontal: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  orientationText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
}); 