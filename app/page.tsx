import Hero from "../components/Hero";
import WeatherLocation from "../components/WeatherLocation";
import FooterLinks from "../components/FooterLinks";

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


export default function Home() {
  return (
    <>
      <Hero />

      {/* Recent Work */}


      {/* Recent Work */}
      <section id="recent-work" className="section">
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

      {/* Footer */}
      <footer className="site-footer" style={{ paddingTop: 16, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <WeatherLocation />
        <FooterLinks />
      </footer>
    </>
  );
}
