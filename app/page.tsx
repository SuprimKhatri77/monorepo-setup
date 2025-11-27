"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  Folder,
  Settings,
  Palette,
  Zap,
  Rocket,
  Lightbulb,
  Database,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { IntroductionSection } from "@/modules/introduction-section";
import { ProjectStructure } from "@/modules/project-strucutre";
import { InitializeMonorepo } from "@/modules/initialize-monrepo";
import { SharedAPIPackage } from "@/modules/shared-api-package";
import { ExpressServerSetup } from "@/modules/express-server-setup";
import { NextJSClientSetup } from "@/modules/nextxjs-client-setup";
import { RootConfiguration } from "@/modules/root-configuration";
import { RunEverything } from "@/modules/run-everything";
import { ProTips } from "@/modules/pro-tips";
import RedisRateLimitingDocs from "@/modules/redis/redis";

export default function MonorepoGuide() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [redisExpanded, setRedisExpanded] = useState(false);

  const navigation = [
    { id: "intro", label: "Introduction", icon: BookOpen },
    { id: "structure", label: "Project Structure", icon: Folder },
    { id: "initialize", label: "Initialize Monorepo", icon: Settings },
    { id: "api", label: "Shared API Package", icon: Zap },
    { id: "server", label: "Express Server", icon: Settings },
    { id: "client", label: "Next.js Client", icon: Palette },

    { id: "config", label: "Root Configuration", icon: Zap },
    { id: "run", label: "Run Everything", icon: Rocket },
    { id: "tips", label: "Pro Tips", icon: Lightbulb },
    {
      id: "redis",
      label: "Redis Integration",
      icon: Database,
      subLinks: [
        { id: "redis-overview", label: "Overview" },
        { id: "redis-prerequisites", label: "Prerequisites" },
        { id: "redis-installation", label: "Installation" },
        { id: "redis-create-package", label: "Create Redis Package" },
        { id: "redis-implementation", label: "Implementation" },
        { id: "redis-usage", label: "Usage Examples" },
        { id: "redis-testing", label: "Testing" },
        { id: "redis-tips", label: "Pro Tips" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation
        .flatMap((nav) => (nav.subLinks ? [nav, ...nav.subLinks] : [nav]))
        .map((nav) => document.getElementById(nav.id));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const allNavItems = navigation.flatMap((nav) =>
            nav.subLinks ? [nav, ...nav.subLinks] : [nav]
          );
          setActiveSection(allNavItems[i].id);

          // Auto-expand Redis section if a Redis sub-link is active
          if (allNavItems[i].id.startsWith("redis-")) {
            setRedisExpanded(true);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Monorepo Setup Guide
          </h1>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 z-40 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isRedis = item.id === "redis";
            const isActive =
              activeSection === item.id ||
              (item.subLinks &&
                item.subLinks.some((sub) => activeSection === sub.id));

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (isRedis) {
                      setRedisExpanded(!redisExpanded);
                    }
                    scrollToSection(item.id);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {isRedis &&
                    (redisExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {isRedis && redisExpanded && item.subLinks && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.subLinks.map((subLink) => (
                      <a
                        key={subLink.id}
                        href={`#${subLink.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(subLink.id);
                        }}
                        className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          activeSection === subLink.id
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Introduction */}
          <IntroductionSection />

          {/* Project Structure */}
          <ProjectStructure />

          {/* Initialize Monorepo */}
          <InitializeMonorepo />

          {/* Setup Shared API Package */}
          <SharedAPIPackage />

          {/* Setup Express Server */}
          <ExpressServerSetup />

          {/* Setup Next.js Client */}
          <NextJSClientSetup />

          {/* Root Configuration */}
          <RootConfiguration />

          {/* Run Everything */}
          <RunEverything />

          {/* Pro Tips */}
          <ProTips />
          <RedisRateLimitingDocs />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>Built with Next.js, Express, tRPC, and pnpm workspaces.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
