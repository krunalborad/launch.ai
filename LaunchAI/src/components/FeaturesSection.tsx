import { motion } from "framer-motion";
import { Brain, Rocket, Users, Shield, LineChart, Code2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get intelligent market analysis, competitor research, and product recommendations powered by cutting-edge AI models.",
  },
  {
    icon: Code2,
    title: "No-Code Builder",
    description: "Build MVPs without writing code. Our visual builder lets you create AI products with drag-and-drop simplicity.",
  },
  {
    icon: Users,
    title: "Founder Community",
    description: "Connect with 2,500+ AI founders. Share insights, find co-founders, and learn from successful entrepreneurs.",
  },
  {
    icon: Rocket,
    title: "Launch Accelerator",
    description: "12-week program with mentorship from industry leaders, investor introductions, and go-to-market support.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2 compliant infrastructure. Your data and AI models are protected with enterprise-grade security.",
  },
  {
    icon: LineChart,
    title: "Growth Analytics",
    description: "Track KPIs, user behavior, and revenue metrics. AI-powered recommendations to optimize your growth.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            From ideation to IPO, our platform provides comprehensive tools and resources 
            for every stage of your AI startup journey.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
