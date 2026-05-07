// ============================================================
// Prime Physio Clinic — Appointment & WhatsApp Automation
// Frontend-only prototype | Mock data | No backend required
// Customise: CLINIC_CONFIG object below
// ============================================================

import { useState, useEffect, useRef } from "react";

// ── EASY CUSTOMISATION ──────────────────────────────────────
const CLINIC_CONFIG = {
  name: "Prime Physio Clinic",
  tagline: "Book your appointment in seconds",
  subtext:
    "Experience world-class physiotherapy with instant online booking and WhatsApp confirmations — no waiting, no missed calls.",
  phone: "+92 300 1234567",
  whatsapp: "923001234567",
  address: "Plot 42, F-8 Markaz, Islamabad",
  timings: [
    { day: "Monday – Friday", hours: "10:00 AM – 9:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  services: [
    {
      id: "physio",
      label: "Physiotherapy",
      icon: "🦴",
      desc: "Comprehensive assessment and personalised rehab plans.",
    },
    {
      id: "back",
      label: "Back Pain Treatment",
      icon: "🔄",
      desc: "Evidence-based therapy for acute & chronic back conditions.",
    },
    {
      id: "sports",
      label: "Sports Injury Rehab",
      icon: "⚡",
      desc: "Get back on the field faster with targeted sports rehab.",
    },
    {
      id: "posture",
      label: "Posture Correction",
      icon: "🧘",
      desc: "Postural analysis and corrective exercise programming.",
    },
  ],
  timeSlots: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  doctor: {
    name: "Dr. Aisha Malik, DPT",
    title: "Senior Physiotherapist",
    experience: "8+ years",
    bio: "Specialist in sports rehabilitation and musculoskeletal disorders. Trained at Shifa College of Medicine.",
  },
};

// ── MOCK PATIENT DATA ────────────────────────────────────────
const MOCK_PATIENTS = [
  {
    id: 1,
    name: "Ahmed Raza",
    phone: "+92 311 5678901",
    service: "Back Pain Treatment",
    time: "5:00 PM",
    status: "Confirmed",
    date: "Today",
  },
  {
    id: 2,
    name: "Fatima Noor",
    phone: "+92 333 9876543",
    service: "Physiotherapy",
    time: "6:00 PM",
    status: "Pending",
    date: "Today",
  },
  {
    id: 3,
    name: "Bilal Khan",
    phone: "+92 321 4567890",
    service: "Sports Injury Rehab",
    time: "7:00 PM",
    status: "Follow-up Needed",
    date: "Today",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    phone: "+92 345 6789012",
    service: "Posture Correction",
    time: "8:00 PM",
    status: "Pending",
    date: "Tomorrow",
  },
  {
    id: 5,
    name: "Usman Tariq",
    phone: "+92 300 2345678",
    service: "Back Pain Treatment",
    time: "5:00 PM",
    status: "Confirmed",
    date: "Tomorrow",
  },
];

// ── UTILITIES ────────────────────────────────────────────────
const statusColors = {
  Confirmed: { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
  Pending: { bg: "#fef9c3", text: "#a16207", dot: "#eab308" },
  "Follow-up Needed": { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
};

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0f6c3d",
        color: "#fff",
        padding: "14px 28px",
        borderRadius: 50,
        fontWeight: 600,
        fontSize: 15,
        boxShadow: "0 8px 32px rgba(15,108,61,0.35)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "slideUp 0.4s ease",
      }}
    >
      <span style={{ fontSize: 20 }}>✅</span> {message}
    </div>
  );
}

// ── LANDING PAGE ─────────────────────────────────────────────
function LandingPage({ onBook }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a3d2e 0%, #0f6c3d 60%, #1a9e5a 100%)",
          color: "#fff",
          padding: "80px 24px 90px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 50, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 20, letterSpacing: 1 }}>
          🏥 Islamabad's Trusted Physio Clinic
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 18 }}>
          {CLINIC_CONFIG.name}
        </h1>
        <p style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 300, marginBottom: 12, opacity: 0.9 }}>
          {CLINIC_CONFIG.tagline}
        </p>
        <p style={{ fontSize: 16, maxWidth: 560, margin: "0 auto 40px", opacity: 0.75, lineHeight: 1.7 }}>
          {CLINIC_CONFIG.subtext}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onBook} style={{ background: "#fff", color: "#0a3d2e", border: "none", borderRadius: 50, padding: "15px 36px", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            📅 Book Appointment
          </button>
          <a href={`https://wa.me/${CLINIC_CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
            style={{ background: "#25d366", color: "#fff", borderRadius: 50, padding: "15px 36px", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.083.532 4.043 1.465 5.748L.036 23.845a.5.5 0 0 0 .62.619l6.179-1.416A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.954 9.954 0 0 1-5.127-1.414l-.368-.217-3.812.874.891-3.713-.239-.383A9.96 9.96 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "64px 24px", background: "#f8fffe", textAlign: "center" }}>
        <p style={{ color: "#0f6c3d", fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: "uppercase", marginBottom: 8 }}>What We Treat</p>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0a3d2e", marginBottom: 40 }}>Our Specialised Services</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {CLINIC_CONFIG.services.map(s => (
            <div key={s.id} style={{ background: "#fff", borderRadius: 20, padding: "32px 24px", boxShadow: "0 2px 20px rgba(10,61,46,0.07)", border: "1px solid #e8f5f0", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(10,61,46,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 20px rgba(10,61,46,0.07)"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, color: "#0a3d2e", fontSize: 17, marginBottom: 8 }}>{s.label}</h3>
              <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Profile */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg, #0f6c3d, #1a9e5a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, flexShrink: 0 }}>👩‍⚕️</div>
          <div>
            <p style={{ color: "#0f6c3d", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Meet Your Therapist</p>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0a3d2e", marginBottom: 4 }}>{CLINIC_CONFIG.doctor.name}</h2>
            <p style={{ color: "#0f6c3d", fontWeight: 600, marginBottom: 10 }}>{CLINIC_CONFIG.doctor.title} · {CLINIC_CONFIG.doctor.experience}</p>
            <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: 15 }}>{CLINIC_CONFIG.doctor.bio}</p>
          </div>
        </div>
      </section>

      {/* Timings & Location */}
      <section style={{ padding: "64px 24px", background: "#f8fffe" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba(10,61,46,0.07)" }}>
            <h3 style={{ fontWeight: 800, color: "#0a3d2e", marginBottom: 20, fontSize: 20 }}>🕐 Clinic Timings</h3>
            {CLINIC_CONFIG.timings.map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < CLINIC_CONFIG.timings.length - 1 ? "1px solid #e8f5f0" : "none" }}>
                <span style={{ color: "#374151", fontWeight: 500 }}>{t.day}</span>
                <span style={{ color: t.hours === "Closed" ? "#ef4444" : "#0f6c3d", fontWeight: 600 }}>{t.hours}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba(10,61,46,0.07)" }}>
            <h3 style={{ fontWeight: 800, color: "#0a3d2e", marginBottom: 20, fontSize: 20 }}>📍 Location</h3>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: 15, marginBottom: 16 }}>{CLINIC_CONFIG.address}</p>
            <div style={{ background: "#e8f5f0", borderRadius: 12, height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#0f6c3d", fontWeight: 600 }}>
              🗺️ Google Maps Preview
            </div>
            <p style={{ color: "#0f6c3d", fontWeight: 600, marginTop: 16 }}>📞 {CLINIC_CONFIG.phone}</p>
          </div>
        </div>
      </section>

      {/* Lead Value Section */}
      <section style={{ padding: "64px 24px", background: "linear-gradient(135deg, #0a3d2e, #0f6c3d)", color: "#fff", textAlign: "center" }}>
        <p style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>Why Go Digital</p>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 48 }}>Stop Missing Patients. Start Growing.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {[
            { icon: "🚫", title: "Zero Missed Inquiries", desc: "Every patient request is captured automatically" },
            { icon: "💬", title: "Auto WhatsApp Replies", desc: "Instant confirmation messages without staff effort" },
            { icon: "📋", title: "Organised Records", desc: "All appointments in one clean dashboard" },
            { icon: "⭐", title: "Professional Image", desc: "Impress patients with modern booking experience" },
            { icon: "⏰", title: "Save Staff Time", desc: "Reduce manual calls and paperwork significantly" },
          ].map((b, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 20px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{b.title}</h4>
              <p style={{ opacity: 0.7, fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#071f17", color: "rgba(255,255,255,0.5)", padding: "32px 24px", textAlign: "center", fontSize: 14 }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{CLINIC_CONFIG.name}</p>
        <p>{CLINIC_CONFIG.address} · {CLINIC_CONFIG.phone}</p>
        <p style={{ marginTop: 16, fontSize: 12 }}>© 2025 {CLINIC_CONFIG.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ── BOOKING FLOW ─────────────────────────────────────────────
function BookingFlow({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", age: "", service: "", date: "", time: "" });

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toLocaleDateString("en-PK", { weekday: "short", month: "short", day: "numeric" });
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canNext1 = form.name && form.phone && form.age;
  const canNext2 = form.service;
  const canNext3 = form.date && form.time;

  const stepLabels = ["Patient Info", "Select Service", "Date & Time", "Confirm"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,30,20,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0a3d2e, #0f6c3d)", padding: "28px 32px", borderRadius: "24px 24px 0 0", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20 }}>
            <div>
              <p style={{ opacity: 0.7, fontSize: 13, marginBottom: 4 }}>📅 {CLINIC_CONFIG.name}</p>
              <h2 style={{ fontWeight: 800, fontSize: 22 }}>Book Appointment</h2>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          {/* Step indicators */}
          <div style={{ display: "flex", gap: 8 }}>
            {stepLabels.map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i + 1 ? "#25d366" : step === i + 1 ? "#fff" : "rgba(255,255,255,0.25)", color: step === i + 1 ? "#0a3d2e" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, margin: "0 auto 4px" }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <p style={{ fontSize: 10, opacity: step === i + 1 ? 1 : 0.6, fontWeight: step === i + 1 ? 700 : 400 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 32 }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#0a3d2e", marginBottom: 24 }}>Patient Information</h3>
              {[
                { label: "Full Name", key: "name", placeholder: "e.g. Ahmed Raza", type: "text" },
                { label: "Phone Number", key: "phone", placeholder: "e.g. +92 300 1234567", type: "tel" },
                { label: "Age", key: "age", placeholder: "e.g. 35", type: "number" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: 14 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #e5e7eb", fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "#0f6c3d"}
                    onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#0a3d2e", marginBottom: 24 }}>Select Service</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {CLINIC_CONFIG.services.map(s => (
                  <button key={s.id} onClick={() => update("service", s.label)}
                    style={{ background: form.service === s.label ? "#0a3d2e" : "#f8fffe", color: form.service === s.label ? "#fff" : "#374151", border: `2px solid ${form.service === s.label ? "#0a3d2e" : "#e8f5f0"}`, borderRadius: 16, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#0a3d2e", marginBottom: 20 }}>Select Date</h3>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 24 }}>
                {dates.map(d => (
                  <button key={d} onClick={() => update("date", d)}
                    style={{ background: form.date === d ? "#0a3d2e" : "#f8fffe", color: form.date === d ? "#fff" : "#374151", border: `2px solid ${form.date === d ? "#0a3d2e" : "#e8f5f0"}`, borderRadius: 12, padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s" }}>
                    {d}
                  </button>
                ))}
              </div>
              <h3 style={{ fontWeight: 700, color: "#0a3d2e", marginBottom: 16 }}>Available Time Slots</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                {CLINIC_CONFIG.timeSlots.map(t => (
                  <button key={t} onClick={() => update("time", t)}
                    style={{ background: form.time === t ? "#0f6c3d" : "#f8fffe", color: form.time === t ? "#fff" : "#374151", border: `2px solid ${form.time === t ? "#0f6c3d" : "#e8f5f0"}`, borderRadius: 12, padding: "14px", cursor: "pointer", fontWeight: 700, fontSize: 16, transition: "all 0.2s" }}>
                    🕐 {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontWeight: 800, color: "#0a3d2e", fontSize: 22, marginBottom: 8 }}>Appointment Request Received!</h3>
              <p style={{ color: "#6b7280", marginBottom: 28 }}>We'll confirm your slot shortly via WhatsApp.</p>
              <div style={{ background: "#f8fffe", borderRadius: 16, padding: 24, textAlign: "left", border: "1px solid #e8f5f0" }}>
                {[["Patient", form.name], ["Phone", form.phone], ["Service", form.service], ["Date", form.date], ["Time", form.time]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e8f5f0" }}>
                    <span style={{ color: "#6b7280", fontSize: 14 }}>{k}</span>
                    <span style={{ fontWeight: 600, color: "#0a3d2e", fontSize: 14 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ background: "#f3f4f6", border: "none", borderRadius: 50, padding: "12px 24px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                ← Back
              </button>
            ) : <div />}
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)}
                disabled={step === 1 ? !canNext1 : step === 2 ? !canNext2 : !canNext3}
                style={{ background: "#0f6c3d", color: "#fff", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 700, cursor: "pointer", opacity: (step === 1 ? !canNext1 : step === 2 ? !canNext2 : !canNext3) ? 0.4 : 1 }}>
                Continue →
              </button>
            ) : (
              <button onClick={() => onComplete(form)} style={{ background: "#0f6c3d", color: "#fff", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}>
                ✅ Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── WHATSAPP SIMULATION ──────────────────────────────────────
function WhatsAppSim({ booking }) {
  const msgs = [
    { delay: 400, text: "Assalam o Alaikum! 👋 Thank you for contacting Prime Physio Clinic." },
    { delay: 1200, text: "Your appointment request has been received successfully." },
    { delay: 2200, text: `📋 *Service:* ${booking.service}` },
    { delay: 3000, text: `📅 *Date:* ${booking.date}` },
    { delay: 3600, text: `🕐 *Time:* ${booking.time}` },
    { delay: 4600, text: "Our team will confirm your slot shortly. Please arrive 10 minutes early. 🙏" },
  ];

  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    msgs.forEach(({ delay, text }, i) => {
      const show = setTimeout(() => { setTyping(true); }, delay - 200 < 0 ? 0 : delay - 200);
      const add = setTimeout(() => {
        setTyping(false);
        setVisible(v => [...v, text]);
      }, delay);
      return () => { clearTimeout(show); clearTimeout(add); };
    });
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visible, typing]);

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "#e5ddd5", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        {/* WA Header */}
        <div style={{ background: "#075e54", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏥</div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{CLINIC_CONFIG.name}</p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Online · automated replies</p>
          </div>
        </div>
        {/* Chat area */}
        <div style={{ padding: "16px", minHeight: 280, maxHeight: 380, overflowY: "auto", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E\")" }}>
          {/* Intro bubble */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span style={{ background: "rgba(0,0,0,0.1)", borderRadius: 8, padding: "4px 12px", fontSize: 12, color: "#555" }}>Today</span>
          </div>
          {visible.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "flex-start", marginBottom: 6 }}>
              <div style={{ background: "#fff", borderRadius: "12px 12px 12px 2px", padding: "10px 14px", maxWidth: "80%", fontSize: 14, color: "#111", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", lineHeight: 1.5, animation: "fadeIn 0.3s ease" }}>
                {msg}
                <span style={{ display: "block", textAlign: "right", fontSize: 10, color: "#aaa", marginTop: 4 }}>
                  {new Date().toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })} ✓✓
                </span>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 6 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#9e9e9e", animation: `bounce 1s ease ${i * 0.2}s infinite`, display: "inline-block" }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {/* Input bar */}
        <div style={{ background: "#f0f0f0", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 50, padding: "10px 16px", fontSize: 14, color: "#aaa" }}>Automated message system...</div>
          <div style={{ width: 40, height: 40, background: "#075e54", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ──────────────────────────────────────────
function AdminDashboard({ newBooking }) {
  const allPatients = newBooking
    ? [{ id: 0, name: newBooking.name, phone: newBooking.phone, service: newBooking.service, time: newBooking.time, status: "Pending", date: newBooking.date }, ...MOCK_PATIENTS]
    : MOCK_PATIENTS;

  const [patients, setPatients] = useState(allPatients);

  const updateStatus = (id, status) => setPatients(ps => ps.map(p => p.id === id ? { ...p, status } : p));

  const stats = [
    { label: "Total Requests", value: patients.length, icon: "📊", color: "#0f6c3d" },
    { label: "Pending", value: patients.filter(p => p.status === "Pending").length, icon: "⏳", color: "#d97706" },
    { label: "Today's Appointments", value: patients.filter(p => p.date === "Today").length, icon: "📅", color: "#2563eb" },
    { label: "Missed Avoided", value: patients.length, icon: "✅", color: "#7c3aed" },
  ];

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontWeight: 800, fontSize: 28, color: "#0a3d2e" }}>Admin Dashboard</h2>
        <p style={{ color: "#6b7280" }}>Manage and track all patient appointments</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", boxShadow: "0 2px 16px rgba(10,61,46,0.07)", border: "1px solid #e8f5f0", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 36 }}>{s.icon}</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 28, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 2px 20px rgba(10,61,46,0.07)", overflow: "hidden", border: "1px solid #e8f5f0" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8f5f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: 700, color: "#0a3d2e" }}>Patient Appointments</h3>
          <span style={{ background: "#e8f5f0", color: "#0f6c3d", borderRadius: 50, padding: "4px 14px", fontSize: 13, fontWeight: 600 }}>{patients.length} total</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#f8fffe" }}>
                {["Patient", "Phone", "Service", "Time", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => {
                const sc = statusColors[p.status] || statusColors.Pending;
                return (
                  <tr key={p.id} style={{ borderTop: "1px solid #f3f4f6", background: i === 0 && newBooking ? "rgba(15,108,61,0.03)" : "#fff" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `hsl(${(i * 60) % 360}, 60%, 85%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: `hsl(${(i * 60) % 360}, 60%, 30%)` }}>
                          {p.name[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, color: "#111", fontSize: 14 }}>{p.name}</p>
                          <p style={{ fontSize: 12, color: "#9ca3af" }}>{p.date}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#374151", fontSize: 14 }}>{p.phone}</td>
                    <td style={{ padding: "14px 16px", color: "#374151", fontSize: 14 }}>{p.service}</td>
                    <td style={{ padding: "14px 16px", color: "#374151", fontSize: 14, fontWeight: 600 }}>{p.time}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 50, padding: "4px 12px", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.status !== "Confirmed" && (
                          <button onClick={() => updateStatus(p.id, "Confirmed")}
                            style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                            ✓ Confirm
                          </button>
                        )}
                        <button onClick={() => updateStatus(p.id, "Follow-up Needed")}
                          style={{ background: "#fef9c3", color: "#a16207", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          💬 Remind
                        </button>
                        {p.status !== "Confirmed" || true ? (
                          <button onClick={() => updateStatus(p.id, "Confirmed")}
                            style={{ background: "#ede9fe", color: "#6d28d9", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                            ✅ Done
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── FLOATING WHATSAPP BUTTON ─────────────────────────────────
function FloatingWA() {
  return (
    <a href={`https://wa.me/${CLINIC_CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
      style={{ position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", zIndex: 998, transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      title="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.083.532 4.043 1.465 5.748L.036 23.845a.5.5 0 0 0 .62.619l6.179-1.416A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.954 9.954 0 0 1-5.127-1.414l-.368-.217-3.812.874.891-3.713-.239-.383A9.96 9.96 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/></svg>
    </a>
  );
}

// ── ROOT APP ─────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "booking-done" | "admin"
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState(null);
  const [toast, setToast] = useState(null);

  const handleComplete = (form) => {
    setShowBooking(false);
    setBooking(form);
    setView("booking-done");
    setToast("🎉 Appointment booked! WhatsApp confirmation sent.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fffe", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-6px); } }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#f1f1f1; }
        ::-webkit-scrollbar-thumb { background:#0f6c3d55; border-radius:3px; }
      `}</style>

      {/* Demo Badge */}
      <div style={{ background: "#0a3d2e", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 600, letterSpacing: 0.5, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <span style={{ background: "#25d366", borderRadius: 50, padding: "2px 10px", fontSize: 11 }}>LIVE DEMO</span>
        Working Prototype — Clinic Appointment & WhatsApp Automation System
      </div>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8f5f0", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(10,61,46,0.06)" }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: "#0a3d2e" }}>🏥 {CLINIC_CONFIG.name}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setView("landing")} style={{ background: view === "landing" ? "#e8f5f0" : "transparent", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, color: "#0a3d2e", cursor: "pointer", fontSize: 14 }}>
            Landing
          </button>
          <button onClick={() => setView("admin")} style={{ background: view === "admin" ? "#e8f5f0" : "transparent", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, color: "#0a3d2e", cursor: "pointer", fontSize: 14 }}>
            📊 Admin
          </button>
          <button onClick={() => setShowBooking(true)} style={{ background: "#0f6c3d", color: "#fff", border: "none", borderRadius: 50, padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            + Book Now
          </button>
        </div>
      </nav>

      {/* Views */}
      {view === "landing" && <LandingPage onBook={() => setShowBooking(true)} />}

      {view === "booking-done" && booking && (
        <div style={{ padding: "40px 24px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: "#0a3d2e", marginBottom: 8 }}>Booking Confirmed!</h2>
            <p style={{ color: "#6b7280" }}>Here's your WhatsApp-style confirmation preview</p>
          </div>
          <WhatsAppSim booking={booking} />
          <div style={{ textAlign: "center", marginTop: 8, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setView("admin")} style={{ background: "#0f6c3d", color: "#fff", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}>
              📊 View Admin Dashboard
            </button>
            <button onClick={() => { setView("landing"); setBooking(null); }} style={{ background: "#f3f4f6", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
              ← Back to Clinic
            </button>
          </div>
        </div>
      )}

      {view === "admin" && <AdminDashboard newBooking={booking} />}

      {/* Modals & Overlays */}
      {showBooking && <BookingFlow onClose={() => setShowBooking(false)} onComplete={handleComplete} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <FloatingWA />
    </div>
  );
}
