/* ==========================================================================
   ElderCare 360 (v3) — Real-Time MPU6050 Telemetry & 15s Fall Alert Engine
   ========================================================================== */

window.FallSimulator = {
  timer: null,
  seconds: 15,
  isFalling: false,

  start() {
    setInterval(() => {
      if (this.isFalling) return;
      const s = window.ElderCareData.stats;
      s.fallG = +(0.98 + (Math.random() * 0.06 - 0.03)).toFixed(2);
      s.tiltDeg = Math.round(5 + Math.random() * 4);
      s.posture = "Safe Posture";

      const gEl = document.getElementById("stat-g-val");
      if (gEl) gEl.textContent = s.fallG + "g";
    }, 1500);
  },

  triggerFall() {
    this.isFalling = true;
    this.seconds = 15;

    const s = window.ElderCareData.stats;
    s.fallG = 3.84;
    s.tiltDeg = 78;
    s.posture = "FALL DETECTED!";

    const modal = document.getElementById("fall-modal");
    const countEl = document.getElementById("fall-timer");
    if (modal) modal.classList.add("open");
    if (countEl) countEl.textContent = this.seconds;

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.seconds -= 1;
      if (countEl) countEl.textContent = this.seconds;
      if (this.seconds <= 0) {
        clearInterval(this.timer);
        this.sendSOS("Automatic Fall SOS: No response within 15 seconds (3.84g impact).");
      }
    }, 1000);

    window.PortalApp.render();
  },

  cancelFall() {
    if (this.timer) clearInterval(this.timer);
    this.isFalling = false;

    const s = window.ElderCareData.stats;
    s.fallG = 1.00;
    s.tiltDeg = 6;
    s.posture = "Safe Posture";

    const modal = document.getElementById("fall-modal");
    if (modal) modal.classList.remove("open");

    window.ElderCareData.alerts.unshift({
      time: "Just now",
      title: "Fall Alert Cancelled (Safe)",
      msg: "Ramesh pressed 'I Am Okay'. False alarm cleared."
    });
    window.PortalApp.render();
  },

  sendSOS(reason) {
    if (this.timer) clearInterval(this.timer);
    this.isFalling = false;

    const modal = document.getElementById("fall-modal");
    if (modal) modal.classList.remove("open");

    window.ElderCareData.alerts.unshift({
      time: "Just now",
      title: "🚨 EMERGENCY SOS DISPATCHED",
      msg: reason + " Notified Priya Kulkarni (+91 98230 44112)."
    });

    alert("🚨 EMERGENCY SOS SENT!\n\n" + reason + "\nSMS & GPS coordinates sent to Priya Kulkarni & Emergency Services.");
    window.PortalApp.switchTab("caregiver");
  }
};
