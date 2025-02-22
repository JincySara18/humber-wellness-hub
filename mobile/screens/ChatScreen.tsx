import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Message = {
  id: number;
  message: string;
  response: string;
  timestamp: string;
};

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    // TODO: Implement API call to backend
    // For now, simulate response
    const newMessage = {
      id: Date.now(),
      message: message.trim(),
      response: "I'm your AI counselor. I'll be able to help you once we connect to the backend API.",
      timestamp: new Date().toISOString(),
    };

    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.messageList}>
          {chatHistory.map((chat) => (
            <View key={chat.id} style={styles.messageContainer}>
              <Surface style={styles.userMessage}>
                <Text>{chat.message}</Text>
              </Surface>
              <Surface style={styles.aiMessage}>
                <Text>{chat.response}</Text>
              </Surface>
            </View>
          ))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <MaterialCommunityIcons 
                name="loading" 
                size={24} 
                color="#666"
                style={styles.loadingIcon}
              />
              <Text variant="bodySmall">AI is thinking...</Text>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            mode="outlined"
            style={styles.input}
            multiline
            maxLength={500}
          />
          <Button
            mode="contained"
            onPress={handleSend}
            disabled={isLoading || !message.trim()}
            style={styles.sendButton}
          >
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
    marginBottom: 8,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#14234c',
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  loadingIcon: {
    marginRight: 8,
  },
});
