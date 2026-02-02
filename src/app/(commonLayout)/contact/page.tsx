// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
// import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";

// const contactSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(1, { message: "Name is required" })
//     .max(100, { message: "Name must be less than 100 characters" }),
//   email: z
//     .string()
//     .trim()
//     .email({ message: "Please enter a valid email address" })
//     .max(255, { message: "Email must be less than 255 characters" }),
//   subject: z
//     .string()
//     .trim()
//     .min(1, { message: "Subject is required" })
//     .max(200, { message: "Subject must be less than 200 characters" }),
//   message: z
//     .string()
//     .trim()
//     .min(10, { message: "Message must be at least 10 characters" })
//     .max(1000, { message: "Message must be less than 1000 characters" }),
// });

// type ContactFormValues = z.infer<typeof contactSchema>;

// const contactInfo = [
//   {
//     icon: Mail,
//     title: "Email Us",
//     details: "support@foodmart.com",
//     subDetails: "We reply within 24 hours",
//   },
//   {
//     icon: Phone,
//     title: "Call Us",
//     details: "+1 (555) 123-4567",
//     subDetails: "Mon-Fri, 9am-6pm EST",
//   },
//   {
//     icon: MapPin,
//     title: "Visit Us",
//     details: "123 Food Street",
//     subDetails: "New York, NY 10001",
//   },
//   {
//     icon: Clock,
//     title: "Business Hours",
//     details: "Mon - Fri: 9am - 6pm",
//     subDetails: "Sat - Sun: 10am - 4pm",
//   },
// ];

const Contact = () => {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const { toast } = useToast();

  // const form = useForm<ContactFormValues>({
  //   resolver: zodResolver(contactSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   },
  // });

  // const onSubmit = async (data: ContactFormValues) => {
  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
    
  //   toast({
  //     title: "Message Sent!",
  //     description: "We'll get back to you as soon as possible.",
  //   });
    
  //   form.reset();
  //   setIsSubmitting(false);
  // };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help.
              Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        
        {/* FAQ CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have More Questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out our FAQ section for quick answers to common questions
              about orders, delivery, and more.
            </p>
            <Button variant="outline" size="lg">
              View FAQs
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;

