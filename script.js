const toastElement = document.getElementById("toast");
const reportModal = document.getElementById("reportModal");
const reportForm = document.getElementById("reportForm");
const reportList = document.getElementById("reportList");

function toast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("show");

  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2800);
}

function scan() {
  const address = document.getElementById("address").value.trim();

  if (!address) {
    toast("Enter an address to begin an investigation.");
    return;
  }

  toast("Investigation created. Opening evidence workspace…");

  document.getElementById("intelligence").scrollIntoView({
    behavior: "smooth"
  });
}

function openReport() {
  reportModal.classList.add("open");
  document.getElementById("entity").focus();
}

function closeReport() {
  reportModal.classList.remove("open");
}

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = document.getElementById("type").value;
  const network = document.getElementById("network").value;
  const entity = document.getElementById("entity").value.trim();

  const report = document.createElement("div");
  report.className = "report";

  report.innerHTML = `
    <span class="report-type">UNVERIFIED</span>
    <b>${escapeHtml(type)}</b>
    <small>
      ${escapeHtml(network)} ·
      ${escapeHtml(shortenAddress(entity))} ·
      Submitted just now · Review pending
    </small>
  `;

  reportList.prepend(report);

  const status = document.getElementById("status");
  status.style.display = "block";

  setTimeout(() => {
    closeReport();
    reportForm.reset();
    status.style.display = "none";
    toast("Community report submitted for moderation.");
  }, 900);
});

function shortenAddress(value) {
  if (value.length <= 18) return value;
  return `${value.slice(0, 18)}…`;
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}