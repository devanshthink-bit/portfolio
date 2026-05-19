import Hero from "../components/Hero";
import WeatherLocation from "../components/WeatherLocation";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";

const recentWork = [
  {
    title: "Sidedoor — Job referral platform",
    gradient: "linear-gradient(135deg, #dce8ff 0%, #c2d6ff 45%, #d8e6ff 100%)",
    slug: "sidedoor",
  },
  {
    title: "Design system, Anthropic Console",
    gradient: "linear-gradient(to right, #ffe8c8, #ffd49a, #ffe8c8)",
    slug: null,
  },
  {
    title: "End-to-end product, Meta Reels",
    gradient: "linear-gradient(#c9caD1, #bbc7d3, #b7c6d5)",
    slug: null,
  },
  {
    title: "Payments infrastructure, Razorpay",
    gradient: "linear-gradient(to right top, #dae8fc, #c8dfff, #e6f0fe, #b7d5ff)",
    slug: null,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Recent Work */}
      <section id="recent-work" className="section">
        <h3 className="section-title">Recent Work</h3>
        <div className="work-list">
          {recentWork.map((item) =>
            item.slug ? (
              <Link key={item.title} href={`/work/${item.slug}`} className="work-card" style={{ textDecoration: "none" }}>
                <div
                  className="work-card-media"
                  style={{ background: item.gradient }}
                />
                <p className="work-card-title">{item.title}</p>
              </Link>
            ) : (
              <div key={item.title} className="work-card">
                <div
                  className="work-card-media"
                  style={{ background: item.gradient }}
                />
                <p className="work-card-title">{item.title}</p>
              </div>
            )
          )}
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
