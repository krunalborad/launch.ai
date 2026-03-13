import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const startups = [
  {
    name: "NeuralVoice",
    category: "Voice AI",
    description: "Real-time voice cloning and synthesis for enterprises",
    funding: "$12M Series A",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "DataMind",
    category: "Analytics",
    description: "AI-powered business intelligence platform",
    funding: "$8M Seed",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "CodePilot",
    category: "Developer Tools",
    description: "Autonomous code review and optimization",
    funding: "$25M Series B",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "HealthAI",
    category: "Healthcare",
    description: "Predictive diagnostics for early disease detection",
    funding: "$18M Series A",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "LegalBot",
    category: "LegalTech",
    description: "Contract analysis and legal document automation",
    funding: "$6M Seed",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "FinanceAI",
    category: "FinTech",
    description: "Algorithmic trading with explainable AI",
    funding: "$40M Series B",
    gradient: "from-yellow-500 to-orange-600",
  },
];

const StartupsSection = () => {
  return (
    <section id="startups" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Startups That{" "}
            <span className="gradient-text">Launched With Us</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Join the ranks of successful AI companies that started their journey 
            on our platform.
          </p>
        </motion.div>

        {/* Startups grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Logo placeholder */}
              <div className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${startup.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                {startup.name.charAt(0)}
              </div>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                    {startup.name}
                  </h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {startup.category}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-muted-foreground text-sm mb-4">{startup.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-sm font-medium text-secondary">{startup.funding}</span>
                <span className="text-xs text-muted-foreground">View Case Study →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupsSection;