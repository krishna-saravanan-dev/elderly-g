/* ==========================================================================
   ElderCare 360 (v3) — Main Portal Controller
   ========================================================================== */

window.PortalApp = {
  activeTab: "dashboard",

  init() {
    this.render();
    this.renderSchedule();
    window.FallSimulator.start();
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    this.render();
  },

  render() {
    const mount = document.getElementById("center-mount");
    if (!mount) return;
    const viewFn = window.PortalViews[this.activeTab] || window.PortalViews.dashboard;
    mount.innerHTML = viewFn.call(window.PortalViews, window.ElderCareData);
  },

  renderSchedule() {
    const schedMount = document.getElementById("schedule-mount");
    if (!schedMount) return;
    const items = window.ElderCareData.schedule;

    schedMount.innerHTML = items.map((item, idx) => `
      ${idx === 2 ? `
        <div class="now-divider">
          <span class="now-pill">11:50 AM</span>
          <div class="now-line"></div>
        </div>
      ` : ""}
      <div class="time-slot">
        <div class="time-label">${item.time}</div>
        <div class="sched-card ${item.style}">
          <div class="sched-icon">${item.icon}</div>
          <div>
            ${item.tag ? `<span class="sched-tag">${item.tag}</span>` : ""}
            <div class="sched-title">${item.title}</div>
            <div class="sched-meta">${item.meta}</div>
            <div class="sched-time">🕒 ${item.range}</div>
          </div>
        </div>
      </div>
    `).join("");
  },

  toggleMed(id) {
    const m = window.ElderCareData.medicines.find(x => x.id === id);
    if (!m) return;
    m.status = m.status === "taken" ? "pending" : "taken";
    this.render();
  },

  addMed(e) {
    e.preventDefault();
    const name = document.getElementById("new-med-name").value.trim();
    const sub = document.getElementById("new-med-time").value.trim();
    window.ElderCareData.medicines.push({
      id: Date.now(),
      name,
      sub,
      status: "pending",
      avatar: "💊"
    });
    this.render();
  },

  addSteps(n) {
    const s = window.ElderCareData.stats;
    s.stepsToday += n;
    const pct = Math.min(100, Math.round((s.stepsToday / s.stepsGoal) * 100));
    window.ElderCareData.weeklyMobility[6].pct = pct;
    this.render();
  }
};

document.addEventListener("DOMContentLoaded", () => window.PortalApp.init());
