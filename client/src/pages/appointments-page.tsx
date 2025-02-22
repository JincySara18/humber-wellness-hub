import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema } from "@shared/schema";
import { useState } from "react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import CounselorCard from "@/components/counselor-card";
import type { Counselor, Appointment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  const { data: counselors } = useQuery<Counselor[]>({
    queryKey: ["/api/counselors"],
  });

  const { data: appointments } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  // Extend the appointment schema with proper type handling
  const appointmentFormSchema = z.object({
    counselorId: z.string(),
    type: z.enum(["career", "academic", "wellness"]),
  });

  type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      type: "career",
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      if (!selectedDate) {
        throw new Error("Please select a date for your appointment");
      }

      const appointmentData = {
        counselorId: parseInt(data.counselorId, 10),
        type: data.type,
        date: selectedDate.toISOString(),
        status: "scheduled" as const,
      };

      const res = await apiRequest("POST", "/api/appointments", appointmentData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Success",
        description: "Appointment booked successfully!",
      });
      setSelectedDate(undefined);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Please select a date for your appointment",
        variant: "destructive",
      });
      return;
    }
    appointmentMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Counselors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {counselors?.map((counselor) => (
                  <CounselorCard key={counselor.id} counselor={counselor} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="counselorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Counselor</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a counselor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {counselors?.map((counselor) => (
                              <SelectItem key={counselor.id} value={counselor.id.toString()}>
                                {counselor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="career">Career Guidance</SelectItem>
                            <SelectItem value="academic">Academic Planning</SelectItem>
                            <SelectItem value="wellness">Wellness Support</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Select Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border mx-auto"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={appointmentMutation.isPending}
                  >
                    {appointmentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments?.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {counselors?.find((c) => c.id === appointment.counselorId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(appointment.date), "PPP")}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {appointment.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}