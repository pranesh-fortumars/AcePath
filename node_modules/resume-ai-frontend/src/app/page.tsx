"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, FileText, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-70 animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] opacity-70 animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="w-full border-b border-border/40 backdrop-blur-md bg-background/60 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">ResumeAI Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="py-20 text-center flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Future of Career Progression</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Your AI Career <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Operating System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Build ATS-optimized resumes, prepare for interviews, and land your dream job with enterprise-grade AI. More than a resume builder — your personal career intelligence engine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="rounded-full text-base h-12 px-8 shadow-lg shadow-primary/25">
              Build Your Resume Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 backdrop-blur-sm bg-background/50">
              View Examples
            </Button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-blue-500" />}
              title="Smart Resume Builder"
              description="Real-time ATS scoring, drag-and-drop sections, and professional templates designed to pass the screen."
              delay={0.4}
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-green-500" />}
              title="Job Matching Engine"
              description="Upload a Job Description and let our AI compare it against your resume to identify missing keywords and skills."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Briefcase className="w-6 h-6 text-purple-500" />}
              title="AI Recruiter Simulator"
              description="Get instant feedback on your resume as if reviewed by a Fortune 500 recruiter, complete with mock interview questions."
              delay={0.6}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
