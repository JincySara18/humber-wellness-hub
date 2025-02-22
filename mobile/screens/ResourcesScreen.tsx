import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const resources = [
  {
    category: 'Career Development',
    icon: 'briefcase',
    items: [
      { title: 'Resume Writing Guide', route: 'ResumeGuide' },
      { title: 'Interview Preparation Tips', route: 'InterviewTips' },
      { title: 'Job Search Strategies', route: 'JobSearch' },
    ],
  },
  {
    category: 'Academic Success',
    icon: 'school',
    items: [
      { title: 'Study Skills Workshop', route: 'StudySkills' },
      { title: 'Time Management Guide', route: 'TimeManagement' },
      { title: 'Research Methods', route: 'Research' },
    ],
  },
  {
    category: 'Mental Wellness',
    icon: 'heart',
    items: [
      { title: 'Stress Management', route: 'StressManagement' },
      { title: 'Mindfulness Techniques', route: 'Mindfulness' },
      { title: 'Work-Life Balance', route: 'WorkLifeBalance' },
    ],
  },
];

export default function ResourcesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.title}>
          Student Resources
        </Text>

        {resources.map((category, index) => (
          <Surface key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <MaterialCommunityIcons 
                name={category.icon} 
                size={24} 
                color="#14234c" 
              />
              <Text variant="titleLarge" style={styles.categoryTitle}>
                {category.category}
              </Text>
            </View>

            <View style={styles.resourceList}>
              {category.items.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  onPress={() => navigation.navigate(item.route)}
                  style={styles.resourceCard}
                >
                  <Card.Content style={styles.resourceContent}>
                    <MaterialCommunityIcons 
                      name="file-document-outline" 
                      size={20} 
                      color="#666" 
                    />
                    <Text variant="bodyLarge" style={styles.resourceTitle}>
                      {item.title}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </Surface>
        ))}

        <Surface style={styles.featuredResource}>
          <Text variant="titleLarge" style={styles.featuredTitle}>
            Featured Resource
          </Text>
          <Card>
            <Card.Content>
              <Text variant="titleMedium" style={styles.featuredSubtitle}>
                Complete Guide to Academic Success
              </Text>
              <Text variant="bodyMedium" style={styles.featuredDescription}>
                A comprehensive resource covering study techniques, time management,
                and exam preparation strategies.
              </Text>
            </Card.Content>
          </Card>
        </Surface>
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
  },
  categoryCard: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    marginLeft: 12,
    fontWeight: '600',
  },
  resourceList: {
    gap: 8,
  },
  resourceCard: {
    backgroundColor: '#f8f8f8',
  },
  resourceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceTitle: {
    marginLeft: 12,
  },
  featuredResource: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  featuredTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    marginBottom: 8,
  },
  featuredDescription: {
    color: '#666',
  },
});
