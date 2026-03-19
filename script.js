// --- Mostrar secciones ---
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
showSection('home')
// --- Datos de animales ---
const animalStats = {
  tech: {
    name: "Clever Cat",
    img: "images/CLEVERCAT.png",
    speed: 85,
    hp: 70,
    damage: 80,
    defense: 65
  },
  food: {
    name: "Daunting Duck",
    img: "images/Duck.png",
    speed: 80,
    hp: 85,
    damage: 70,
    defense: 65
  },
  healthcare: {
    name: "Serpent Savior",
    img: "images/Serpent.png",
    speed: 70,
    hp: 95,
    damage: 65,
    defense: 70
  },
  finance: {
    name: "Big Bear",
    img: "images/Bear.png",
    speed: 75,
    hp: 80,
    damage: 70,
    defense: 85
  },
  energy: {
    name: "Solar Dog",
    img: "images/SolarDog.png",
    speed: 70,
    hp: 90,
    damage: 75,
    defense: 75
  }
};

// --- Crear modal dinámico ---
function createModal() {
  const modal = document.createElement("div");
  modal.id = "animal-modal";
  modal.className = "modal hidden";
  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-modal" class="close-btn">&times;</span>
      <img id="modal-img" src="" alt="animal image">
      <h2 id="modal-name"></h2>
      <div class="stats">
        <p><strong>Speed:</strong> <span id="stat-speed"></span></p>
        <p><strong>HP:</strong> <span id="stat-hp"></span></p>
        <p><strong>Damage:</strong> <span id="stat-damage"></span></p>
        <p><strong>Defense:</strong> <span id="stat-defense"></span></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Cerrar modal
  document.getElementById("close-modal").onclick = () => modal.classList.add("hidden");
  modal.onclick = e => { if (e.target === modal) modal.classList.add("hidden"); };
}

createModal();

// --- Mostrar modal ---
function showModal(id) {
  const data = animalStats[id];
  if (!data) return;

  document.getElementById("modal-img").src = data.img;
  document.getElementById("modal-name").textContent = data.name;
  document.getElementById("stat-speed").textContent = data.speed;
  document.getElementById("stat-hp").textContent = data.hp;
  document.getElementById("stat-damage").textContent = data.damage;
  document.getElementById("stat-defense").textContent = data.defense;

  document.getElementById("animal-modal").classList.remove("hidden");
}

// --- Eventos de click en las cards ---
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".collection-card").forEach(card => {
    const id = card.getAttribute("id");
    card.addEventListener("click", () => showModal(id));
  });
});

// --- TEST DATASET DE COMPAÑÍAS ---
const companies = [
  { name: "CleverTech", ticker: "CLT", sector: "Tech" },
  { name: "SolarCore", ticker: "SLR", sector: "Energy" },
  { name: "BigBank", ticker: "BBK", sector: "Finance" },
  { name: "Medilife", ticker: "MDL", sector: "Healthcare" },
  { name: "DuckFoods", ticker: "DKF", sector: "Food" },
  { name: "QuantumSoft", ticker: "QSF", sector: "Tech" },
  { name: "GreenOil", ticker: "GNO", sector: "Energy" },
  { name: "Farmy", ticker: "FRM", sector: "Food" },
  { name: "VitalPlus", ticker: "VTP", sector: "Healthcare" },
  { name: "MoneyLion", ticker: "MNL", sector: "Finance" },
];

// --- ELEMENTOS ---
const searchInput = document.getElementById("company-search");
const sectorList = document.querySelector(".sector-list");
const searchBlock = document.querySelector(".search-block");

// Crear contenedor para resultados dinámicos
const resultsContainer = document.createElement("div");
resultsContainer.classList.add("company-results");
resultsContainer.style.display = "none";
searchBlock.appendChild(resultsContainer);

// --- Función para renderizar compañías ---
function showCompanies(filtered) {
  resultsContainer.innerHTML = ""; // limpiar antes

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No companies found.</p>";
  } else {
    filtered.forEach(c => {
      const div = document.createElement("div");
      div.className = "company-item";
      div.innerHTML = `<strong>${c.ticker}</strong> — ${c.name} <span class="sector-tag">(${c.sector})</span>`;
      resultsContainer.appendChild(div);
    });
  }

  // mostrar lista, ocultar sectores
  resultsContainer.style.display = "block";
  sectorList.style.display = "none";
  document.querySelector(".search-or").style.display = "none";
}

// --- Mostrar sectores nuevamente ---
function showSectors() {
  resultsContainer.style.display = "none";
  sectorList.style.display = "flex";
  document.querySelector(".search-or").style.display = "block";
}

// --- Evento: cambio en input ---
searchInput.addEventListener("input", e => {
  const query = e.target.value.trim().toUpperCase();
  if (query !== "") {
    const filtered = companies.filter(c => c.ticker.includes(query));
    showCompanies(filtered);
  } else {
    showSectors();
  }
});

// --- Evento: clic en sector ---
document.querySelectorAll(".sector-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const sectorName = btn.querySelector("span").textContent;
    const filtered = companies.filter(c => c.sector === sectorName);
    showCompanies(filtered);
  });
});

// --- BATTLE FRAME SWITCH ---
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-battle-btn");
  const startFrame = document.getElementById("battle-start");
  const roundFrame = document.getElementById("battle-round1");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startFrame.classList.add("hidden");
      roundFrame.classList.remove("hidden");
    });
  }
});

// --- COACH SECTION TIPS CYCLE ---
document.addEventListener("DOMContentLoaded", () => {
  const tips = document.querySelectorAll(".tip-btn");
  const details = document.getElementById("tip-details");

  const tipExplanations = {
    budget: "Tracking your income and expenses helps you allocate money efficiently and prevents overspending. A simple monthly budget is the foundation of financial stability.",
    savings: "Consistently saving 20% of your income ensures long-term security and gives you freedom to invest or handle unexpected costs comfortably.",
    invest: "Investing across multiple sectors or asset types reduces your risk and helps your wealth grow steadily over time.",
    emergency: "An emergency fund should cover 3-6 months of expenses. It protects you from having to sell assets or go into debt during hard times."
  };

  tips.forEach((btn) => {
    btn.addEventListener("click", () => {
      tips.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.dataset.tip;
      details.textContent = tipExplanations[key];
    });
  });
});
// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {

  // Seleccionamos el botón "Submit Choice"
  const submitBtn = document.querySelector(".submit-choice-btn");

  // Verificamos que exista
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const roundFrame = document.getElementById("battle-round1");
      const currentBattle = document.getElementById("current-battle");

      // Ocultar la pantalla de ronda
      roundFrame.classList.add("hidden");

      // Mostrar la batalla actual
      currentBattle.classList.remove("hidden");

      // (Opcional) Simular animación del log de batalla
      const logContainer = document.getElementById("battle-log-text");
      const logLines = [
        "CleverCat attacks first with Laser Scratch! (-10 HP)",
        "SolarDog retaliates with Solar Flare! (-12 HP)",
        "CleverCat fainted. You won the round!"
      ];

      logContainer.innerHTML = ""; // limpiar log previo

      logLines.forEach((line, i) => {
        setTimeout(() => {
          const p = document.createElement("p");
          p.textContent = line;
          logContainer.appendChild(p);
        }, i * 1500); // cada línea aparece con 1.5s de diferencia
      });
    });
  }

});

