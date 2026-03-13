import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Apply = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    idea: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to submit an application");
      navigate("/signin");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("applications").insert({
      user_id: user.id,
      company_name: formData.company,
      idea_description: formData.idea,
    } as any);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Application submitted!", {
        description: "We'll review your application and get back to you within 48 hours.",
      });
      setFormData({ name: "", email: "", company: "", idea: "" });
      navigate("/dashboard");
    }
    setLoading(false);
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
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Apply to LaunchAI</h1>
                <p className="text-sm text-muted-foreground">Join our next cohort</p>
              </div>
            </div>

            <div className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Limited Spots</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Applications for the Winter 2026 cohort close in 14 days. Only 25 spots available.
              </p>
            </div>

            {!user && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-muted-foreground">
                  You need to <Link to="/signin" className="text-primary hover:underline">sign in</Link> to submit an application.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 bg-muted/50 border-border" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@startup.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 bg-muted/50 border-border" required />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Startup Name</Label>
                <Input id="company" placeholder="My AI Startup" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="mt-1 bg-muted/50 border-border" required />
              </div>

              <div>
                <Label htmlFor="idea">Describe your AI startup idea</Label>
                <Textarea id="idea" placeholder="Tell us about the problem you're solving..." value={formData.idea} onChange={(e) => setFormData({ ...formData, idea: e.target.value })} className="mt-1 bg-muted/50 border-border min-h-[150px]" required />
              </div>

              <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" /> : "Submit Application"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;