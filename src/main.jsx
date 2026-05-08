import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Braces,
  Music2,
  Play,
  User,
  Server,
  Terminal,
} from "lucide-react";
import "./styles.css";

const products = [
  {
    name: "Temp Spoofer",
    desc: "Temporary system spoofing utility for quick resets.",
    status: "Utility",
    url: "https://umbracheats.app/products/temp-spoofer",
    icon: Terminal,
  },
  {
    name: "Valorant External",
    desc: "External assist tooling built for Valorant clips.",
    status: "Main Product",
    url: "https://umbracheats.app/products/valorant-external",
    icon: Server,
  },
  {
    name: "Valorant UnlockAll",
    desc: "Unlock-all tooling for Valorant cosmetics and loadouts.",
    status: "Add-on",
    url: "https://umbracheats.app/products/valorant-unlock-all",
    icon: Braces,
  },
];

const DISCORD_USER_ID = import.meta.env.VITE_DISCORD_ID || "1177326138926837884";

const gameSettings = [
  ["DPI", "750"],
  ["Sensitivity", "0.30"],
  ["Scoped", "1.00"],
  ["Resolution", "1920 x 1080"],
  ["Aspect", "16:9"],
];

const CROSSHAIR_CODE = "0;P;d;1;f;0;0t;4;0l;1;0o;0;0a;1;0f;0;1b;0";
const mediaVideos = [
  {
    id: "kPinTBnbc8A",
    title: "Media 01",
    url: "https://www.youtube.com/watch?v=kPinTBnbc8A",
  },
  {
    id: "oPfw58Jtt9E",
    title: "Media 02",
    url: "https://www.youtube.com/watch?v=oPfw58Jtt9E",
  },
  {
    id: "NWGrvVpBWTM",
    title: "Media 03",
    url: "https://www.youtube.com/watch?v=NWGrvVpBWTM",
  },
];

function App() {
  return (
    <main className="site">
      <header className="nav">
        <a className="brand" href="https://aimcore.cc">
          aimcore.cc
        </a>
        <nav>
          <a href="#work">products</a>
          <a href="#about">profile</a>
          <a href="#media">media</a>
        </nav>
      </header>
      <BackgroundMusic />

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="intro">
            Powered by <span>Umbra Software</span>
          </p>
          <h1>
            sup, im <span>tpm</span>
          </h1>
          <p className="hero-description">
            i record my self cheating on video games, edit it, and then post it
            on the internet
          </p>
          <div className="actions">
            <a className="button primary" href="#work">
              products used <ArrowRight size={18} />
            </a>
            <a className="button" href="#about">
              profile <User size={18} />
            </a>
          </div>
        </div>

        <div className="portrait-card">
          <video
            src="/hero-video.mp4"
            aria-label="Portfolio hero video"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-head">
          <h2>Products</h2>
        </div>
        <div className="projects">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article className="project" key={product.name}>
                <Icon size={27} />
                <small>{product.status}</small>
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <a className="product-link" href={product.url}>
                  View product <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <ProfileSection />

      <MediaSection />
    </main>
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio.volume = 0.35;
      audio.play().catch(() => {});
    };

    startMusic();

    const unlockEvents = ["pointerdown", "keydown", "touchstart"];
    unlockEvents.forEach((eventName) => {
      window.addEventListener(eventName, startMusic, { once: true, passive: true });
    });

    return () => {
      unlockEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startMusic);
      });
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      className="background-audio"
      src="/background-music.mp3"
      autoPlay
      loop
      preload="auto"
    />
  );
}

function MediaSection() {
  return (
    <section className="media-section" id="media">
      <div className="section-head">
        <h2>Media</h2>
        <span className="media-label">
          <Play size={15} /> YouTube
        </span>
      </div>
      <div className="media-grid">
        {mediaVideos.map((video) => (
          <article className="media-card" key={video.id}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
            <a href={video.url} target="_blank" rel="noreferrer">
              {video.title} <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileSection() {
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState(DISCORD_USER_ID ? "loading" : "missing");
  const [now, setNow] = useState(Date.now());
  const [copiedCrosshair, setCopiedCrosshair] = useState(false);

  useEffect(() => {
    if (!DISCORD_USER_ID) return;

    let cancelled = false;

    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then((response) => response.json())
      .then((payload) => {
        if (cancelled) return;
        if (payload?.success) {
          setProfile(payload.data);
          setState("ready");
        } else {
          setState("error");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const user = profile?.discord_user;
  const avatarUrl = user
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=160`
    : "/kuudere-avatar.png";
  const displayName = user?.global_name || user?.username || "tpm";
  const status = profile?.discord_status || (state === "missing" ? "offline" : state);
  const activity = profile?.activities?.find((item) => item.type === 0);
  const customStatus = profile?.activities?.find((item) => item.type === 4);
  const activityImage = getActivityImage(activity);
  const spotify = profile?.spotify;
  const spotifyStart = spotify?.timestamps?.start || 0;
  const spotifyEnd = spotify?.timestamps?.end || 0;
  const spotifyDuration = Math.max(spotifyEnd - spotifyStart, 0);
  const spotifyElapsed = spotifyDuration
    ? Math.min(Math.max(now - spotifyStart, 0), spotifyDuration)
    : 0;
  const spotifyProgress = spotifyDuration
    ? Math.round((spotifyElapsed / spotifyDuration) * 100)
    : 0;

  function copyCrosshair() {
    navigator.clipboard?.writeText(CROSSHAIR_CODE).then(() => {
      setCopiedCrosshair(true);
      window.setTimeout(() => setCopiedCrosshair(false), 1400);
    });
  }

  return (
    <section className="profile-section" id="about">
      <div className="section-head">
        <h2>Profile</h2>
      </div>
      <div className="profile-grid">
        <article className="profile-card">
          <div className="profile-top">
            <img src={avatarUrl} alt={`${displayName} Discord avatar`} />
            <div>
              <h3>{displayName}</h3>
              <p>@{user?.username || "discord profile"}</p>
              {customStatus?.state && (
                <p className="custom-status">{customStatus.state}</p>
              )}
            </div>
            <span className={`status-dot ${status}`}>{status}</span>
          </div>
          <div className="activity-card">
            {activityImage ? (
              <img src={activityImage} alt={`${activity?.name || "Current activity"} artwork`} />
            ) : (
              <div className="activity-empty">
                <Terminal size={24} />
              </div>
            )}
            <div>
              <span>Current Activity</span>
              <strong>
                {state === "missing"
                  ? "Add VITE_DISCORD_ID to connect live presence"
                  : activity?.name || "No active game detected"}
              </strong>
              {activity?.details && <p>{activity.details}</p>}
              {activity?.state && <p>{activity.state}</p>}
            </div>
          </div>

          <div className="spotify-card">
            {spotify?.album_art_url ? (
              <img src={spotify.album_art_url} alt={`${spotify.album} album art`} />
            ) : (
              <div className="spotify-empty">
                <Music2 size={24} />
              </div>
            )}
            <div>
              <span>Spotify</span>
              <strong>{spotify?.song || "Not playing"}</strong>
              <p>{spotify ? `${spotify.artist} · ${spotify.album}` : "Currently nothing playing"}</p>
              {spotifyDuration > 0 && (
                <div className="spotify-progress" aria-label="Spotify track progress">
                  <div className="progress-track">
                    <span style={{ width: `${spotifyProgress}%` }} />
                  </div>
                  <div className="progress-time">
                    <span>{formatDuration(spotifyElapsed)}</span>
                    <span>{formatDuration(spotifyDuration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        <article className="settings-card">
          <h3>In-game Settings</h3>
          <div className="settings-list">
            {gameSettings.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <button className="setting-button" type="button" onClick={copyCrosshair}>
              <span>Crosshair</span>
              <strong>{copiedCrosshair ? "copied" : CROSSHAIR_CODE}</strong>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getActivityImage(activity) {
  const image = activity?.assets?.large_image;
  if (!image) return "";

  if (image.startsWith("mp:external/")) {
    const marker = "/https/";
    const index = image.indexOf(marker);
    if (index !== -1) {
      return `https://${image.slice(index + marker.length)}`;
    }
    return `https://media.discordapp.net/${image}`;
  }

  if (image.startsWith("https://") || image.startsWith("http://")) {
    return image;
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
  }

  return "";
}

createRoot(document.getElementById("root")).render(<App />);
