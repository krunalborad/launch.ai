import { motion } from "framer-motion";
import { Lightbulb, Wrench, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Validate Your Idea",
    description: "Use our AI tools to analyze market fit, identify competitors, and validate your startup concept.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build Your MVP",
    description: "Create your minimum viable product using our no-code builder and pre-built AI components.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Iterate",
    description: "Deploy your product, gather user feedback, and iterate quickly with AI-powered insights.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Scale & Grow",
    description: "Access funding opportunities, growth tools, and expert mentorship to scale your startup.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            From Idea to{" "}
            <span className="gradient-text">Unicorn</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our proven four-step process has helped thousands of founders
            turn their AI ideas into successful businesses.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;