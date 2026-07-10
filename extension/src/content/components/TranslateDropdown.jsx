import React, { useState, useRef, useEffect } from "react";

// 20 most useful languages for Indian + global users
const LANGUAGES = [
  { code: "Hindi",      label: "हिंदी",       flag: "🇮🇳" },
  { code: "Gujarati",   label: "ગુજરાતી",    flag: "🇮🇳" },
  { code: "Marathi",    label: "मराठी",      flag: "🇮🇳" },
  { code: "Tamil",      label: "தமிழ்",      flag: "🇮🇳" },
  { code: "Telugu",     label: "తెలుగు",     flag: "🇮🇳" },
  { code: "Bengali",    label: "বাংলা",      flag: "🇧🇩" },
  { code: "Punjabi",    label: "ਪੰਜਾਬੀ",    flag: "🇮🇳" },
  { code: "Kannada",    label: "ಕನ್ನಡ",      flag: "🇮🇳" },
  { code: "Malayalam",  label: "മലയാളം",    flag: "🇮🇳" },
  { code: "Urdu",       label: "اردو",        flag: "🇵🇰" },
  { code: "French",     label: "Français",    flag: "🇫🇷" },
  { code: "Spanish",    label: "Español",     flag: "🇪🇸" },
  { code: "German",     label: "Deutsch",     flag: "🇩🇪" },
  { code: "Arabic",     label: "العربية",    flag: "🇸🇦" },
  { code: "Portuguese", label: "Português",   flag: "🇧🇷" },
  { code: "Russian",    label: "Русский",    flag: "🇷🇺" },
  { code: "Japanese",   label: "日本語",       flag: "🇯🇵" },
  { code: "Korean",     label: "한국어",       flag: "🇰🇷" },
  { code: "Chinese",    label: "中文",         flag: "🇨🇳" },
  { code: "Italian",    label: "Italiano",    flag: "🇮🇹" },
];

export default function TranslateDropdown({ onTranslate, busy }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const ref                 = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = search.trim()
    ? LANGUAGES.filter((l) =>
        l.code.toLowerCase().includes(search.toLowerCase()) ||
        l.label.toLowerCase().includes(search.toLowerCase())
      )
    : LANGUAGES;

  const pick = (lang) => {
    setOpen(false);
    setSearch("");
    onTranslate(lang.code);
  };

  return (
    <div className="jarvis-translate-wrap" ref={ref}>
      <button
        className="jarvis-btn jarvis-btn--translate"
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        title="Translate page to another language"
      >
        🌍 Translate
      </button>

      {open && (
        <div className="jarvis-translate-dropdown">
          <input
            className="jarvis-translate-search"
            type="text"
            placeholder="Search language…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className="jarvis-translate-list">
            {filtered.map((lang) => (
              <button
                key={lang.code}
                className="jarvis-translate-item"
                onClick={() => pick(lang)}
              >
                <span className="jarvis-translate-flag">{lang.flag}</span>
                <span className="jarvis-translate-name">{lang.code}</span>
                <span className="jarvis-translate-native">{lang.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="jarvis-translate-empty">No language found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
