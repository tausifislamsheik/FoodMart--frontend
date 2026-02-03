import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["123 Food Street, Suite 456", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["hello@foodmart.com", "support@foodmart.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      {contactDetails.map((item, index) => (
        <div
          key={item.title}
          className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <item.icon className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
            {item.details.map((detail, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {detail}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
