import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import SubredditRoast from "./components/SubredditRoast";
import UserRoast from "./components/UserRoast";
import Insights from "./components/Insights";
import Therapist from "./components/Therapist";
import Sentiment from "./components/Sentiment";
import CompareSubreddits from "./components/CompareSubreddits";
import ToxicityScore from "./components/ToxicityScore";
import ViralPost from "./components/ViralPost";
import TimeMachine from "./components/TimeMachine";
import RecommendSubreddits from "./components/RecommendSubreddits";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css"; // Import the updated index.css

function App() {
  const [activeTab, setActiveTab] = useState("subreddit-roast");
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: theme === "dark" ? "#1f2937" : "#ffffff",
      },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: theme === "dark"
          ? ["#ff4500", "#dc2626", "#facc15"]
          : ["#ff4500", "#d1d5db", "#facc15"],
      },
      shape: {
        type: ["circle", "triangle", "star"],
        options: {
          star: { sides: 5 },
          triangle: { sides: 3 },
        },
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          opacity_min: 0.1,
        },
      },
      size: {
        value: { min: 4, max: 12 },
        random: true,
        animation: {
          enable: true,
          speed: 2,
          size_min: 2,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: {
          enable: true,
          distance: 200,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: ["repulse", "grab"],
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: { distance: 150, duration: 0.5 },
        grab: { distance: 200, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 5 },
      },
    },
    detectRetina: true,
  };

  const tabs = [
    { id: "subreddit-roast", label: "Subreddit Roast", component: <SubredditRoast theme={theme} /> },
    { id: "user-roast", label: "User Roast", component: <UserRoast theme={theme} /> },
    { id: "insights", label: "User Insights", component: <Insights theme={theme} /> },
    { id: "therapist", label: "Reddit Therapist", component: <Therapist theme={theme} /> },
    { id: "sentiment", label: "Subreddit Sentiment", component: <Sentiment theme={theme} /> },
    { id: "compare-subreddits", label: "Compare Subreddits", component: <CompareSubreddits theme={theme} /> },
    { id: "toxicity-score", label: "Toxicity Score", component: <ToxicityScore theme={theme} /> },
    { id: "viral-post", label: "Viral Post Prediction", component: <ViralPost theme={theme} /> },
    { id: "time-machine", label: "Time Machine", component: <TimeMachine theme={theme} /> },
    { id: "recommend-subreddits", label: "Subreddit Recommendations", component: <RecommendSubreddits theme={theme} /> },
  ];

  return (
    <div
      data-theme={theme} // Toggle theme with data attribute
      className={`min-h-screen relative ${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Creative Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />
      <div className="container mx-auto p-6 relative z-10">
        {/* Header with Original Reddit Style */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Reddit Analyzer</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </motion.div>
      </div>
    </div>
  );
}

export default App;