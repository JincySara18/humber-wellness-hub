import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    {
      title: 'AI Chat Support',
      description: 'Get instant answers to your questions',
      icon: 'message-text',
      route: 'Chat',
    },
    {
      title: 'Book Appointments',
      description: 'Schedule counseling sessions',
      icon: 'calendar',
      route: 'Appointments',
    },
    {
      title: 'Resources',
      description: 'Access wellness materials',
      icon: 'book-open-variant',
      route: 'Resources',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome to Humber Wellness Hub
        </Text>

        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <Surface key={index} style={styles.card}>
              <Card onPress={() => navigation.navigate(item.route)}>
                <Card.Content style={styles.cardContent}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={32} 
                    color="#14234c" 
                  />
                  <Text variant="titleMedium" style={styles.cardTitle}>
                    {item.title}
                  </Text>
                  <Text variant="bodyMedium" style={styles.cardDescription}>
                    {item.description}
                  </Text>
                </Card.Content>
              </Card>
            </Surface>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    gap: 16,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardTitle: {
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '600',
  },
  cardDescription: {
    textAlign: 'center',
    color: '#666',
  },
});