"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }

    if (formData.email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.message.length > 1000) {
      toast.error("Message must be less than 1000 characters");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 bg-muted/50 border-border focus:border-orange-500 focus:ring-orange-500"
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 bg-muted/50 border-border focus:border-orange-500 focus:ring-orange-500"
            maxLength={255}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-foreground font-medium">
          Subject
        </Label>
        <Input
          id="subject"
          placeholder="How can we help you?"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="h-12 bg-muted/50 border-border focus:border-orange-500 focus:ring-orange-500"
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground font-medium">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your inquiry..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px] bg-muted/50 border-border focus:border-orange-500 focus:ring-orange-500 resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.message.length}/1000
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 gradient-primary bg-orange-500 shadow-button hover:opacity-90 transition-all text-base font-medium cursor-pointer"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
