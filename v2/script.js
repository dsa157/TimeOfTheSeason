/* script.js */
function showTab(tabId) {
  // Hide all tab contents
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Show the selected tab content and mark tab as active
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function filterList() {
  const searchBar = document.getElementById('searchBar');
  const filter = searchBar.value.toLowerCase();
  const eventList = document.getElementById('eventList');
  const items = eventList.getElementsByTagName('li');

  // Loop through all list items
  Array.from(items).forEach(item => {
    const text = item.textContent || item.innerText;
    item.style.display = text.toLowerCase().includes(filter) ? '' : 'none';
  });
}
