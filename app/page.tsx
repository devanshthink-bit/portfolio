import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import WeatherLocation from "../components/WeatherLocation";

const experience = [
  { company: "Anthropic", role: "Software Engineer", year: "2024" },
  { company: "Meta", role: "Product Engineer", year: "2022" },
  { company: "Razorpay", role: "Frontend Engineer", year: "2020" },
];

const education = [
  { school: "IIT Delhi", program: "B.Tech Computer Science", year: "2016–2020" },
  { school: "Coursera / Fast.ai", program: "ML & Deep Learning", year: "2021" },
];

const recentWork = [
  {
    title: "Design system, Anthropic Console",
    gradient: "linear-gradient(to right, #ffe8c8, #ffd49a, #ffe8c8)",
  },
  {
    title: "End-to-end product, Meta Reels",
    gradient: "linear-gradient(#c9caD1, #bbc7d3, #b7c6d5)",
  },
  {
    title: "Payments infrastructure, Razorpay",
    gradient: "linear-gradient(to right top, #dae8fc, #c8dfff, #e6f0fe, #b7d5ff)",
  },
];

const sideProjects = [
  {
    title: "Beautifully Designed Objects",
    description: "A curated collection of functional and well-designed objects.",
    slug: "objects",
    thumbColor: "#e8e2d9",
  },
  {
    title: "Sunset Skies",
    description: "Gradients generated from all the sunsets I photographed.",
    slug: "sunsets",
    thumbColor: "#f4c88a",
  },
  {
    title: "Open Source Tools",
    description: "Small utilities I built and published for developers.",
    slug: "tools",
    thumbColor: "#1f1f1f",
  },
];

const flags = [
  "🇦🇺","🇦🇹","🇧🇸","🇧🇪","🇧🇹","🇧🇷","🇨🇦","🇨🇿","🇫🇷","🇩🇪",
  "🇬🇷","🇭🇰","🇮🇳","🇮🇹","🇯🇵","🇱🇮","🇱🇺","🇲🇻","🇲🇾","🇳🇱",
  "🇵🇭","🇸🇬","🇪🇸","🇱🇰","🇨🇭","🇦🇪","🇬🇧","🇺🇸","🇻🇦","🇵🇹",
];

const healthStats = [
  { value: "🏋️ 247 days", label: "Streak" },
  { value: "💗 56 bpm", label: "RHR" },
  { value: "🚶 9,000 steps", label: "Daily goal" },
  { value: "🫀 58 ms", label: "HRV" },
];

const principles = [
  "People always remember how you made them feel.",
  "Caring deeply about something is rare, and beautiful.",
  "Don't judge people. You rarely know their full story.",
  "Focus on improving your technique, outcomes will follow.",
  "Just showing up every day can change your life.",
  "Being fun to work with is a competitive advantage.",
  "Stay humble. You're not above anyone.",
  "Good taste is a muscle that can be built.",
  "There is no such thing as a bad decision.",
  "Being on time is a sign of respect.",
  "There's no meaning to life. Find what gives you joy and do more of it.",
];

const events = [
  { icon: "🧐", label: "Tech x Biz Quizzing", date: "Mar '26" },
  { icon: "🛠️", label: "Builders Who Design", date: "Active Community" },
  { icon: "🎄", label: "White Elephant x Devs", date: "Dec '25" },
  { icon: "♟️", label: "Chess & Code Meetup", date: "Oct '25" },
];

const tweets = [
  {
    text: "if i were starting my dev journey today, i would –\n\n• build something small every week\n• read code from great engineers\n• focus on fundamentals before frameworks\n• ship early, get feedback fast",
    likes: 632,
    date: "Feb 14, 2026",
  },
  {
    text: "6am in sf is a whole mood 🌃🌉🌙",
    likes: 446,
    date: "Nov 3, 2025",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Experience */}
      <section className="section">
        <h3 className="section-title">Experience</h3>
        <div className="list-table">
          {experience.map((item) => (
            <div key={item.company} className="list-row">
              <span className="list-item-primary">{item.company}</span>
              <span className="list-item-secondary">{item.role}</span>
              <span className="list-item-year">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h3 className="section-title">Education</h3>
        <div className="list-table">
          {education.map((item) => (
            <div key={item.school} className="list-row">
              <span className="list-item-primary">{item.school}</span>
              <span className="list-item-secondary">{item.program}</span>
              <span className="list-item-year">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Work */}
      <section className="section">
        <h3 className="section-title">Recent Work</h3>
        <div className="work-list">
          {recentWork.map((item) => (
            <div key={item.title} className="work-card">
              <div
                className="work-card-media"
                style={{ background: item.gradient }}
              />
              <p className="work-card-title">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Side Projects */}
      <section className="section">
        <h3 className="section-title">Side Projects</h3>
        <p className="section-body">I&apos;m learning how to design and exploring new AI tools.</p>
        <p className="section-body">
          I&apos;ve shipped a few side projects along the way — some serious, some just for fun.
        </p>
        <div className="project-list" style={{ paddingTop: 12 }}>
          {sideProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* Travel */}
      <section className="section">
        <h3 className="section-title">Travel</h3>
        <p className="section-body">
          Growing up, my family moved cities every few years. I was usually the new kid, adjusting
          to a fresh school and making new friends.
        </p>
        <p className="section-body">
          Perhaps that&apos;s made me curious about people and cultures, and why so many places feel
          like home. I try visiting one new place every year.
        </p>
        <div className="flag-grid">
          {flags.map((flag, i) => (
            <span key={i} className="flag-circle">{flag}</span>
          ))}
        </div>
      </section>

      {/* Health */}
      <section className="section">
        <h3 className="section-title">Health</h3>
        <p className="section-body">
          Sports have played a big role in how I live life today. I play basketball, run, and track
          a few stats along the way.
        </p>
        <div className="health-stats">
          {healthStats.map((stat) => (
            <div key={stat.label}>
              <p className="health-stat-value">{stat.value}</p>
              <p className="health-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <h3 className="section-title">Principles</h3>
        <p className="section-body">In no particular order:</p>
        <ul className="principles-list">
          {principles.map((p, i) => (
            <li key={i} className="principle-item">{p}</li>
          ))}
        </ul>
      </section>

      {/* Events Calendar */}
      <section className="section">
        <h3 className="section-title">Events Calendar</h3>
        <p className="section-body">
          I am curious about people&apos;s lives and like bringing them together. Lately, I&apos;ve
          been planning and hosting small curated events.
        </p>
        <div className="list-table" style={{ marginTop: 8 }}>
          {events.map((event) => (
            <div key={event.label} className="hosted-row">
              <span className="hosted-icon">{event.icon}</span>
              <span className="hosted-label">{event.label}</span>
              <span className="hosted-date">{event.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Around the Internet */}
      <section className="section">
        <h3 className="section-title">Around the Internet</h3>
        <p className="section-body">
          I have recently started sharing more about my dev journey on YouTube.
        </p>
        <p className="section-body">
          A video where I explored AI-assisted coding workflows →
        </p>
        <div className="internet-video">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="section-body" style={{ marginTop: 32 }}>
          Twitter is where I share my hot takes and observations from everyday life.
        </p>
        <div className="tweet-list">
          {tweets.map((tweet, i) => (
            <div key={i} className="tweet-card">
              <div className="tweet-header">
                <div className="tweet-avatar" />
                <div>
                  <div className="tweet-name">Devansh</div>
                  <div className="tweet-handle">@devansh</div>
                </div>
              </div>
              <p className="tweet-text" style={{ whiteSpace: "pre-line" }}>{tweet.text}</p>
              <div className="tweet-meta">❤️ {tweet.likes} · {tweet.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <WeatherLocation />
        <div className="footer-links">
          <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:devansh.think@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </>
  );
}
