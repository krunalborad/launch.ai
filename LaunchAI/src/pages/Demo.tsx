import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const features = [
    "AI-powered idea validation",
    "No-code MVP builder",
    "Investor matching",
    "Growth analytics dashboard",
    "Community & mentorship",
  ];

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
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center group cursor-pointer hover:border-primary/50 transition-all">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </div>
                <span className="text-muted-foreground">Watch the 3-minute demo</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                See <span className="gradient-text">LaunchAI</span> in Action
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover how our platform helps AI founders go from idea to funded startup in weeks, not months.
              </p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/get-started">Start Free Trial</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/schedule">Schedule a Call</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;