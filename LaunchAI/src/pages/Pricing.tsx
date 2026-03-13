import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring and validating your idea",
    features: [
      "AI idea validator",
      "Basic analytics",
      "Community access",
      "1 project",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For serious founders ready to build and launch",
    features: [
      "Everything in Starter",
      "No-code MVP builder",
      "Advanced analytics",
      "Investor database",
      "5 projects",
      "Priority support",
      "Weekly office hours",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Accelerator",
    price: "$499",
    period: "/month",
    description: "Full accelerator experience with mentorship",
    features: [
      "Everything in Pro",
      "1-on-1 mentorship",
      "Investor introductions",
      "Pitch deck review",
      "Unlimited projects",
      "Dedicated success manager",
      "Demo day access",
    ],
    cta: "Apply Now",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="hero-glow bg-primary left-1/4 top-1/4 animate-pulse-glow" />
        <div className="hero-glow bg-secondary right-1/4 bottom-1/4 animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Pricing</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-card p-8 relative ${
                  plan.popular ? "border-primary/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <h3 className="font-display text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <Button
                  variant={plan.popular ? "hero" : "heroOutline"}
                  className="w-full mb-6"
                  asChild
                >
                  <Link to={plan.name === "Accelerator" ? "/apply" : "/get-started"}>
                    {plan.cta}
                  </Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
