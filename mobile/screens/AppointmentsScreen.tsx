import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Surface, Chip, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Counselor = {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  availability: string;
};

type Appointment = {
  id: number;
  counselorId: number;
  date: string;
  type: 'career' | 'academic' | 'wellness';
  status: string;
};

export default function AppointmentsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('career');
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);

  // Mock data - will be replaced with API calls
  const counselors: Counselor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Career Guidance',
      imageUrl: 'https://example.com/sarah.jpg',
      availability: 'Mon-Fri',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Academic Planning',
      imageUrl: 'https://example.com/michael.jpg',
      availability: 'Tue-Thu',
    },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      counselorId: 1,
      date: '2025-02-25T10:00:00',
      type: 'career',
      status: 'scheduled',
    },
  ];

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    console.log('Booking appointment...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Available Counselors
        </Text>

        <View style={styles.counselorList}>
          {counselors.map((counselor) => (
            <Surface key={counselor.id} style={styles.counselorCard}>
              <Card
                onPress={() => setSelectedCounselor(counselor.id)}
                style={[
                  styles.card,
                  selectedCounselor === counselor.id && styles.selectedCard,
                ]}
              >
                <Card.Content>
                  <View style={styles.counselorHeader}>
                    <MaterialCommunityIcons 
                      name="account-circle" 
                      size={48} 
                      color="#14234c" 
                    />
                    <View style={styles.counselorInfo}>
                      <Text variant="titleMedium">{counselor.name}</Text>
                      <Text variant="bodyMedium">{counselor.specialization}</Text>
                      <Text variant="bodySmall">Available: {counselor.availability}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Surface>
          ))}
        </View>

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Book Appointment
        </Text>

        <Surface style={styles.bookingForm}>
          <SegmentedButtons
            value={selectedType}
            onValueChange={setSelectedType}
            buttons={[
              { value: 'career', label: 'Career' },
              { value: 'academic', label: 'Academic' },
              { value: 'wellness', label: 'Wellness' },
            ]}
            style={styles.segment}
          />

          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <MaterialCommunityIcons name="calendar" size={20} style={styles.buttonIcon} />
            {selectedDate.toLocaleDateString()}
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Button
            mode="contained"
            onPress={handleBooking}
            disabled={!selectedCounselor}
            style={styles.bookButton}
          >
            Book Appointment
          </Button>
        </Surface>

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Your Appointments
        </Text>

        <View style={styles.appointmentList}>
          {appointments.map((appointment) => (
            <Surface key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentInfo}>
                <Text variant="titleMedium">
                  {counselors.find(c => c.id === appointment.counselorId)?.name}
                </Text>
                <Text variant="bodyMedium">
                  {new Date(appointment.date).toLocaleDateString()}
                </Text>
                <Chip style={styles.typeChip}>
                  {appointment.type}
                </Chip>
              </View>
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
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  counselorList: {
    marginBottom: 24,
  },
  counselorCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
  },
  selectedCard: {
    backgroundColor: '#f0f0f0',
  },
  counselorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counselorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  bookingForm: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  segment: {
    marginBottom: 16,
  },
  dateButton: {
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  bookButton: {
    marginTop: 8,
  },
  appointmentList: {
    marginBottom: 24,
  },
  appointmentCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  appointmentInfo: {
    gap: 4,
  },
  typeChip: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});
