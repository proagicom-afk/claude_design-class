/* 클로드 디자인 클래스 — App: 신청 모달 + Tweaks + 마운트 */
const { useState: useStateA, useEffect: useEffectA } = React;

const DIR_MAP = { "온화": "a", "다정": "b", "포근": "c" };
const DIR_ACCENT = { "온화": "#9a7d3f", "다정": "#cf6a3c", "포근": "#7e7a3c" };
const DENSITY_MAP = { "아담": 1.12, "기본": 1.36, "넉넉": 1.62 };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "온화",
  "accent": "",
  "radius": 22,
  "density": "기본"
}/*EDITMODE-END*/;

/* ============================ 신청 모달 ============================ */
function ApplyModal({ open, onClose }) {
  const [form, setForm] = useStateA({ name: "", phone: "", email: "", note: "", agree: false });
  const [errs, setErrs] = useStateA({});
  const [done, setDone] = useStateA(false);

  useEffectA(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setDone(false); setErrs({});
      setForm({ name: "", phone: "", email: "", note: "", agree: false });
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffectA(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrs((e) => ({ ...e, [k]: null })); };

  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = "성함을 입력해 주세요.";
    const phone = form.phone.replace(/[^0-9]/g, "");
    if (!form.phone.trim()) e.phone = "연락처를 입력해 주세요.";
    else if (!/^01[016789][0-9]{7,8}$/.test(phone)) e.phone = "휴대폰 번호 형식을 확인해 주세요.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "이메일 형식을 확인해 주세요.";
    if (!form.agree) e.agree = "개인정보 수집에 동의해 주세요.";
    setErrs(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  return (
    <div className="modal-scrim" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        {!done ? (
          <React.Fragment>
            <div className="modal-head">
              <span className="kicker">수강 신청</span>
              <h3>따뜻한 디자인 교실에 오신 걸 환영해요</h3>
              <p>아래 내용을 남겨 주시면 정원 확인 후 문자로 안내해 드릴게요.</p>
              <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>
            </div>
            <div className="modal-body">
              <div className={"field" + (errs.name ? " err" : "")}>
                <label>보호자 성함 <span className="req">*</span></label>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="예) 김보경" />
                {errs.name && <div className="msg">{errs.name}</div>}
              </div>
              <div className="field-row">
                <div className={"field" + (errs.phone ? " err" : "")}>
                  <label>연락처 <span className="req">*</span></label>
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="010-0000-0000" inputMode="tel" />
                  {errs.phone && <div className="msg">{errs.phone}</div>}
                </div>
                <div className={"field" + (errs.email ? " err" : "")}>
                  <label>이메일 <small style={{ color: "var(--ink-faint)", fontWeight: 500 }}>(선택)</small></label>
                  <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@email.com" inputMode="email" />
                  {errs.email && <div className="msg">{errs.email}</div>}
                </div>
              </div>
              <div className="field">
                <label>남기고 싶은 한마디 <small style={{ color: "var(--ink-faint)", fontWeight: 500 }}>(선택)</small></label>
                <textarea value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="배우고 싶은 점이나 궁금한 점을 자유롭게 적어 주세요."></textarea>
              </div>
              <label className={"check" + (errs.agree ? " err" : "")}>
                <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} />
                <span>신청 확인을 위한 <a href="#" onClick={(e) => e.preventDefault()}>개인정보 수집·이용</a>에 동의합니다. (성함·연락처, 안내 목적, 수강 종료 후 파기)</span>
              </label>
              {errs.agree && <div className="msg" style={{ marginTop: -8, marginBottom: 12 }}>{errs.agree}</div>}
              <button className="btn btn-primary" onClick={submit}>신청 접수하기</button>
            </div>
          </React.Fragment>
        ) : (
          <div className="success">
            <div className="ok">✓</div>
            <h3>신청이 접수되었어요!</h3>
            <p>소중한 신청 감사합니다. 정원 확인 후 빠르게 연락드릴게요.</p>
            <div className="recap">
              <div><b>{form.name}</b> 님</div>
              <div>{form.phone}</div>
              <div style={{ marginTop: 8 }}>2026.06.01 시작 · 매주 월·목 오후 2:00 · 작은행동한사랑 3층 교육장</div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={onClose}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ APP ============================ */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modal, setModal] = useStateA(false);
  const openModal = () => setModal(true);

  useReveal();

  const dir = DIR_MAP[t.direction] || "a";
  const accent = t.accent || DIR_ACCENT[t.direction] || "#9a7d3f";
  const styleVars = {
    "--accent": accent,
    "--radius": t.radius + "px",
    "--radius-sm": Math.round(t.radius * 0.62) + "px",
    "--gap": DENSITY_MAP[t.density] || 1.36,
  };

  return (
    <div className="page" data-direction={dir} style={styleVars}>
      <Nav onApply={openModal} />
      <Hero onApply={openModal} />
      <Intro />
      <Curriculum />
      <LectureLibrary />
      <Resources />
      <Schedule onApply={openModal} />
      <CtaBand onApply={openModal} />
      <Faq />
      <Footer />
      <ApplyModal open={modal} onClose={() => setModal(false)} />

      <TweaksPanel>
        <TweakSection label="디자인 방향" />
        <TweakRadio label="분위기" value={t.direction}
          options={["온화", "다정", "포근"]}
          onChange={(v) => setTweak("direction", v)} />
        <div style={{ fontSize: 12, color: "#8a8275", padding: "2px 2px 6px", lineHeight: 1.5 }}>
          온화 · 세리프 / 다정 · 손글씨 / 포근 · 라운드
        </div>

        <TweakSection label="색과 모양" />
        <TweakColor label="강조 색감" value={accent}
          options={["#9a7d3f", "#cf6a3c", "#7e7a3c", "#b06a45"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakButton label="강조색을 방향 기본값으로" onClick={() => setTweak("accent", "")} />
        <TweakSlider label="모서리 둥글기" value={t.radius} min={8} max={34} step={1} unit="px"
          onChange={(v) => setTweak("radius", v)} />
        <TweakRadio label="여백" value={t.density}
          options={["아담", "기본", "넉넉"]}
          onChange={(v) => setTweak("density", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
