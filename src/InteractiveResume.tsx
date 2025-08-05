// File: src/App.tsx
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const voiceovers = [
  {
    quote:
      "For 16 years, I’ve owned quality across the stack—from simulating edge-case hardware behavior and debugging Linux systems to validating APIs and scaling test coverage across modern cloud apps.",
    section: "intro",
  },
  {
    quote:
      "I bring deep technical understanding, a tool builder’s mindset, and a drive to solve the problems no one else wants to touch.",
    section: "hats",
  },
  {
    quote:
      "Whether it's scripting deployments, tracing system failures across layers, or aligning test strategies with real-world usage, I show up ready to dig in.",
    section: "powin",
  },
  {
    quote: "If a tool doesn’t exist, I’ll build it.",
    section: "tools",
  },
  {
    quote:
      "I’m comfortable tracing root causes through layers of configuration, container orchestration, networking, and Linux internals.",
    section: "skills",
  },
  {
    quote:
      "I’d love to hear more about the challenges your team is working through and how I might help meet them with thoughtful, scalable, and resilient quality solutions.",
    section: "closing",
  },
];

const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="py-12 px-6 md:px-20 max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    {children}
    {voiceovers
      .filter((v) => v.section === id)
      .map((v, idx) => (
        <motion.blockquote
          key={idx}
          className="bg-slate-100 text-slate-700 italic p-4 mt-6 rounded-xl shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          “{v.quote}”
        </motion.blockquote>
      ))}
  </section>
);

export default function InteractiveResume() {
  useEffect(() => {
    document.title = 'Jamal Chishti | Interactive Resume';
  }, []);

  return (
    <main className="bg-white text-gray-900 font-sans apple-document">
      <div className="apple-header">
        {/* Subtle animated background */}
        <div className="apple-bg-gradient"></div>
        <div className="apple-mesh-gradient apple-mesh-1"></div>
        <div className="apple-mesh-gradient apple-mesh-2"></div>
        
        {/* Content */}
        <div className="apple-content">
          <div className="apple-title-container">
            <h1 className="apple-name">Jamal Chishti</h1>
            <div className="apple-title-line"></div>
          </div>
          <p className="apple-subtitle">Sr. DevOps & QA Engineer</p>
          <div className="apple-tags">
            <span className="apple-tag">Toolsmith</span>
            <span className="apple-tag">System Debugger</span>
            <span className="apple-tag">Storyteller</span>
          </div>
        </div>
      </div>

      <Section id="intro" title="Professional Summary">
        <p>
          Versatile QA engineer and systems troubleshooter with deep experience bridging software,
          hardware, and infrastructure across complex, high-stakes environments. Hands-on and highly
          collaborative, with a reputation for elevating quality standards, clarifying requirements,
          and unblocking technical roadblocks.
        </p>
      </Section>

      <Section id="skills" title="Technical Skills">
        <ul className="list-disc list-inside">
          <li>
            <strong>Testing:</strong> Functional, Integration, End-to-End, Regression, Automation,
            API, Mobile, Performance
          </li>
          <li>
            <strong>Languages:</strong> Python, SQL, Java, Bash, PowerShell, C#, JavaScript
          </li>
          <li>
            <strong>Tools:</strong> Postman, Selenium, Pytest, Docker, TestRail, AWS, Redis,
            Bitbucket
          </li>
          <li>
            <strong>Platforms:</strong> Windows, Linux, macOS, Android, iOS
          </li>
        </ul>
      </Section>

      <Section id="hats" title="Hats I’ve Worn (Without the Title)">
        <ul className="list-disc list-inside">
          <li>SDET – Built modular automation frameworks with Python and Postman</li>
          <li>QA Manager – Led QA teams, ran retrospectives, ensured stakeholder alignment</li>
          <li>DevOps Engineer – Managed Docker deployments and automated remote updates</li>
          <li>Network Engineer – Solved complex routing and iptables issues in QA lab setups</li>
          <li>Business Analyst – Translated ambiguous requirements into testable outcomes</li>
          <li>Project Manager – Tracked delivery, timelines, and UAT readiness</li>
        </ul>
      </Section>

      <Section id="powin" title="Professional Experience">
        <h3 className="font-bold text-xl mt-4">
          Powin Energy — DevOps and QA Engineer, Sr (July 2025 – Present)
        </h3>
        <p className="text-sm text-gray-600 mb-2">Previously: Quality Engineer (2024 – July 2025)</p>
        <ul className="list-disc list-inside">
          <li>Built state-based Postman tests for HVAC platform validation</li>
          <li>Automated segmented lab routing, SSH config, and deployments</li>
          <li>Created custom Python tools to manage Docker & YAML-based configurations</li>
        </ul>

        <h3 className="font-bold text-xl mt-6">Siemens DISW — QA Lead (2020 – 2024)</h3>
        <ul className="list-disc list-inside">
          <li>Directed QA across global teams for high-traffic marketing platforms</li>
          <li>Reduced regression from 18 hours to 2 with BrowserStack automation</li>
          <li>Integrated QA into sprint workflows and built stakeholder trust</li>
        </ul>

        <h3 className="font-bold text-xl mt-6">
          WebMD Health Services — Sr. QA Analyst (2011 – 2020)
        </h3>
        <ul className="list-disc list-inside">
          <li>Led QA for major client implementations and wellness platforms</li>
          <li>Developed automation to reduce testing time by 16x</li>
          <li>Built internal tooling for test data creation and import</li>
        </ul>
      </Section>

      <Section id="tools" title="Personal Projects (In the Works)">
        <p>
          Building an open-source test case management system that integrates with Jira, aligns
          requirements with test coverage, and improves clarity across dev and QA.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Python, Playwright, TypeScript, SQL, Appium</li>
          <li>Designed for transparency, traceability, and speed</li>
        </ul>
      </Section>

      <Section id="closing" title="Education">
        <p>
          <strong>Oregon State University</strong>
          <br />
          Bachelor of Science in Business Information Systems & Management
        </p>
      </Section>

      <footer className="text-center text-sm py-6 text-slate-600">
        © {new Date().getFullYear()} Jamal Chishti — jamal.chishti@gmail.com
      </footer>
    </main>
  );
}