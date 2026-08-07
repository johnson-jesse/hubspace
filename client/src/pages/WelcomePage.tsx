import heroImg from "../assets/hero.png";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

export function WelcomePage() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Hubspace</h1>
          <p>
            <code>Node</code> <code>Express</code> <code>SQLite</code>{" "}
            <code>Prisma</code>
            <code>Vite</code> <code>React</code> <code>WebSocket</code>{" "}
          </p>
          <h3>Exploratory Demo</h3>
          <a role="button" className="action" href="/workspace">
            Let's Go!
          </a>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  );
}
