let eventData = [];

// Load data from a text file
function loadData(file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Data loaded successfully:");
      console.log(data);  // Log raw data for inspection
      callback(data);
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

// Parse event data
function parseEventData(data) {
  // Split the data by newline and map each line
  eventData = data.trim().split("\n").map(line => {
    const [category, event, months, description] = line.split("|");
    return { category, event, months: months.split(","), description };
  });

  // Check the parsed event data
  console.log("Parsed event data:");
  console.log(eventData);

  populateCalendarView();
  populateListView();
}

// Populate the calendar view
function populateCalendarView() {
  const calendarContainer = document.getElementById("calendarContainer");
  calendarContainer.innerHTML = ""; // Clear existing content

  // Create header row
  const headerRow = document.createElement("div");
  headerRow.classList.add("calendar-row");

  // Add "Event" header
  const eventHeader = document.createElement("div");
  eventHeader.classList.add("header-cell");
  eventHeader.textContent = "Event";
  headerRow.appendChild(eventHeader);

  // Add month headers
  "JanFebMarAprMayJunJulAugSepOctNovDec".match(/.{3}/g).forEach(month => {
    const monthHeader = document.createElement("div");
    monthHeader.classList.add("header-cell");
    monthHeader.textContent = month;
    headerRow.appendChild(monthHeader);
  });

  calendarContainer.appendChild(headerRow);

  // Add data rows
  eventData.forEach(entry => {
    const row = document.createElement("div");
    row.classList.add("calendar-row");

    // Add event name
    const eventName = document.createElement("div");
    eventName.classList.add("event-name");
    eventName.textContent = `${entry.category}: ${entry.event}`;
    row.appendChild(eventName);

    // Add month dots
    "JanFebMarAprMayJunJulAugSepOctNovDec".match(/.{3}/g).forEach(month => {
      const dotCell = document.createElement("div");
      dotCell.classList.add("dot-cell");

      // Add dot if the event occurs in this month
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (entry.months.includes(month)) {
        dot.classList.add("active");
      }
      dotCell.appendChild(dot);
      row.appendChild(dotCell);
    });

    calendarContainer.appendChild(row);
  });
}

// Populate the list view
function populateListView() {
  const list = document.getElementById("eventList");
  list.innerHTML = ""; // Clear existing content

  eventData.forEach(entry => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${entry.category}:</strong> ${entry.event} <br> <em>${entry.description}</em>`;
    list.appendChild(listItem);
  });
}

// Filter list view
function filterList() {
  const searchBar = document.getElementById("searchBar");
  const filter = searchBar.value.toLowerCase();
  const items = document.querySelectorAll("#eventList li");

  items.forEach(item => {
    const text = item.textContent || item.innerText;
    item.style.display = text.toLowerCase().includes(filter) ? "" : "none";
  });
}

// Show the active tab
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

// Initialize app
function initializeApp() {
  loadData("event_data.txt", parseEventData);
  showTab("calendar"); // Show calendar by default
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeApp);
