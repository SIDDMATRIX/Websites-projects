/* ═══════════════════════════════════════
   SMYL PRO DASHBOARD — script.js
═══════════════════════════════════════ */

// ─── DATE ───────────────────────────────
const d = new Date();
document.getElementById('dateStr').textContent =
  d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + ' · Last 30 days';


// ─── DATA SETS PER PLATFORM ─────────────
const datasets = {
  all: {
    labels: ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25', 'Mar 30'],
    followers:   [520, 535, 548, 556, 565, 577, 584],
    engagement:  [38,  40,  41,  43,  45,  46,  47.2],
    kpis: { followers: '584K', engagement: '47.2K', reach: '1.04M', impressions: '3.6M' }
  },
  instagram: {
    labels: ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25', 'Mar 30'],
    followers:   [272, 280, 288, 295, 301, 308, 312],
    engagement:  [22,  24,  25,  26,  27,  28,  28.5],
    kpis: { followers: '312K', engagement: '28.5K', reach: '620K', impressions: '1.9M' }
  },
  linkedin: {
    labels: ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25', 'Mar 30'],
    followers:   [140, 144, 148, 151, 154, 157, 158],
    engagement:  [10,  10,  11,  11,  12,  12,  12.4],
    kpis: { followers: '158K', engagement: '12.4K', reach: '280K', impressions: '1.1M' }
  },
  twitter: {
    labels: ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25', 'Mar 30'],
    followers:   [108, 111, 112, 110, 110, 112, 114],
    engagement:  [6,   6,   5,   6,   6,   6,   6.3],
    kpis: { followers: '114K', engagement: '6.3K', reach: '140K', impressions: '0.6M' }
  }
};


// ─── GROWTH LINE CHART ──────────────────
const growthCtx = document.getElementById('growthChart').getContext('2d');

// Gradient fill under the line
const gradLine = growthCtx.createLinearGradient(0, 0, 0, 180);
gradLine.addColorStop(0, 'rgba(200,255,87,0.25)');
gradLine.addColorStop(1, 'rgba(200,255,87,0)');

const growthChart = new Chart(growthCtx, {
  type: 'line',
  data: {
    labels: datasets.all.labels,
    datasets: [
      {
        label: 'Followers (K)',
        data: datasets.all.followers,
        borderColor: '#c8ff57',
        backgroundColor: gradLine,
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointBackgroundColor: '#c8ff57',
        pointBorderWidth: 0,
        borderWidth: 2
      },
      {
        label: 'Engagement (K)',
        data: datasets.all.engagement,
        borderColor: '#ff5c8a',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.45,
        pointRadius: 3,
        pointBackgroundColor: '#ff5c8a',
        pointBorderWidth: 0,
        borderWidth: 2,
        borderDash: [4, 3]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: {
          color: '#8890a8',
          font: { family: 'DM Sans', size: 11 },
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(10,11,20,0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#8890a8',
        padding: 10,
        titleFont: { family: 'Syne', weight: '700' }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: { color: '#555870', font: { family: 'DM Sans', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: {
          color: '#555870',
          font: { family: 'DM Sans', size: 11 },
          callback: v => v + 'K'
        }
      }
    }
  }
});


// ─── DONUT CHART ────────────────────────
const donutCtx = document.getElementById('donutChart').getContext('2d');
new Chart(donutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Instagram', 'LinkedIn', 'Twitter'],
    datasets: [{
      data: [53, 27, 20],
      backgroundColor: ['#e1306c', '#0a66c2', '#1d9bf0'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  }
});


// ─── AGE BARS ───────────────────────────
const ages = [
  { label: '18–24', pct: 34, color: '#c8ff57' },
  { label: '25–34', pct: 41, color: '#5ce4ff' },
  { label: '35–44', pct: 16, color: '#a78bfa' },
  { label: '45+',   pct: 9,  color: '#ff5c8a' }
];

const ageBarsEl = document.getElementById('ageBars');
ageBarsEl.innerHTML = ages.map(a => `
  <div style="margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;font-size:11px;color:#8890a8;margin-bottom:4px">
      <span>${a.label}</span>
      <span style="font-weight:600;color:#f0f0f5">${a.pct}%</span>
    </div>
    <div style="height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden">
      <div style="height:100%;width:${a.pct}%;background:${a.color};border-radius:3px;transition:width .8s ease"></div>
    </div>
  </div>
`).join('');


// ─── PLATFORM TAB SWITCH ────────────────
function switchPlatform(type, el) {
  // Update active tab
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  const data = datasets[type];

  // Update KPI values
  document.getElementById('kv-followers').textContent   = data.kpis.followers;
  document.getElementById('kv-engagement').textContent  = data.kpis.engagement;
  document.getElementById('kv-reach').textContent       = data.kpis.reach;
  document.getElementById('kv-impressions').textContent = data.kpis.impressions;

  // Update growth chart data
  growthChart.data.labels                  = data.labels;
  growthChart.data.datasets[0].data        = data.followers;
  growthChart.data.datasets[1].data        = data.engagement;
  growthChart.update('active');
}


// ─── RANGE BUTTON TOGGLE ─────────────────
function setRange(range, el) {
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.classList.remove('active-range');
    btn.style.background = 'transparent';
    btn.style.color = '#555870';
  });
  el.classList.add('active-range');
  el.style.background = 'rgba(255,255,255,0.06)';
  el.style.color = '#f0f0f5';

  // Simulate different data ranges (shift/slice data for feel)
  const currentPlatform = document.querySelector('.ptab.active');
  const type = currentPlatform ? currentPlatform.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
  const data = datasets[type];

  const slices = { '7d': 2, '30d': 7, '90d': 7 };
  const slice  = slices[range] || 7;

  growthChart.data.labels             = data.labels.slice(-slice);
  growthChart.data.datasets[0].data   = data.followers.slice(-slice);
  growthChart.data.datasets[1].data   = data.engagement.slice(-slice);
  growthChart.update('active');
}


// ─── SIDEBAR NAV ACTIVE STATE ────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});