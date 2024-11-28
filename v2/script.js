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
