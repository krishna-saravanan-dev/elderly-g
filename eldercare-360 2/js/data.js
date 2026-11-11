/* ==========================================================================
   ElderCare 360 (v3) — Patient, Health, Medicines, Schedule & Hardware Data
   ========================================================================== */

window.ElderCareData = {
  patient: {
    name: "Ramesh Kulkarni",
    role: "Senior Patient • 72 y.o.",
    caregiver: "Dr. Anand Deshmukh",
    caregiverRole: "Geriatric Specialist",
    location: "Pune • 1st Floor Bedroom",
    battery: 86
  },

  stats: {
    heartRate: 74,
    bloodPressure: "124/80",
    stepsToday: 4820,
    stepsGoal: 6000,
    fallG: 1.00,
    tiltDeg: 6,
    posture: "Safe Posture"
  },

  weeklyMobility: [
    { day: "Mon", pct: 76, steps: 4560 },
    { day: "Tue", pct: 88, steps: 5280 },
    { day: "Wed", pct: 70, steps: 4200 },
    { day: "Thu", pct: 94, steps: 5640 },
    { day: "Fri", pct: 82, steps: 4920 },
    { day: "Sat", pct: 64, steps: 3840 },
    { day: "Today", pct: 80, steps: 4820 }
  ],

  healthBreakdown: [
    { label: "Step Goal Progress", val: "80%" },
    { label: "Medication Adherence", val: "75%" },
    { label: "Posture Stability", val: "98%" },
    { label: "Sleep Quality (7.5h)", val: "92%" },
    { label: "Hydration (5/8 cups)", val: "63%" },
    { label: "ESP32 Sensor Battery", val: "86%" },
    { label: "SpO2 Oxygen Level", val: "98%" },
    { label: "Body Temperature", val: "98.4°F" }
  ],

  medicines: [
    { id: 1, name: "Amlodipine (5 mg)", sub: "Blood Pressure • 08:00 AM", status: "taken", avatar: "💊" },
    { id: 2, name: "Metformin (500 mg)", sub: "Post-Lunch • 01:30 PM", status: "taken", avatar: "💊" },
    { id: 3, name: "Calcium + Vit D3", sub: "Evening Dose • 06:00 PM", status: "pending", avatar: "☀️" },
    { id: 4, name: "Atorvastatin (10 mg)", sub: "Before Sleep • 09:00 PM", status: "pending", avatar: "🌙" }
  ],

  schedule: [
    {
      time: "08:00 AM",
      style: "amber",
      icon: "💊",
      tag: "Morning Care",
      title: "Amlodipine 5mg & BP Check",
      meta: "Bedroom • 124/80 mmHg logged",
      range: "08:00 AM – 08:30 AM"
    },
    {
      time: "10:30 AM",
      style: "white",
      icon: "🚶",
      tag: null,
      title: "Morning Walk & Knee Stretches",
      meta: "Garden Path • 2,400 steps",
      range: "10:30 AM – 11:15 AM"
    },
    {
      time: "02:00 PM",
      style: "taupe",
      icon: "📡",
      tag: null,
      title: "MPU6050 Waistband Sync & Check",
      meta: "ESP32 Wi-Fi • 86% Battery",
      range: "02:00 PM – 03:00 PM"
    },
    {
      time: "06:00 PM",
      style: "amber",
      icon: "👨‍⚕️",
      tag: "Upcoming",
      title: "Calcium D3 & Dr. Deshmukh Call",
      meta: "Video Check-in • Clinic Wing B",
      range: "06:00 PM – 06:30 PM"
    }
  ],

  contacts: [
    { name: "Priya Kulkarni", role: "Daughter (Primary Caregiver)", phone: "+91 98230 44112" },
    { name: "Rohan Kulkarni", role: "Son • 15 mins away", phone: "+91 98230 88901" },
    { name: "Dr. Anand Deshmukh", role: "Family Physician", phone: "+91 20 2543 9900" },
    { name: "Emergency Ambulance", role: "24x7 Cardiac & Fall Dispatch", phone: "108" }
  ],

  alerts: [
    { time: "06:00 PM", title: "Evening Medicine Reminder", msg: "Calcium + Vitamin D3 is due at 6:00 PM." },
    { time: "01:35 PM", title: "Metformin Marked Taken", msg: "Ramesh confirmed afternoon tablet dose." },
    { time: "09:00 AM", title: "ESP32 + MPU6050 Connected", msg: "Waistband streaming 6-axis telemetry at 50Hz." }
  ]
};
