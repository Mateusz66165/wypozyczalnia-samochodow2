document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formularz został wysłany!');
    });

    // Inicjalizacja kalendarza
    flatpickr("#startDate", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: calculateDays
    });

    flatpickr("#endDate", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: calculateDays
    });

    window.openReservationForm = (car) => {
        document.getElementById('car').value = car;
        document.getElementById('reservation').style.display = 'block';
    };

    const calculateDays = () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = (end - start) / (1000 * 60 * 60 * 24) + 1; // Dodajemy 1, aby uwzględnić dzień rozpoczęcia

            document.getElementById('days').value = days;
            calculateCost(days);
        }
    };

    const calculateCost = (days) => {
        const dailyRate = 250; // Stawka za dzień w PLN netto
        const vatRate = 0.23; // VAT 23%
        let totalCostNet = days * dailyRate;

        if (days > 15) {
            totalCostNet -= dailyRate * 0.05 * (days - 15); // 5% rabatu na każdy dzień powyżej 15 dni
        }

        const totalCostGross = totalCostNet * (1 + vatRate);

        document.getElementById('totalCostNet').value = totalCostNet.toFixed(2);
        document.getElementById('totalCostGross').value = totalCostGross.toFixed(2);
    };
});