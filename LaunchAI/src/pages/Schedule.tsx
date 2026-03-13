import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const Schedule = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime && email) {
      toast.success("Call scheduled!", {
        description: `We'll send a calendar invite to ${email} for ${selectedTime}.`,
      });
      setSelectedTime("");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="hero-glow bg-primary left-1/4 top-1/4 animate-pulse-glow" />
      <div className="hero-glow bg-secondary right-1/4 bottom-1/4 animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Video className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Schedule a Call</h1>
                <p className="text-sm text-muted-foreground">30-minute intro call with our team</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">30 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Quick intro to LaunchAI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Video Call</h3>
                    <p className="text-sm text-muted-foreground">We'll send you a Zoom link</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">What to Expect</h3>
                    <p className="text-sm text-muted-foreground">
                      Platform demo, Q&A, and discussion of your startup goals
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Select a Time (EST)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedTime === time
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border bg-muted/50 hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-muted/50 border-border"
                    required
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" size="lg" disabled={!selectedTime}>
                  Confirm Booking
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Schedule;