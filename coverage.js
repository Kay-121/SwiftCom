// Network Coverage Map JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    let map = L.map('coverageMap').setView([39.8283, -98.5795], 4); // Center of USA
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Coverage data (simulated)
    const coverageData = {
        '5g': [
            { lat: 40.7128, lng: -74.0060, city: 'New York', coverage: 'excellent' },
            { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', coverage: 'excellent' },
            { lat: 41.8781, lng: -87.6298, city: 'Chicago', coverage: 'excellent' },
            { lat: 29.7604, lng: -95.3698, city: 'Houston', coverage: 'good' },
            { lat: 25.7617, lng: -80.1918, city: 'Miami', coverage: 'excellent' },
            { lat: 47.6062, lng: -122.3321, city: 'Seattle', coverage: 'excellent' },
            { lat: 42.3601, lng: -71.0589, city: 'Boston', coverage: 'good' },
            { lat: 39.9526, lng: -75.1652, city: 'Philadelphia', coverage: 'good' },
            { lat: 33.4484, lng: -112.0740, city: 'Phoenix', coverage: 'limited' },
            { lat: 32.7157, lng: -117.1611, city: 'San Diego', coverage: 'excellent' }
        ],
        fiber: [
            { lat: 40.7128, lng: -74.0060, city: 'New York', coverage: 'excellent' },
            { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', coverage: 'excellent' },
            { lat: 41.8781, lng: -87.6298, city: 'Chicago', coverage: 'excellent' },
            { lat: 29.7604, lng: -95.3698, city: 'Houston', coverage: 'good' },
            { lat: 25.7617, lng: -80.1918, city: 'Miami', coverage: 'good' },
            { lat: 47.6062, lng: -122.3321, city: 'Seattle', coverage: 'excellent' },
            { lat: 42.3601, lng: -71.0589, city: 'Boston', coverage: 'excellent' },
            { lat: 39.9526, lng: -75.1652, city: 'Philadelphia', coverage: 'excellent' },
            { lat: 33.4484, lng: -112.0740, city: 'Phoenix', coverage: 'limited' },
            { lat: 32.7157, lng: -117.1611, city: 'San Diego', coverage: 'good' }
        ],
        '4g': [
            { lat: 40.7128, lng: -74.0060, city: 'New York', coverage: 'excellent' },
            { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', coverage: 'excellent' },
            { lat: 41.8781, lng: -87.6298, city: 'Chicago', coverage: 'excellent' },
            { lat: 29.7604, lng: -95.3698, city: 'Houston', coverage: 'excellent' },
            { lat: 25.7617, lng: -80.1918, city: 'Miami', coverage: 'excellent' },
            { lat: 47.6062, lng: -122.3321, city: 'Seattle', coverage: 'excellent' },
            { lat: 42.3601, lng: -71.0589, city: 'Boston', coverage: 'excellent' },
            { lat: 39.9526, lng: -75.1652, city: 'Philadelphia', coverage: 'excellent' },
            { lat: 33.4484, lng: -112.0740, city: 'Phoenix', coverage: 'good' },
            { lat: 32.7157, lng: -117.1611, city: 'San Diego', coverage: 'excellent' }
        ],
        voip: [
            { lat: 40.7128, lng: -74.0060, city: 'New York', coverage: 'excellent' },
            { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', coverage: 'excellent' },
            { lat: 41.8781, lng: -87.6298, city: 'Chicago', coverage: 'excellent' },
            { lat: 29.7604, lng: -95.3698, city: 'Houston', coverage: 'good' },
            { lat: 25.7617, lng: -80.1918, city: 'Miami', coverage: 'excellent' },
            { lat: 47.6062, lng: -122.3321, city: 'Seattle', coverage: 'excellent' },
            { lat: 42.3601, lng: -71.0589, city: 'Boston', coverage: 'excellent' },
            { lat: 39.9526, lng: -75.1652, city: 'Philadelphia', coverage: 'excellent' },
            { lat: 33.4484, lng: -112.0740, city: 'Phoenix', coverage: 'good' },
            { lat: 32.7157, lng: -117.1611, city: 'San Diego', coverage: 'excellent' }
        ]
    };

    // Quick location data
    const quickLocations = {
        'new-york': { lat: 40.7128, lng: -74.0060, zoom: 10 },
        'los-angeles': { lat: 34.0522, lng: -118.2437, zoom: 10 },
        'chicago': { lat: 41.8781, lng: -87.6298, zoom: 10 },
        'houston': { lat: 29.7604, lng: -95.3698, zoom: 10 },
        'miami': { lat: 25.7617, lng: -80.1918, zoom: 10 },
        'seattle': { lat: 47.6062, lng: -122.3321, zoom: 10 }
    };

    let currentService = '5g';
    let markers = [];

    // Coverage colors
    const coverageColors = {
        excellent: '#10b981',
        good: '#f59e0b',
        limited: '#ef4444',
        none: '#6b7280'
    };

    // Function to get coverage icon
    function getCoverageIcon(coverage) {
        const color = coverageColors[coverage];
        return L.divIcon({
            html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            className: 'coverage-marker'
        });
    }

    // Function to display coverage for a service
    function displayCoverage(service) {
        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Add new markers
        const data = coverageData[service];
        data.forEach(location => {
            const marker = L.marker([location.lat, location.lng], {
                icon: getCoverageIcon(location.coverage)
            }).addTo(map);

            marker.bindPopup(`
                <div class="popup-content">
                    <h4>${location.city}</h4>
                    <p><strong>Coverage:</strong> ${location.coverage.charAt(0).toUpperCase() + location.coverage.slice(1)}</p>
                    <p><strong>Service:</strong> ${service.toUpperCase()}</p>
                </div>
            `);

            markers.push(marker);
        });
    }

    // Service toggle functionality
    const serviceBtns = document.querySelectorAll('.service-btn');
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            serviceBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentService = this.dataset.service;
            displayCoverage(currentService);
        });
    });

    // Quick location buttons
    const locationBtns = document.querySelectorAll('.location-btn');
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const location = quickLocations[this.dataset.location];
            map.setView([location.lat, location.lng], location.zoom);
        });
    });

    // Location search functionality
    const searchBtn = document.getElementById('searchBtn');
    const locationSearch = document.getElementById('locationSearch');

    searchBtn.addEventListener('click', performSearch);
    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = locationSearch.value.trim();
        if (!query) return;

        // Use Nominatim API for geocoding
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const result = data[0];
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);
                    map.setView([lat, lng], 12);
                    
                    // Add a temporary marker for the searched location
                    const searchMarker = L.marker([lat, lng], {
                        icon: L.divIcon({
                            html: '<div style="background: #8b5cf6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                            iconSize: [12, 12],
                            className: 'search-marker'
                        })
                    }).addTo(map);

                    searchMarker.bindPopup(`<strong>${result.display_name}</strong>`).openPopup();
                }
            })
            .catch(error => {
                console.error('Search error:', error);
            });
    }

    // Coverage checker functionality
    const checkCoverageBtn = document.getElementById('checkCoverageBtn');
    const coverageResult = document.getElementById('coverageResult');

    checkCoverageBtn.addEventListener('click', function() {
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;

        if (!city && !zip) {
            alert('Please enter at least a city or ZIP code');
            return;
        }

        // Simulate coverage check
        const query = [address, city, state, zip].filter(Boolean).join(', ');
        performCoverageCheck(query);
    });

    function performCoverageCheck(query) {
        // Show loading state
        coverageResult.innerHTML = '<div class="loading">Checking coverage...</div>';
        coverageResult.style.display = 'block';

        // Simulate API call
        setTimeout(() => {
            const randomCoverage = Math.random() > 0.2 ? 'excellent' : (Math.random() > 0.5 ? 'good' : 'limited');
            const services = ['5G', 'Fiber', '4G LTE', 'VoIP'];
            const availableServices = services.filter(() => Math.random() > 0.3);

            coverageResult.innerHTML = `
                <div class="coverage-result-content">
                    <h3>Coverage Results for ${query}</h3>
                    <div class="result-status ${randomCoverage}">
                        <div class="status-icon">${randomCoverage === 'excellent' ? '✅' : randomCoverage === 'good' ? '👍' : '⚠️'}</div>
                        <div class="status-text">
                            <h4>${randomCoverage.charAt(0).toUpperCase() + randomCoverage.slice(1)} Coverage</h4>
                            <p>${getCoverageMessage(randomCoverage)}</p>
                        </div>
                    </div>
                    <div class="available-services">
                        <h4>Available Services</h4>
                        <div class="services-list">
                            ${availableServices.map(service => `
                                <div class="service-item">
                                    <span class="service-name">${service}</span>
                                    <span class="service-status">Available</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="next-steps">
                        <h4>Next Steps</h4>
                        <p>Great news! You're eligible for our services. Contact our sales team to get started.</p>
                        <a href="contact.html" class="btn btn-primary">Contact Sales</a>
                    </div>
                </div>
            `;
        }, 1500);
    }

    function getCoverageMessage(coverage) {
        const messages = {
            excellent: 'You have access to our fastest speeds and most reliable service.',
            good: 'You can enjoy high-speed internet with reliable performance.',
            limited: 'Service is available with some limitations. Contact us for details.'
        };
        return messages[coverage] || 'Coverage information not available.';
    }

    // Initialize with 5G coverage
    displayCoverage('5g');
});

// Add navigation link update
document.addEventListener('DOMContentLoaded', function() {
    // Update navigation links to include coverage
    const navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(menu => {
        if (!menu.querySelector('a[href="coverage.html"]')) {
            const contactLink = menu.querySelector('a[href="contact.html"]');
            if (contactLink) {
                const coverageLink = document.createElement('li');
                coverageLink.innerHTML = '<a href="coverage.html" class="nav-link">Coverage</a>';
                menu.insertBefore(coverageLink, contactLink.parentElement);
            }
        }
    });
});
