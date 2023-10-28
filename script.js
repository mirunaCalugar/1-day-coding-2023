const content = document.getElementById('content');
const reservations = [];
// Define an array to store scooter data
const scooters = [
  { id: 1, status: 'free' },
  { id: 2, status: 'free' },
  { id: 3, status: 'free' },
  // Add more scooter objects as needed
];
// Function to populate the reservations table
function populateReservationTable() {
  const reservationTableBody = document.querySelector('.reservationTableBody');

  // Sort the reservations by date before populating
  reservations.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Clear the table before populating
  reservationTableBody.innerHTML = '';

  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const dateCell = document.createElement('td');

    nameCell.textContent = reservation.name;
    dateCell.textContent = reservation.date;

    row.appendChild(nameCell);
    row.appendChild(dateCell);
    reservationTableBody.appendChild(row);
  });
}
populateReservationTable();
// Add event listeners for sorting buttons
const ascendingSortButton = document.getElementById('ascendingSortButton');
const descendingSortButton = document.getElementById('descendingSortButton');

ascendingSortButton.addEventListener('click', () => {
  sortReservationsByDate(true); // Sort ascending
});

descendingSortButton.addEventListener('click', () => {
  sortReservationsByDate(false); // Sort descending
});

// Function to sort reservations by date
function sortReservationsByDate(ascending) {
  reservations.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (ascending) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  populateReservationTable(); // Refresh the table
}
function listReservations() {
  const reservationTableBody = document.getElementById('reservationTableBody');
  reservationTableBody.innerHTML = '';

  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const statusCell = document.createElement('td');

    nameCell.textContent = reservation.name;
    dateCell.textContent = reservation.date;

    const scooter = scooters.find(s => s.id === reservation.scooterId);
    if (scooter) {
      statusCell.textContent = 'Occupied';
    } else {
      statusCell.textContent = 'Reserved (Available Scooter)';
    }

    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(statusCell);
    reservationTableBody.appendChild(row);
  });
}

// Add a new function to update scooter status based on reservations
function updateScooterStatus(reservation) {
  const scooterId = reservations.length + 1; // Assign a scooter based on the reservation order

  // Check if there's a free scooter to assign, otherwise mark it as reserved
  const scooter = scooters.find(s => s.status === 'free');
  if (scooter) {
    scooter.status = 'occupied';
    reservation.scooterId = scooter.id;
  } else {
    reservation.scooterId = scooterId;
    scooters.push({ id: scooterId, status: 'reserved' });
  }
}

// function reserveScooter() {
//     // Step 1: Validate the input data
//     const name = document.getElementById('name').value;
//     const date = document.getElementById('date').value;

//     if (!name || !date) {
//         alert('Please fill in all fields.');
//         return;
//     }

//     // Step 2: Check for available scooters
//     const availableScooter = scooters.find(scooter => scooter.status === 'free');

//     if (!availableScooter) {
//         alert('Sorry, there are no scooters available at the moment.');
//         return;
//     }

//     // Step 3: Reserve a scooter if available
//     availableScooter.status = 'occupied';

//     // Step 4: Add the reservation
//     const reservation = {
//         name: name,
//         date: date,
//         scooterId: availableScooter.id,
//     };
//     reservations.push(reservation);

//     // Step 5: Refresh the table of reservations
//     listReservations();

//     // Optional: Display a success message
//     const successMessage = document.createElement('p');
//     successMessage.textContent = 'Reservation successful!';
//     successMessage.className = 'success';
//     content.appendChild(successMessage);

//     // Clear the form fields
//     document.getElementById('name').value = '';
//     document.getElementById('date').value = '';
// }
function reserveScooter() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;

  // Basic input validation
  if (!name || !date) {
    alert('Please fill in all fields.');
    return;
  }

  // Simulate data storage (in a real app, you'd make an API request or interact with a database)
  const reservation = {
    name,
    date,
  };

  reservations.push(reservation);

  // Display a success message
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Reservation successful!';
  successMessage.className = 'success';
  content.appendChild(successMessage);

  // Clear the form fields
  document.getElementById('name').value = '';
  document.getElementById('date').value = '';

  // List reservations (optional)
  listReservations();
}
console.log(scooters);

function navigateTo(page) {
  if (page === 'home') {
    content.innerHTML = '<h2>Welcome to our Scooter Reservation App</h2>';
  } else if (page === 'reserve') {
    content.innerHTML = `
          <h2>Reserve a Scooter 🛴</h2>
          <form>
            <label for="name">Your Name:</label>
            <input type="text" id="name" required><br>
            <label for="date">Reservation Date:</label>
            <input type="date" id="date" required><br>
            <button id="btn1" onclick="reserveScooter()">Reserve</button>
          </form>
        `;
  } else if (page === 'manage') {
    content.innerHTML = `
          <h2>Manage Reservations</h2>
            
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="reservationTableBody"></tbody>
          </table>
          <div id="sortingButtons">
            <button id="ascendingSortButton">Sort Ascending</button>
            <button id="descendingSortButton">Sort Descending</button>
          </div>
        `;
    listReservations();
  }
}

navigateTo('home');
