const habitTracker = document.getElementById('habitTracker');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const trackerTitle = document.getElementById('trackerTitle');
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Populate year select
for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}
yearSelect.value = currentYear;

monthSelect.value = currentMonth;

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function updateCalendar() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const daysInMonth = getDaysInMonth(month, year);

    trackerTitle.textContent = `Habit Tracker - ${monthSelect.options[monthSelect.selectedIndex].text} ${year}`;

    // Clear existing calendar
    const headerRow = habitTracker.querySelector('thead tr');
    headerRow.innerHTML = '<th>Habit</th>';

    // Add date headers
    for (let i = 1; i <= daysInMonth; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }

    // Add Total and Completed columns
    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    headerRow.appendChild(totalHeader);

    const completedHeader = document.createElement('th');
    completedHeader.textContent = 'Completed';
    headerRow.appendChild(completedHeader);

    // Update habit rows
    const habits = habitTracker.querySelectorAll('tbody tr');
    habits.forEach(habit => {
        // Clear existing cells
        while (habit.children.length > 1) {
            habit.removeChild(habit.lastChild);
        }

        // Add habit cells
        for (let i = 1; i <= daysInMonth; i++) {
            const td = document.createElement('td');
            td.classList.add('habit-cell');
            td.addEventListener('click', toggleStatus);
            habit.appendChild(td);
        }

        // Add Total cell
        const totalCell = document.createElement('td');
        totalCell.classList.add('total');
        totalCell.textContent = '0';
        habit.appendChild(totalCell);

        // Add Completed cell
        const completedCell = document.createElement('td');
        completedCell.classList.add('completed-count');
        completedCell.textContent = '0';
        habit.appendChild(completedCell);
    });
}

function toggleStatus(e) {
    const cell = e.target;
    if (!cell.classList.contains('completed')) {
        cell.classList.add('completed');
        cell.classList.remove('partial', 'failed');
    } else if (!cell.classList.contains('partial')) {
        cell.classList.add('partial');
        cell.classList.remove('completed', 'failed');
    } else if (!cell.classList.contains('failed')) {
        cell.classList.add('failed');
        cell.classList.remove('completed', 'partial');
    } else {
        cell.classList.remove('completed', 'partial', 'failed');
    }
    updateTotals(cell.parentElement);
}

function updateTotals(row) {
    const cells = row.querySelectorAll('.habit-cell');
    const totalCell = row.querySelector('.total');
    const completedCell = row.querySelector('.completed-count');
    
    let total = 0;
    let completed = 0;
    
    cells.forEach(cell => {
        if (cell.classList.contains('completed') || cell.classList.contains('partial') || cell.classList.contains('failed')) {
            total++;
        }
        if (cell.classList.contains('completed')) {
            completed++;
        }
    });
    
    totalCell.textContent = `${total}/${cells.length}`;
    completedCell.textContent = completed;
}

function addNewHabit() {
    const newHabitInput = document.getElementById('newHabitInput');
    const habitName = newHabitInput.value.trim();
    
    if (habitName) {
        const newRow = document.createElement('tr');
        const habitCell = document.createElement('td');
        habitCell.textContent = habitName;
        newRow.appendChild(habitCell);
        
        const daysInMonth = getDaysInMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
        
        for (let i = 1; i <= daysInMonth; i++) {
            const td = document.createElement('td');
            td.classList.add('habit-cell');
            td.addEventListener('click', toggleStatus);
            newRow.appendChild(td);
        }
        
        // Add Total cell
        const totalCell = document.createElement('td');
        totalCell.classList.add('total');
        totalCell.textContent = `0/${daysInMonth}`;
        newRow.appendChild(totalCell);
        
        // Add Completed cell
        const completedCell = document.createElement('td');
        completedCell.classList.add('completed-count');
        completedCell.textContent = '0';
        newRow.appendChild(completedCell);
        
        habitTracker.querySelector('tbody').appendChild(newRow);
        newHabitInput.value = '';
    }
}

monthSelect.addEventListener('change', updateCalendar);
yearSelect.addEventListener('change', updateCalendar);

// Initial calendar setup
updateCalendar();
