/* ==========================================================================
   ElderCare 360 (v3) — MedSync-Styled Views for All 5 Portal Sections
   ========================================================================== */

window.PortalViews = {
  dashboard(d) {
    const takenCount = d.medicines.filter(m => m.status === "taken").length;

    return `
      <div class="panel-card">
        <div class="section-head">
          <div class="section-title">Statistics</div>
          <div class="pill-tabs">
            <button class="pill-tab active">Week</button>
            <button class="pill-tab" onclick="PortalApp.addSteps(400)">+400 Steps</button>
            <button class="pill-tab" onclick="FallSimulator.triggerFall()">Simulate Fall</button>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-box highlight">
            <div class="stat-top">
              <div class="stat-num">${d.stats.heartRate}<span class="stat-unit">bpm</span></div>
              <span class="stat-badge up">↑ Normal</span>
            </div>
            <div class="stat-label">Heart Rate • BP ${d.stats.bloodPressure}</div>
          </div>

          <div class="stat-box">
            <div class="stat-top">
              <div class="stat-num">${d.stats.stepsToday.toLocaleString()}</div>
              <span class="stat-badge up">↑ 80%</span>
            </div>
            <div class="stat-label">Daily Steps (Goal 6,000)</div>
          </div>

          <div class="stat-box">
            <div class="stat-top">
              <div class="stat-num">${takenCount} / ${d.medicines.length}</div>
              <span class="stat-badge warn">6:00 PM</span>
            </div>
            <div class="stat-label">Medicines Taken Today</div>
          </div>

          <div class="stat-box">
            <div class="stat-top">
              <div class="stat-num" id="stat-g-val">${d.stats.fallG}g</div>
              <span class="stat-badge up">● ${d.stats.tiltDeg}°</span>
            </div>
            <div class="stat-label">MPU6050 Fall Sensor (${d.stats.posture})</div>
          </div>
        </div>
      </div>

      <div class="panel-card">
        <div class="section-head">
          <div class="section-title">Weekly Activity & Vitals Summary</div>
          <button class="btn-pill btn-white" onclick="PortalApp.switchTab('health')">Descending order ⌄</button>
        </div>

        <div class="diagnoses-layout">
          <div>
            <div class="capsule-bars">
              ${d.weeklyMobility.map((item, idx) => `
                <div>
                  <div class="capsule-track">
                    <span class="capsule-pct">${item.pct}%</span>
                    <div class="capsule-fill ${idx === 6 ? 'amber' : ''}" style="height: ${item.pct}%;"></div>
                  </div>
                  <div class="capsule-day">${item.day}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="metrics-table">
            ${d.healthBreakdown.map(m => `
              <div class="metric-pair">
                <span>${m.label}</span>
                <span>${m.val}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="bottom-split">
        <div class="panel-card">
          <div class="section-head">
            <div class="section-title">
              Heart Rate & Motion Telemetry
              <span class="count-circle">50Hz</span>
            </div>
            <div class="pill-tabs">
              <button class="pill-tab">Today</button>
              <button class="pill-tab active">Week</button>
              <button class="pill-tab">Month</button>
            </div>
          </div>

          <svg viewBox="0 0 420 155" style="width: 100%; height: 150px; overflow: visible;">
            <defs>
              <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFCF68" stop-opacity="0.55"/>
                <stop offset="100%" stop-color="#FFCF68" stop-opacity="0.05"/>
              </linearGradient>
              <linearGradient id="taupeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#B6A188" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#B6A188" stop-opacity="0.05"/>
              </linearGradient>
            </defs>
            <line x1="20" y1="30" x2="405" y2="30" stroke="rgba(32,31,30,0.06)" />
            <line x1="20" y1="70" x2="405" y2="70" stroke="rgba(32,31,30,0.06)" />
            <line x1="20" y1="110" x2="405" y2="110" stroke="rgba(32,31,30,0.06)" />

            <path d="M20,115 Q55,85 85,102 T150,65 T215,92 T280,52 T345,88 T405,72 L405,135 L20,135 Z" fill="url(#taupeGrad)" />
            <path d="M20,115 Q55,85 85,102 T150,65 T215,92 T280,52 T345,88 T405,72" fill="none" stroke="#B6A188" stroke-width="2.5" />

            <path d="M20,98 Q55,112 85,78 T150,95 T215,58 T280,82 T345,48 T405,64 L405,135 L20,135 Z" fill="url(#amberGrad)" />
            <path d="M20,98 Q55,112 85,78 T150,95 T215,58 T280,82 T345,48 T405,64" fill="none" stroke="#FFCF68" stroke-width="2.5" />

            <g fill="#9B9691" font-size="10" font-weight="600">
              <text x="20" y="148">Mon</text>
              <text x="82" y="148">Tue</text>
              <text x="145" y="148">Wed</text>
              <text x="208" y="148">Thu</text>
              <text x="272" y="148">Fri</text>
              <text x="335" y="148">Sat</text>
              <text x="390" y="148">Sun</text>
            </g>
          </svg>

          <div style="display: flex; gap: 18px; font-size: 12px; color: var(--text-secondary); margin-top: 6px;">
            <span><strong style="color: #E0A82E;">●</strong> Heart Rate (avg 74 bpm)</span>
            <span><strong style="color: #B6A188;">●</strong> MPU6050 Stability (1.00g)</span>
          </div>
        </div>

        <div class="panel-card">
          <div class="section-head">
            <div class="section-title">
              Medicines list
              <span class="count-circle">${d.medicines.length}</span>
            </div>
            <button class="btn-pill btn-white" onclick="PortalApp.switchTab('medicines')">All ⌄</button>
          </div>

          <div class="list-stack">
            ${d.medicines.map(med => `
              <div class="list-row">
                <div class="row-left">
                  <div class="row-avatar ${med.status === 'taken' ? 'amber' : ''}">${med.avatar}</div>
                  <div>
                    <div class="row-title">${med.name}</div>
                    <div class="row-sub">${med.sub}</div>
                  </div>
                </div>
                <button class="btn-pill ${med.status === 'taken' ? 'btn-white' : 'btn-dark'}" onclick="PortalApp.toggleMed(${med.id})">
                  ${med.status === 'taken' ? '✓ Taken' : 'Take Now'}
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  },

  medicines(d) {
    return `
      <div class="panel-card">
        <div class="section-head">
          <div class="section-title">
            Daily Medicine Reminders & Prescription Tracker
            <span class="count-circle">${d.medicines.length}</span>
          </div>
        </div>

        <div class="list-stack" style="margin-bottom: 20px;">
          ${d.medicines.map(med => `
            <div class="list-row">
              <div class="row-left">
                <div class="row-avatar ${med.status === 'taken' ? 'amber' : 'dark'}">${med.avatar}</div>
                <div>
                  <div class="row-title">${med.name}</div>
                  <div class="row-sub">${med.sub}</div>
                </div>
              </div>
              <button class="btn-pill ${med.status === 'taken' ? 'btn-amber' : 'btn-dark'}" onclick="PortalApp.toggleMed(${med.id})">
                ${med.status === 'taken' ? '✓ Dose Taken (Undo)' : 'Mark Tablet Taken'}
              </button>
            </div>
          `).join("")}
        </div>

        <form onsubmit="PortalApp.addMed(event)" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px;">
          <input id="new-med-name" class="search-box" style="max-width: none;" placeholder="Medicine & Dosage (e.g. Aspirin 75mg)" required />
          <input id="new-med-time" class="search-box" style="max-width: none;" placeholder="Schedule (e.g. After Dinner • 08:30 PM)" required />
          <button type="submit" class="btn-pill btn-dark">+ Add Medicine</button>
        </form>
      </div>
    `;
  },

  health(d) {
    return this.dashboard(d);
  },

  hardware(d) {
    return `
      <div class="panel-card">
        <div class="section-head">
          <div class="section-title">ESP32 + MPU6050 Wearable Fall Detection Lab</div>
          <span class="count-circle">Online</span>
        </div>

        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
          Demonstrate the complete fall detection workflow to your evaluation panel: simulate a 3.84g impact, trigger the 15-second grace timer, or cancel a false alarm.
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 22px;">
          <button class="btn-pill btn-amber" style="padding: 12px 20px; font-size: 14px;" onclick="FallSimulator.triggerFall()">
            ⚠️ Trigger Simulated Hard Fall (3.84g Impact)
          </button>
          <button class="btn-pill btn-dark" style="padding: 12px 20px; font-size: 14px;" onclick="FallSimulator.sendSOS('Manual Emergency SOS Triggered')">
            🚨 Trigger Immediate SOS Dispatch
          </button>
        </div>

        <div class="stats-grid">
          <div class="stat-box highlight">
            <div class="stat-num">${d.stats.fallG}g</div>
            <div class="stat-label">Total Acceleration (SVM &gt; 2.8g)</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${d.stats.tiltDeg}°</div>
            <div class="stat-label">Gyroscope Body Tilt (&gt; 60°)</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">GPIO 21/22</div>
            <div class="stat-label">MPU6050 I2C SDA / SCL Pins</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${d.patient.battery}%</div>
            <div class="stat-label">Waistband LiPo Battery</div>
          </div>
        </div>
      </div>
    `;
  },

  caregiver(d) {
    return `
      <div class="panel-card">
        <div class="section-head">
          <div class="section-title">Caregiver Portal, Emergency Contacts & Alerts</div>
          <button class="btn-pill btn-danger" onclick="FallSimulator.sendSOS('Manual SOS Button Pressed')">🚨 Dispatch Emergency SOS</button>
        </div>

        <div class="bottom-split">
          <div class="list-stack">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">Emergency Family Contacts</div>
            ${d.contacts.map(c => `
              <div class="list-row">
                <div class="row-left">
                  <div class="row-avatar amber">📞</div>
                  <div>
                    <div class="row-title">${c.name}</div>
                    <div class="row-sub">${c.role}</div>
                  </div>
                </div>
                <span class="stat-badge">${c.phone}</span>
              </div>
            `).join("")}
          </div>

          <div class="list-stack">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">Live Notification Log</div>
            ${d.alerts.map(a => `
              <div class="list-row">
                <div class="row-left">
                  <div class="row-avatar dark">🔔</div>
                  <div>
                    <div class="row-title">${a.title} <span style="font-weight:400; color:var(--text-muted);">(${a.time})</span></div>
                    <div class="row-sub">${a.msg}</div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
};
