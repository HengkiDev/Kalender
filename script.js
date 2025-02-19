// Data hari libur
const holidayData = {
    '2025-01-01': 'Tahun Baru 2025',
    '2025-02-01': 'Tahun Baru Imlek 2576',
    '2025-03-11': 'Isra Miraj',
    '2025-03-31': 'Hari Raya Nyepi',
    '2025-04-18': 'Wafat Isa Almasih',
    '2025-04-20': 'Hari Raya Idul Fitri',
    '2025-04-21': 'Hari Raya Idul Fitri',
    '2025-05-01': 'Hari Buruh Internasional',
    '2025-05-30': 'Hari Raya Waisak',
    '2025-06-01': 'Hari Lahir Pancasila',
    '2025-06-27': 'Idul Adha',
    '2025-07-17': 'Tahun Baru Islam 1447 H',
    '2025-08-17': 'Hari Kemerdekaan RI',
    '2025-09-26': 'Maulid Nabi Muhammad',
    '2025-12-25': 'Hari Natal'
};

const holidays = [
    { date: '1 Januari 2025', name: 'Tahun Baru 2025', type: 'national' },
    { date: '1 Februari 2025', name: 'Tahun Baru Imlek 2576', type: 'religious' },
    { date: '11 Maret 2025', name: 'Isra Miraj', type: 'religious' },
    { date: '31 Maret 2025', name: 'Hari Raya Nyepi', type: 'religious' },
    { date: '18 April 2025', name: 'Wafat Isa Almasih', type: 'religious' },
    { date: '20-21 April 2025', name: 'Hari Raya Idul Fitri', type: 'religious' },
    { date: '1 Mei 2025', name: 'Hari Buruh Internasional', type: 'national' },
    { date: '30 Mei 2025', name: 'Hari Raya Waisak', type: 'religious' },
    { date: '1 Juni 2025', name: 'Hari Lahir Pancasila', type: 'national' },
    { date: '27 Juni 2025', name: 'Idul Adha', type: 'religious' },
    { date: '17 Juli 2025', name: 'Tahun Baru Islam 1447 H', type: 'religious' },
    { date: '17 Agustus 2025', name: 'Hari Kemerdekaan RI', type: 'national' },
    { date: '26 September 2025', name: 'Maulid Nabi Muhammad', type: 'religious' },
    { date: '25 Desember 2025', name: 'Hari Natal', type: 'religious' }
];

const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

let currentMonth = new Date().getMonth();

// Fungsi untuk memperbarui jam digital
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('clock').textContent = timeString;

    const dateString = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('current-date').textContent = dateString;
}

// Fungsi untuk mengecek apakah tanggal adalah hari libur
function isHoliday(date) {
    const dateString = date.toISOString().split('T')[0];
    return holidayData[dateString];
}

// Fungsi untuk mengecek apakah tanggal adalah akhir pekan
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Fungsi untuk merender kalender
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    const year = 2025;
    const firstDay = new Date(year, currentMonth, 1);
    const lastDay = new Date(year, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    
    document.getElementById('month-year').textContent = `${months[currentMonth]} ${year}`;

    // Tambahkan sel kosong untuk hari-hari sebelum tanggal 1
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty-day';
        grid.appendChild(emptyDay);
    }

    // Tambahkan hari-hari dalam bulan
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, currentMonth, day);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day animate__animated animate__fadeIn';

        const dayContent = document.createElement('div');
        dayContent.className = 'day-content';

        // Tandai hari ini
        if (date.toDateString() === new Date().toDateString()) {
            dayDiv.classList.add('today');
        }

        // Tandai hari libur dan akhir pekan
        if (isHoliday(date) || isWeekend(date)) {
            dayDiv.classList.add('holiday');
        }

        // Tambahkan nomor hari
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayContent.appendChild(dayNumber);

        // Tambahkan nama hari libur jika ada
        const holidayName = isHoliday(date);
        if (holidayName) {
            const holiday = document.createElement('div');
            holiday.className = 'holiday-name';
            holiday.textContent = holidayName;
            dayContent.appendChild(holiday);
        }

        dayDiv.appendChild(dayContent);
        grid.appendChild(dayDiv);
    }
}

// Fungsi untuk membuat elemen hari libur
function createHolidayElement(holiday, index) {
    const delay = index * 0.1;
    return `
        <div class="holiday-item" style="animation-delay: ${delay}s">
            <div class="holiday-date">
                ${holiday.date}
                <span class="holiday-date-type ${holiday.type}">
                    ${holiday.type === 'national' ? 'Nasional' : 'Keagamaan'}
                </span>
            </div>
            <div class="holiday-name">${holiday.name}</div>
            <div class="holiday-type ${holiday.type}">
            </div>
        </div>
    `;
}

// Fungsi untuk merender daftar hari libur
function renderHolidays(filter = 'all') {
    const holidayList = document.getElementById('holiday-list');
    holidayList.innerHTML = '';
    
    const filteredHolidays = filter === 'all' 
        ? holidays 
        : holidays.filter(h => h.type === filter);

    filteredHolidays.forEach((holiday, index) => {
        holidayList.innerHTML += createHolidayElement(holiday, index);
    });
}

// Event listener untuk tombol navigasi
document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth > 0) {
        currentMonth--;
        renderCalendar();
    }
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth < 11) {
        currentMonth++;
        renderCalendar();
    }
});

// Event listener untuk tombol filter
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Hapus kelas active dari semua tombol
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Tambahkan kelas active ke tombol yang diklik
        e.target.classList.add('active');
        
        // Filter hari libur
        renderHolidays(e.target.dataset.filter);
    });
});

// Inisialisasi
setInterval(updateClock, 1000);
updateClock();
renderCalendar();
renderHolidays();