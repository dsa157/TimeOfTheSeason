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

  // Group events by category
  const groupedEvents = eventData.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = [];
    }
    acc[entry.category].push(entry);
    return acc;
  }, {});

  console.log("Grouped event data:");
  console.log(groupedEvents);

  populateCalendarView(groupedEvents);
  populateListView(groupedEvents);
}

// Populate the calendar view
function populateCalendarView(groupedEvents) {
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

  // Add grouped data rows
  Object.keys(groupedEvents).forEach(category => {
    groupedEvents[category].forEach(entry => {
      const row = document.createElement("div");
      row.classList.add("calendar-row");

      // Add event name
      const eventName = document.createElement("div");
      eventName.classList.add("event-name");
      eventName.textContent = `${entry.category}: ${entry.event}`;
      row.appendChild(eventName);

      // Add month dots only for active months
      "JanFebMarAprMayJunJulAugSepOctNovDec".match(/.{3}/g).forEach(month => {
        const dotCell = document.createElement("div");
        dotCell.classList.add("dot-cell");

        // Only add dot if the event occurs in this month
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (entry.months.includes(month)) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active"); // Ensure inactive dots are not added
        }
        dotCell.appendChild(dot);
        row.appendChild(dotCell);
      });

      calendarContainer.appendChild(row);
    });
  });
}

// Populate the list view
// Populate the list view
function populateListView(groupedEvents) {
  const listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = ""; // Clear existing content

  // Iterate through grouped events and create collapsible categories
  Object.keys(groupedEvents).forEach(category => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("list-category");

    // Category title
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryTitle.onclick = () => toggleCategory(category);
    categorySection.appendChild(categoryTitle);

    // Event list for this category
    const eventList = document.createElement("div");
    eventList.classList.add("list-items", "active"); // Add 'active' by default
    eventList.setAttribute("id", `${category}-list`);

    const eventListUl = document.createElement("ul");
    eventListUl.classList.add("event-list");

    groupedEvents[category].forEach(entry => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${entry.event}</strong><br><em>${entry.description}</em>`;
      eventListUl.appendChild(listItem);
    });

    eventList.appendChild(eventListUl);
    categorySection.appendChild(eventList);

    listContainer.appendChild(categorySection);
  });
}


// Toggle visibility of event list in each category
function toggleCategory(category) {
  const categoryList = document.getElementById(`${category}-list`);
  categoryList.classList.toggle("active");
}

// Filter list view
function filterList() {
  const searchBar = document.getElementById("searchBar");
  const filter = searchBar.value.toLowerCase();
  const items = document.querySelectorAll(".event-list li");
  let anyMatches = false;

  items.forEach(item => {
    const text = item.textContent || item.innerText;
    const parentCategory = item.closest(".list-category");
    const categoryItems = parentCategory.querySelectorAll(".event-list li");

    // Show or hide items based on filter match
    if (text.toLowerCase().includes(filter)) {
      item.style.display = "";
      anyMatches = true;
    } else {
      item.style.display = "none";
    }

    // Hide the category if no items are showing
    const allHidden = Array.from(categoryItems).every(i => i.style.display === "none");
    const categorySection = parentCategory.closest('.list-category');
    if (allHidden) {
      categorySection.style.display = "none";
    } else {
      categorySection.style.display = "block";
    }
  });

  // Update visibility of clear filter icon based on filter text
  const clearIcon = document.getElementById("clearFilter");
  clearIcon.style.display = filter ? "block" : "none";
}

// Clear the search filter
function clearFilter() {
  const searchBar = document.getElementById("searchBar");
  searchBar.value = "";
  filterList();  // Reapply filter to reset all visibility
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
