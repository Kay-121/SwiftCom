// Service Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const userSlider = document.getElementById('userSlider');
    const userCount = document.getElementById('userCount');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContent = document.getElementById('resultsContent');
    
    // Update user count display
    userSlider.addEventListener('input', function() {
        userCount.textContent = this.value;
    });
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', calculatePlan);
    
    function calculatePlan() {
        const businessType = document.querySelector('input[name="businessType"]:checked').value;
        const users = parseInt(userSlider.value);
        const speed = document.querySelector('input[name="speed"]:checked').value;
        const contract = document.querySelector('input[name="contract"]:checked').value;
        
        // Get additional services
        const services = {
            mobile: document.getElementById('mobile').checked,
            voip: document.getElementById('voip').checked,
            cloud: document.getElementById('cloud').checked,
            security: document.getElementById('security').checked
        };
        
        // Calculate base price
        let basePrice = 0;
        switch(speed) {
            case 'basic': basePrice = 29; break;
            case 'professional': basePrice = 79; break;
            case 'enterprise': basePrice = 199; break;
        }
        
        // Business type multiplier
        let businessMultiplier = 1;
        switch(businessType) {
            case 'residential': businessMultiplier = 1; break;
            case 'small-business': businessMultiplier = 1.2; break;
            case 'enterprise': businessMultiplier = 1.5; break;
        }
        
        // Calculate additional services cost
        let additionalCost = 0;
        if (services.mobile) additionalCost += 15 * users;
        if (services.voip) additionalCost += 25 * users;
        if (services.cloud) additionalCost += 10 * users;
        if (services.security) additionalCost += 20 * users;
        
        // Apply contract discount
        let discount = 0;
        switch(contract) {
            case 'monthly': discount = 0; break;
            case 'annual': discount = 0.1; break;
            case 'biennial': discount = 0.2; break;
        }
        
        // Calculate final price
        let monthlyPrice = (basePrice * businessMultiplier) + additionalCost;
        let discountAmount = monthlyPrice * discount;
        let finalPrice = monthlyPrice - discountAmount;
        
        // Generate recommendations
        const recommendations = generateRecommendations(businessType, users, speed, services);
        
        // Display results
        displayResults({
            businessType,
            users,
            speed,
            services,
            contract,
            basePrice,
            additionalCost,
            discountAmount,
            finalPrice,
            recommendations
        });
    }
    
    function generateRecommendations(businessType, users, speed, services) {
        const recommendations = [];
        
        // Speed recommendations
        if (users > 50 && speed === 'basic') {
            recommendations.push({
                type: 'warning',
                title: 'Speed Upgrade Recommended',
                message: 'With ' + users + ' users, we recommend upgrading to Professional speed for optimal performance.'
            });
        }
        
        if (users > 200 && speed !== 'enterprise') {
            recommendations.push({
                type: 'warning',
                title: 'Enterprise Speed Recommended',
                message: 'For ' + users + ' users, Enterprise speed will ensure everyone has fast, reliable connectivity.'
            });
        }
        
        // Service recommendations
        if (businessType === 'enterprise' && !services.voip) {
            recommendations.push({
                type: 'suggestion',
                title: 'Add VoIP Phone System',
                message: 'Enterprise businesses benefit from our integrated VoIP solution for professional communication.'
            });
        }
        
        if (users > 10 && !services.security) {
            recommendations.push({
                type: 'suggestion',
                title: 'Add Security Suite',
                message: 'With ' + users + ' users, our Security Suite will protect your business from cyber threats.'
            });
        }
        
        if (businessType === 'small-business' && !services.cloud) {
            recommendations.push({
                type: 'suggestion',
                title: 'Add Cloud Storage',
                message: 'Cloud storage is essential for small businesses to backup and share files securely.'
            });
        }
        
        // Positive recommendations
        if (services.mobile && services.voip && services.cloud && services.security) {
            recommendations.push({
                type: 'success',
                title: 'Complete Package Selected',
                message: 'Great choice! You have selected our comprehensive business solution.'
            });
        }
        
        if (contract === 'biennial') {
            recommendations.push({
                type: 'success',
                title: 'Great Savings!',
                message: 'You\'re saving 20% with a 2-year commitment. That\'s smart business planning!'
            });
        }
        
        return recommendations;
    }
    
    function displayResults(data) {
        const speedInfo = {
            basic: { name: 'Basic', speed: 'Up to 100 Mbps', icon: '🐢' },
            professional: { name: 'Professional', speed: 'Up to 1 Gbps', icon: '🚀' },
            enterprise: { name: 'Enterprise', speed: 'Up to 10 Gbps', icon: '⚡' }
        };
        
        const contractInfo = {
            monthly: { name: 'Monthly', discount: 0 },
            annual: { name: 'Annual', discount: '10%' },
            biennial: { name: '2-Year', discount: '20%' }
        };
        
        let html = `
            <div class="results-header">
                <div class="plan-summary">
                    <div class="plan-icon">${speedInfo[data.speed].icon}</div>
                    <div class="plan-details">
                        <h3>${speedInfo[data.speed].name} Plan</h3>
                        <p>${speedInfo[data.speed].speed}</p>
                        <span class="business-type">${data.businessType.replace('-', ' ').toUpperCase()}</span>
                    </div>
                </div>
                <div class="price-display">
                    <div class="final-price">$${data.finalPrice.toFixed(2)}</div>
                    <div class="price-period">per month</div>
                    ${data.discountAmount > 0 ? `<div class="savings">Save $${data.discountAmount.toFixed(2)}/mo</div>` : ''}
                </div>
            </div>
            
            <div class="pricing-breakdown">
                <h4>Pricing Breakdown</h4>
                <div class="breakdown-item">
                    <span>Base Plan (${speedInfo[data.speed].name})</span>
                    <span>$${data.basePrice.toFixed(2)}</span>
                </div>
                ${data.businessType !== 'residential' ? `
                <div class="breakdown-item">
                    <span>Business Multiplier (${data.businessType})</span>
                    <span>x${(1 + (data.businessType === 'small-business' ? 0.2 : 0.5))}</span>
                </div>` : ''}
                ${data.additionalCost > 0 ? `
                <div class="breakdown-item">
                    <span>Additional Services</span>
                    <span>$${data.additionalCost.toFixed(2)}</span>
                </div>` : ''}
                ${data.discountAmount > 0 ? `
                <div class="breakdown-item discount">
                    <span>${contractInfo[data.contract].name} Discount</span>
                    <span>-$${data.discountAmount.toFixed(2)}</span>
                </div>` : ''}
                <div class="breakdown-item total">
                    <span>Total</span>
                    <span>$${data.finalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="services-summary">
                <h4>Included Services</h4>
                <div class="services-list">
                    <div class="service-item included">
                        <span class="service-icon">✓</span>
                        <span>High-Speed Internet (${speedInfo[data.speed].speed})</span>
                    </div>
                    ${data.services.mobile ? `
                    <div class="service-item included">
                        <span class="service-icon">✓</span>
                        <span>Mobile Services (${data.users} users)</span>
                    </div>` : ''}
                    ${data.services.voip ? `
                    <div class="service-item included">
                        <span class="service-icon">✓</span>
                        <span>VoIP Phone System (${data.users} users)</span>
                    </div>` : ''}
                    ${data.services.cloud ? `
                    <div class="service-item included">
                        <span class="service-icon">✓</span>
                        <span>Cloud Storage (${data.users} users)</span>
                    </div>` : ''}
                    ${data.services.security ? `
                    <div class="service-item included">
                        <span class="service-icon">✓</span>
                        <span>Security Suite (${data.users} users)</span>
                    </div>` : ''}
                </div>
            </div>
            
            ${data.recommendations.length > 0 ? `
            <div class="recommendations">
                <h4>Recommendations</h4>
                <div class="recommendations-list">
                    ${data.recommendations.map(rec => `
                        <div class="recommendation-item ${rec.type}">
                            <div class="recommendation-icon">
                                ${rec.type === 'success' ? '✅' : rec.type === 'warning' ? '⚠️' : '💡'}
                            </div>
                            <div class="recommendation-content">
                                <h5>${rec.title}</h5>
                                <p>${rec.message}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="window.location.href='contact.html'">Contact Sales</button>
                <button class="btn btn-secondary" onclick="window.print()">Print Quote</button>
            </div>
        `;
        
        resultsContent.innerHTML = html;
        
        // Add animation to results
        resultsContent.style.opacity = '0';
        resultsContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultsContent.style.transition = 'all 0.5s ease';
            resultsContent.style.opacity = '1';
            resultsContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Auto-calculate on form changes
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            if (resultsContent.querySelector('.results-header')) {
                calculatePlan();
            }
        });
    });
});
