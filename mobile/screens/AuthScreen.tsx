import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen({ navigation }) {
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // TODO: Implement authentication logic
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Humber Wellness Hub
          </Text>

          <SegmentedButtons
            value={authMode}
            onValueChange={setAuthMode}
            buttons={[
              { value: 'login', label: 'Login' },
              { value: 'register', label: 'Register' },
            ]}
            style={styles.segment}
          />

          <View style={styles.form}>
            {authMode === 'register' && (
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
            )}

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
            />

            <Button 
              mode="contained" 
              onPress={handleSubmit}
              style={styles.button}
            >
              {authMode === 'login' ? 'Login' : 'Register'}
            </Button>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14234c',
  },
  keyboardView: {
    flex: 1,
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  segment: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});