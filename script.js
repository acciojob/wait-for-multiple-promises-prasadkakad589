//your JS code here. If required.
const output = document.getElementById("output");

// Step 1: Show Loading row initially
output.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

// Helper function to create a promise with random delay
function createPromise() {
  const delay = Math.random() * 2 + 1; // between 1 and 3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay * 1000);
  });
}

// Step 2: Create 3 promises
const p1 = createPromise();
const p2 = createPromise();
const p3 = createPromise();

// Step 3: Track total time
const startTime = performance.now();

Promise.all([p1, p2, p3]).then((results) => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000;

  // Remove loading row
  output.innerHTML = "";

  // Populate table
  results.forEach((time, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>Promise ${index + 1}</td>
      <td>${time.toFixed(3)}</td>
    `;

    output.appendChild(row);
  });

  // Add total row (max time / actual elapsed time)
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;

  output.appendChild(totalRow);
});