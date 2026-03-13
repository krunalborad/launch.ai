import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Lightbulb, Wrench, Rocket, TrendingUp, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  {
    icon: Lightbulb,
    step: 1,
    title: "Validate Your Idea",
    description: "Tell us about your AI startup idea",
    fields: ["ideaName", "ideaDescription"],
  },
  {
    icon: Wrench,
    step: 2,
    title: "Build Your MVP",
    description: "Define your product features",
    fields: ["targetAudience", "keyFeatures"],
  },
  {
    icon: Rocket,
    step: 3,
    title: "Launch Strategy",
    description: "Plan your go-to-market approach",
    fields: ["launchTimeline", "marketingChannels"],
  },
  {
    icon: TrendingUp,
    step: 4,
    title: "Scale & Grow",
    description: "Set your growth goals",
    fields: ["fundingGoal", "growthMetrics"],
  },
];

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    ideaName: "",
    ideaDescription: "",
    targetAudience: "",
    keyFeatures: "",
    launchTimeline: "",
    marketingChannels: "",
    fundingGoal: "",
    growthMetrics: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.success("Your startup journey begins! 🚀", {
        description: "We'll analyze your idea and get back to you within 24 hours.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ideaName">Startup Name</Label>
              <Input
                id="ideaName"
                placeholder="e.g., AI Assistant Pro"
                value={formData.ideaName}
                onChange={(e) => handleInputChange("ideaName", e.target.value)}
                className="mt-1 bg-muted/50 border-border"
              />
            </div>
            <div>
              <Label htmlFor="ideaDescription">Describe Your AI Idea</Label>
              <Textarea
                id="ideaDescription"
                placeholder="What problem does your AI startup solve?"
                value={formData.ideaDescription}
                onChange={(e) => handleInputChange("ideaDescription", e.target.value)}
                className="mt-1 bg-muted/50 border-border min-h-[100px]"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., Small business owners, developers"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                className="mt-1 bg-muted/50 border-border"
              />
            </div>
            <div>
              <Label htmlFor="keyFeatures">Key Features</Label>
              <Textarea
                id="keyFeatures"
                placeholder="List the main features of your MVP"
                value={formData.keyFeatures}
                onChange={(e) => handleInputChange("keyFeatures", e.target.value)}
                className="mt-1 bg-muted/50 border-border min-h-[100px]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="launchTimeline">Launch Timeline</Label>
              <Input
                id="launchTimeline"
                placeholder="e.g., 3 months, Q2 2024"
                value={formData.launchTimeline}
                onChange={(e) => handleInputChange("launchTimeline", e.target.value)}
                className="mt-1 bg-muted/50 border-border"
              />
            </div>
            <div>
              <Label htmlFor="marketingChannels">Marketing Channels</Label>
              <Textarea
                id="marketingChannels"
                placeholder="How will you reach your first users?"
                value={formData.marketingChannels}
                onChange={(e) => handleInputChange("marketingChannels", e.target.value)}
                className="mt-1 bg-muted/50 border-border min-h-[100px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fundingGoal">Funding Goal</Label>
              <Input
                id="fundingGoal"
                placeholder="e.g., $500K seed round"
                value={formData.fundingGoal}
                onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                className="mt-1 bg-muted/50 border-border"
              />
            </div>
            <div>
              <Label htmlFor="growthMetrics">Growth Metrics</Label>
              <Textarea
                id="growthMetrics"
                placeholder="What metrics will you track? (MRR, Users, etc.)"
                value={formData.growthMetrics}
                onChange={(e) => handleInputChange("growthMetrics", e.target.value)}
                className="mt-1 bg-muted/50 border-border min-h-[100px]"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-12">
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

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === index ? 1.1 : 1,
                    backgroundColor: currentStep >= index ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  }}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                    currentStep >= index ? "border-primary" : "border-border"
                  }`}
                >
                  {currentStep > index ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <step.icon className={`h-5 w-5 ${currentStep >= index ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-8 md:w-16 lg:w-24 mx-2 rounded transition-colors ${currentStep > index ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="hidden md:flex items-center justify-between mb-8 -mt-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center" style={{ width: index === steps.length - 1 ? "auto" : "calc(25% - 1rem)" }}>
                <span className={`text-xs font-medium ${currentStep >= index ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="glass-card p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                    {(() => {
                      const Icon = steps[currentStep].icon;
                      return <Icon className="h-5 w-5 text-primary-foreground" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium">Step {currentStep + 1} of {steps.length}</span>
                    <h2 className="font-display text-xl font-bold">{steps[currentStep].title}</h2>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {steps[currentStep].description}
                </p>

                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                className="gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Launch My Startup
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Step Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Your progress is automatically saved. You can return anytime to continue.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;