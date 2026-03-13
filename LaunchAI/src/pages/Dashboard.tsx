import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Sparkles, LogOut, Lightbulb, FileText, Target, Plus, Brain,
  TrendingUp, Clock, CheckCircle2, AlertCircle, BarChart3
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StartupIdea {
  id: string;
  name: string;
  description: string | null;
  target_audience: string | null;
  key_features: string | null;
  ai_score: number | null;
  ai_feedback: string | null;
  market_analysis: string | null;
  status: string;
  created_at: string;
}

interface Application {
  id: string;
  company_name: string;
  idea_description: string;
  status: string;
  submitted_at: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed_at: string | null;
  status: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showNewIdea, setShowNewIdea] = useState(false);
  const [newIdea, setNewIdea] = useState({ name: "", description: "", target_audience: "", key_features: "" });
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [ideasRes, appsRes, milestonesRes] = await Promise.all([
      supabase.from("startup_ideas").select("*").order("created_at", { ascending: false }),
      supabase.from("applications").select("*").order("submitted_at", { ascending: false }),
      supabase.from("milestones").select("*").order("created_at", { ascending: false }),
    ]);
    if (ideasRes.data) setIdeas(ideasRes.data as StartupIdea[]);
    if (appsRes.data) setApplications(appsRes.data as Application[]);
    if (milestonesRes.data) setMilestones(milestonesRes.data as Milestone[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmitIdea = async () => {
    if (!newIdea.name) return toast.error("Please enter a startup name");
    const { error } = await supabase.from("startup_ideas").insert({
      user_id: user!.id,
      name: newIdea.name,
      description: newIdea.description,
      target_audience: newIdea.target_audience,
      key_features: newIdea.key_features,
    } as any);
    if (error) return toast.error(error.message);
    toast.success("Idea saved!");
    setNewIdea({ name: "", description: "", target_audience: "", key_features: "" });
    setShowNewIdea(false);
    fetchData();
  };

  const analyzeIdea = async (idea: StartupIdea) => {
    setAnalyzing(idea.id);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-idea", {
        body: {
          name: idea.name,
          description: idea.description,
          target_audience: idea.target_audience,
          key_features: idea.key_features,
        },
      });
      if (error) throw error;
      await supabase.from("startup_ideas").update({
        ai_score: data.score,
        ai_feedback: data.feedback,
        market_analysis: data.market_analysis,
        status: "analyzed",
      } as any).eq("id", idea.id);
      toast.success("AI analysis complete!");
      fetchData();
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally {
      setAnalyzing(null);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "analyzed": return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-400" />;
      case "approved": return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="hero-glow bg-primary left-1/4 top-0 animate-pulse-glow opacity-20" />

      {/* Top bar */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">LaunchAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Overview cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Founder Dashboard</h1>
          <p className="text-muted-foreground">Track your startup ideas, applications, and milestones.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Ideas", value: ideas.length, icon: Lightbulb, color: "text-primary" },
            { label: "Analyzed", value: ideas.filter(i => i.status === "analyzed").length, icon: Brain, color: "text-green-400" },
            { label: "Applications", value: applications.length, icon: FileText, color: "text-secondary" },
            { label: "Milestones", value: milestones.length, icon: Target, color: "text-yellow-400" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-display text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="ideas"><Lightbulb className="h-4 w-4 mr-1" /> Ideas</TabsTrigger>
            <TabsTrigger value="applications"><FileText className="h-4 w-4 mr-1" /> Applications</TabsTrigger>
            <TabsTrigger value="milestones"><Target className="h-4 w-4 mr-1" /> Milestones</TabsTrigger>
          </TabsList>

          {/* IDEAS TAB */}
          <TabsContent value="ideas" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-xl font-semibold">Your Startup Ideas</h2>
              <Button variant="hero" size="sm" onClick={() => setShowNewIdea(!showNewIdea)}>
                <Plus className="h-4 w-4 mr-1" /> New Idea
              </Button>
            </div>

            {showNewIdea && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Startup Name</Label>
                    <Input placeholder="My AI Startup" value={newIdea.name} onChange={e => setNewIdea({ ...newIdea, name: e.target.value })} className="mt-1 bg-muted/50 border-border" />
                  </div>
                  <div>
                    <Label>Target Audience</Label>
                    <Input placeholder="Small business owners" value={newIdea.target_audience} onChange={e => setNewIdea({ ...newIdea, target_audience: e.target.value })} className="mt-1 bg-muted/50 border-border" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="What problem does it solve?" value={newIdea.description} onChange={e => setNewIdea({ ...newIdea, description: e.target.value })} className="mt-1 bg-muted/50 border-border" />
                </div>
                <div>
                  <Label>Key Features</Label>
                  <Textarea placeholder="List main features..." value={newIdea.key_features} onChange={e => setNewIdea({ ...newIdea, key_features: e.target.value })} className="mt-1 bg-muted/50 border-border" />
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" onClick={handleSubmitIdea}>Save Idea</Button>
                  <Button variant="outline" onClick={() => setShowNewIdea(false)}>Cancel</Button>
                </div>
              </motion.div>
            )}

            {ideas.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">No ideas yet</h3>
                <p className="text-muted-foreground mb-4">Submit your first startup idea and get AI-powered analysis.</p>
                <Button variant="hero" onClick={() => setShowNewIdea(true)}><Plus className="h-4 w-4 mr-1" /> Add Your First Idea</Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {ideas.map((idea, i) => (
                  <motion.div key={idea.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-lg font-semibold">{idea.name}</h3>
                          {statusIcon(idea.status)}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{idea.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{idea.description}</p>
                      </div>
                      {idea.ai_score !== null && (
                        <div className="flex flex-col items-center ml-4">
                          <div className={`text-2xl font-bold font-display ${idea.ai_score >= 70 ? "text-green-400" : idea.ai_score >= 40 ? "text-yellow-400" : "text-destructive"}`}>
                            {idea.ai_score}
                          </div>
                          <span className="text-xs text-muted-foreground">AI Score</span>
                        </div>
                      )}
                    </div>

                    {idea.ai_feedback && (
                      <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-1 mb-1">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary">AI Feedback</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{idea.ai_feedback}</p>
                      </div>
                    )}

                    {idea.market_analysis && (
                      <div className="mt-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                        <div className="flex items-center gap-1 mb-1">
                          <BarChart3 className="h-4 w-4 text-secondary" />
                          <span className="text-xs font-medium text-secondary">Market Analysis</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{idea.market_analysis}</p>
                      </div>
                    )}

                    {idea.status !== "analyzed" && (
                      <Button variant="heroOutline" size="sm" className="mt-3" onClick={() => analyzeIdea(idea)} disabled={analyzing === idea.id}>
                        {analyzing === idea.id ? (
                          <><div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-1" /> Analyzing...</>
                        ) : (
                          <><Brain className="h-4 w-4 mr-1" /> Analyze with AI</>
                        )}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* APPLICATIONS TAB */}
          <TabsContent value="applications" className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Your Applications</h2>
            {applications.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">Apply to the LaunchAI accelerator to get started.</p>
                <Button variant="hero" asChild><Link to="/apply">Apply Now</Link></Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <div key={app.id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg font-semibold">{app.company_name}</h3>
                      <div className="flex items-center gap-2">
                        {statusIcon(app.status)}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{app.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{app.idea_description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Submitted {new Date(app.submitted_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* MILESTONES TAB */}
          <TabsContent value="milestones" className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Milestones</h2>
            {milestones.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">No milestones yet</h3>
                <p className="text-muted-foreground">Milestones will appear here once your application is approved.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {milestones.map((m) => (
                  <div key={m.id} className="glass-card p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="text-sm text-muted-foreground">{m.description}</p>
                      {m.due_date && <p className="text-xs text-muted-foreground mt-1">Due: {new Date(m.due_date).toLocaleDateString()}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(m.status)}
                      <span className="text-xs capitalize text-muted-foreground">{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;