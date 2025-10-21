/**
 * ═══════════════════════════════════════════════════════════════════
 * TERRA COTTA FOODS - GLOBAL MARKET ANALYTICS DASHBOARD
 * Hierarchical Market Analysis for Global Expansion
 * Version 2.2.0 - Updated without Europe
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. GLOBAL DATA - EMBEDDED (Works without server)
// ═══════════════════════════════════════════════════════════════════

const marketData = {
  "regions": [
    {
      "name": "Asia Pacific",
      "countries": [
        { "name": "China", "population": 1408975000, "gdpPerCapita": 13303.15, "gdpTotal": 18747.54, "code": "CHN" },
        { "name": "Japan", "population": 123975371, "gdpPerCapita": 32475.89, "gdpTotal": 4026.28, "code": "JPN" },
        { "name": "India", "population": 1450935791, "gdpPerCapita": 2696.66, "gdpTotal": 3912.95, "code": "IND" },
        { "name": "Indonesia", "population": 283487931, "gdpPerCapita": 4925.43, "gdpTotal": 1395.97, "code": "IDN" },
        { "name": "Australia", "population": 27204809, "gdpPerCapita": 64407.48, "gdpTotal": 1752.05, "code": "AUS" },
        { "name": "Thailand", "population": 71668011, "gdpPerCapita": 7345.14, "gdpTotal": 526.39, "code": "THA" },
        { "name": "Singapore", "population": 6036860, "gdpPerCapita": 90674.07, "gdpTotal": 547.35, "code": "SGP" },
        { "name": "Malaysia", "population": 35557673, "gdpPerCapita": 11867.26, "gdpTotal": 421.97, "code": "MYS" },
        { "name": "Philippines", "population": 115843670, "gdpPerCapita": 3984.83, "gdpTotal": 461.60, "code": "PHL" },
        { "name": "Vietnam", "population": 100987686, "gdpPerCapita": 4717.29, "gdpTotal": 476.38, "code": "VNM" },
        { "name": "Bangladesh", "population": 173562364, "gdpPerCapita": 2593.42, "gdpTotal": 450.04, "code": "BGD" },
        { "name": "Pakistan", "population": 251269164, "gdpPerCapita": 1484.75, "gdpTotal": 373.05, "code": "PAK" },
        { "name": "New Zealand", "population": 5338500, "gdpPerCapita": 48747.01, "gdpTotal": 260.18, "code": "NZL" },
        { "name": "Kazakhstan", "population": 20592571, "gdpPerCapita": 14005.35, "gdpTotal": 288.42, "code": "KAZ" },
        { "name": "Myanmar", "population": 54500091, "gdpPerCapita": 1359.26, "gdpTotal": 74.07, "code": "MMR" },
        { "name": "Cambodia", "population": 17638801, "gdpPerCapita": 2627.88, "gdpTotal": 46.35, "code": "KHM" },
        { "name": "Sri Lanka", "population": 21916000, "gdpPerCapita": 4515.57, "gdpTotal": 98.95, "code": "LKA" },
        { "name": "Nepal", "population": 29651054, "gdpPerCapita": 1447.31, "gdpTotal": 42.91, "code": "NPL" },
        { "name": "Mongolia", "population": 3524788, "gdpPerCapita": 6691.48, "gdpTotal": 23.59, "code": "MNG" },
        { "name": "Uzbekistan", "population": 36361859, "gdpPerCapita": 3161.70, "gdpTotal": 114.94, "code": "UZB" },
        { "name": "Laos", "population": 7769819, "gdpPerCapita": 2123.98, "gdpTotal": 16.50, "code": "LAO" },
        { "name": "Papua New Guinea", "population": 10576502, "gdpPerCapita": 3076.49, "gdpTotal": 32.54, "code": "PNG" },
        { "name": "Kyrgyzstan", "population": 7224614, "gdpPerCapita": 2419.27, "gdpTotal": 17.48, "code": "KGZ" },
        { "name": "Tajikistan", "population": 10590927, "gdpPerCapita": 1341.20, "gdpTotal": 14.21, "code": "TJK" },
        { "name": "Turkmenistan", "population": 7494498, "gdpPerCapita": 8571.61, "gdpTotal": 64.23, "code": "TKM" },
        { "name": "Fiji", "population": 928784, "gdpPerCapita": 6288.40, "gdpTotal": 5.84, "code": "FJI" },
        { "name": "Timor-Leste", "population": 1400638, "gdpPerCapita": 1343.15, "gdpTotal": 1.88, "code": "TLS" },
        { "name": "Solomon Islands", "population": 819198, "gdpPerCapita": 2149.38, "gdpTotal": 1.76, "code": "SLB" },
        { "name": "Vanuatu", "population": 327777, "gdpPerCapita": 3542.81, "gdpTotal": 1.16, "code": "VUT" },
        { "name": "Samoa", "population": 218019, "gdpPerCapita": 4898.77, "gdpTotal": 1.07, "code": "WSM" },
        { "name": "Micronesia", "population": 113160, "gdpPerCapita": 4166.00, "gdpTotal": 0.47, "code": "FSM" },
        { "name": "Kiribati", "population": 134518, "gdpPerCapita": 2288.63, "gdpTotal": 0.31, "code": "KIR" },
        { "name": "Marshall Islands", "population": 37548, "gdpPerCapita": 7466.65, "gdpTotal": 0.28, "code": "MHL" },
        { "name": "Nauru", "population": 11947, "gdpPerCapita": 13421.83, "gdpTotal": 0.16, "code": "NRU" },
        { "name": "Tuvalu", "population": 9646, "gdpPerCapita": 5000.00, "gdpTotal": 0.05, "code": "TUV" },
        { "name": "Palau", "population": 17695, "gdpPerCapita": 18000.00, "gdpTotal": 0.32, "code": "PLW" },
        { "name": "Tonga", "population": 104175, "gdpPerCapita": 6500.00, "gdpTotal": 0.68, "code": "TON" }
      ]
    },
    {
      "name": "North America",
      "countries": [
        { "name": "United States", "population": 340110988, "gdpPerCapita": 85809.90, "gdpTotal": 29183.32, "code": "USA" },
        { "name": "Canada", "population": 41288599, "gdpPerCapita": 54282.62, "gdpTotal": 2241.18, "code": "CAN" },
        { "name": "Mexico", "population": 130861007, "gdpPerCapita": 14157.94, "gdpTotal": 1852.73, "code": "MEX" }
      ]
    },
    {
      "name": "Latin America",
      "countries": [
        { "name": "Brazil", "population": 211998573, "gdpPerCapita": 10280.31, "gdpTotal": 2179.64, "code": "BRA" },
        { "name": "Argentina", "population": 45696159, "gdpPerCapita": 13858.20, "gdpTotal": 633.17, "code": "ARG" },
        { "name": "Colombia", "population": 52886363, "gdpPerCapita": 7913.99, "gdpTotal": 418.57, "code": "COL" },
        { "name": "Chile", "population": 19764771, "gdpPerCapita": 16709.89, "gdpTotal": 330.26, "code": "CHL" },
        { "name": "Peru", "population": 34217848, "gdpPerCapita": 8452.37, "gdpTotal": 289.20, "code": "PER" },
        { "name": "Ecuador", "population": 18135478, "gdpPerCapita": 6874.71, "gdpTotal": 124.66, "code": "ECU" },
        { "name": "Guatemala", "population": 18406359, "gdpPerCapita": 6150.03, "gdpTotal": 113.20, "code": "GTM" },
        { "name": "Dominican Republic", "population": 11427557, "gdpPerCapita": 10875.66, "gdpTotal": 124.27, "code": "DOM" },
        { "name": "Costa Rica", "population": 5129910, "gdpPerCapita": 18587.15, "gdpTotal": 95.35, "code": "CRI" },
        { "name": "Panama", "population": 4515577, "gdpPerCapita": 19102.85, "gdpTotal": 86.27, "code": "PAN" },
        { "name": "Uruguay", "population": 3386588, "gdpPerCapita": 23906.51, "gdpTotal": 80.98, "code": "URY" },
        { "name": "Bolivia", "population": 12413315, "gdpPerCapita": 4001.21, "gdpTotal": 49.67, "code": "BOL" },
        { "name": "Paraguay", "population": 6929153, "gdpPerCapita": 6416.10, "gdpTotal": 44.46, "code": "PRY" },
        { "name": "Honduras", "population": 10825703, "gdpPerCapita": 3426.43, "gdpTotal": 37.09, "code": "HND" },
        { "name": "El Salvador", "population": 6338193, "gdpPerCapita": 5579.66, "gdpTotal": 35.36, "code": "SLV" },
        { "name": "Nicaragua", "population": 6916140, "gdpPerCapita": 2847.54, "gdpTotal": 19.69, "code": "NIC" },
        { "name": "Haiti", "population": 11772557, "gdpPerCapita": 2142.62, "gdpTotal": 25.23, "code": "HTI" },
        { "name": "Jamaica", "population": 2839175, "gdpPerCapita": 7019.75, "gdpTotal": 19.93, "code": "JAM" },
        { "name": "Trinidad and Tobago", "population": 1368333, "gdpPerCapita": 19314.72, "gdpTotal": 26.43, "code": "TTO" },
        { "name": "Guyana", "population": 831087, "gdpPerCapita": 29883.63, "gdpTotal": 24.83, "code": "GUY" },
        { "name": "Belize", "population": 417072, "gdpPerCapita": 8429.68, "gdpTotal": 3.52, "code": "BLZ" },
        { "name": "Suriname", "population": 634431, "gdpPerCapita": 7430.70, "gdpTotal": 4.71, "code": "SUR" },
        { "name": "Bahamas", "population": 401283, "gdpPerCapita": 39455.45, "gdpTotal": 15.83, "code": "BHS" },
        { "name": "Barbados", "population": 282467, "gdpPerCapita": 25365.79, "gdpTotal": 7.16, "code": "BRB" },
        { "name": "St. Lucia", "population": 179744, "gdpPerCapita": 14181.63, "gdpTotal": 2.55, "code": "LCA" },
        { "name": "Grenada", "population": 117207, "gdpPerCapita": 11871.61, "gdpTotal": 1.39, "code": "GRD" },
        { "name": "St. Vincent and the Grenadines", "population": 100616, "gdpPerCapita": 11501.23, "gdpTotal": 1.16, "code": "VCT" },
        { "name": "Antigua and Barbuda", "population": 93772, "gdpPerCapita": 23725.79, "gdpTotal": 2.23, "code": "ATG" },
        { "name": "Dominica", "population": 66205, "gdpPerCapita": 10405.28, "gdpTotal": 0.69, "code": "DMA" },
        { "name": "St. Kitts and Nevis", "population": 46843, "gdpPerCapita": 22771.42, "gdpTotal": 1.07, "code": "KNA" }
      ]
    },
    {
      "name": "Middle East & Africa",
      "countries": [
        { "name": "Saudi Arabia", "population": 35300280, "gdpPerCapita": 35057.23, "gdpTotal": 1237.52, "code": "SAU" },
        { "name": "United Arab Emirates", "population": 10876981, "gdpPerCapita": 49377.56, "gdpTotal": 537.03, "code": "ARE" },
        { "name": "Israel", "population": 9974400, "gdpPerCapita": 54176.68, "gdpTotal": 540.33, "code": "ISR" },
        { "name": "South Africa", "population": 64007187, "gdpPerCapita": 6253.37, "gdpTotal": 400.24, "code": "ZAF" },
        { "name": "Egypt", "population": 116538258, "gdpPerCapita": 3338.47, "gdpTotal": 389.04, "code": "EGY" },
        { "name": "Nigeria", "population": 232679478, "gdpPerCapita": 806.95, "gdpTotal": 187.79, "code": "NGA" },
        { "name": "Iran", "population": 91567738, "gdpPerCapita": 4771.40, "gdpTotal": 436.93, "code": "IRN" },
        { "name": "Iraq", "population": 46042015, "gdpPerCapita": 6073.61, "gdpTotal": 279.61, "code": "IRQ" },
        { "name": "Algeria", "population": 46814308, "gdpPerCapita": 5631.18, "gdpTotal": 263.57, "code": "DZA" },
        { "name": "Qatar", "population": 2857822, "gdpPerCapita": 76275.91, "gdpTotal": 218.00, "code": "QAT" },
        { "name": "Kuwait", "population": 4973861, "gdpPerCapita": 32213.86, "gdpTotal": 160.23, "code": "KWT" },
        { "name": "Morocco", "population": 38081173, "gdpPerCapita": 3993.39, "gdpTotal": 152.07, "code": "MAR" },
        { "name": "Kenya", "population": 56432944, "gdpPerCapita": 2206.13, "gdpTotal": 124.50, "code": "KEN" },
        { "name": "Ethiopia", "population": 132059767, "gdpPerCapita": 1200.00, "gdpTotal": 158.47, "code": "ETH" },
        { "name": "Angola", "population": 37885849, "gdpPerCapita": 2122.08, "gdpTotal": 80.40, "code": "AGO" },
        { "name": "Tanzania", "population": 68560157, "gdpPerCapita": 1185.75, "gdpTotal": 81.29, "code": "TZA" },
        { "name": "Oman", "population": 5281538, "gdpPerCapita": 20248.42, "gdpTotal": 106.95, "code": "OMN" },
        { "name": "Ghana", "population": 34427414, "gdpPerCapita": 2405.79, "gdpTotal": 82.81, "code": "GHA" },
        { "name": "Cote d'Ivoire", "population": 31934230, "gdpPerCapita": 2709.90, "gdpTotal": 86.54, "code": "CIV" },
        { "name": "Cameroon", "population": 29123744, "gdpPerCapita": 1762.37, "gdpTotal": 51.32, "code": "CMR" },
        { "name": "Uganda", "population": 50015092, "gdpPerCapita": 1072.71, "gdpTotal": 53.66, "code": "UGA" },
        { "name": "Libya", "population": 7381023, "gdpPerCapita": 6318.40, "gdpTotal": 46.63, "code": "LBY" },
        { "name": "Jordan", "population": 11552876, "gdpPerCapita": 4618.10, "gdpTotal": 53.36, "code": "JOR" },
        { "name": "Tunisia", "population": 12277109, "gdpPerCapita": 4350.37, "gdpTotal": 53.41, "code": "TUN" },
        { "name": "Bahrain", "population": 1588670, "gdpPerCapita": 30048.22, "gdpTotal": 47.73, "code": "BHR" },
        { "name": "Zambia", "population": 21314956, "gdpPerCapita": 1235.08, "gdpTotal": 26.32, "code": "ZMB" },
        { "name": "Senegal", "population": 18501984, "gdpPerCapita": 1743.99, "gdpTotal": 32.27, "code": "SEN" },
        { "name": "Zimbabwe", "population": 16634373, "gdpPerCapita": 2656.41, "gdpTotal": 44.18, "code": "ZWE" },
        { "name": "Guinea", "population": 14754785, "gdpPerCapita": 1717.02, "gdpTotal": 25.33, "code": "GIN" },
        { "name": "Rwanda", "population": 14256567, "gdpPerCapita": 999.65, "gdpTotal": 14.25, "code": "RWA" },
        { "name": "Benin", "population": 14462724, "gdpPerCapita": 1485.38, "gdpTotal": 21.48, "code": "BEN" },
        { "name": "Burundi", "population": 14047786, "gdpPerCapita": 153.93, "gdpTotal": 2.16, "code": "BDI" },
        { "name": "South Sudan", "population": 11943408, "gdpPerCapita": 500.00, "gdpTotal": 5.97, "code": "SSD" },
        { "name": "Somalia", "population": 19009151, "gdpPerCapita": 636.98, "gdpTotal": 12.11, "code": "SOM" },
        { "name": "Mali", "population": 24478595, "gdpPerCapita": 1086.18, "gdpTotal": 26.58, "code": "MLI" },
        { "name": "Malawi", "population": 21655286, "gdpPerCapita": 508.37, "gdpTotal": 11.01, "code": "MWI" },
        { "name": "Burkina Faso", "population": 23548781, "gdpPerCapita": 987.32, "gdpTotal": 23.25, "code": "BFA" },
        { "name": "Niger", "population": 27032412, "gdpPerCapita": 722.75, "gdpTotal": 19.54, "code": "NER" },
        { "name": "Chad", "population": 20299123, "gdpPerCapita": 1016.09, "gdpTotal": 20.63, "code": "TCD" },
        { "name": "Sudan", "population": 50448963, "gdpPerCapita": 989.31, "gdpTotal": 49.91, "code": "SDN" },
        { "name": "Congo (Dem. Rep.)", "population": 109276265, "gdpPerCapita": 647.44, "gdpTotal": 70.76, "code": "COD" },
        { "name": "Mozambique", "population": 34631766, "gdpPerCapita": 647.29, "gdpTotal": 22.42, "code": "MOZ" },
        { "name": "Madagascar", "population": 31964956, "gdpPerCapita": 545.00, "gdpTotal": 17.42, "code": "MDG" },
        { "name": "Mauritius", "population": 1259509, "gdpPerCapita": 11871.73, "gdpTotal": 14.95, "code": "MUS" },
        { "name": "Namibia", "population": 3030131, "gdpPerCapita": 4413.13, "gdpTotal": 13.37, "code": "NAM" },
        { "name": "Botswana", "population": 2521139, "gdpPerCapita": 7695.24, "gdpTotal": 19.40, "code": "BWA" },
        { "name": "Gabon", "population": 2538952, "gdpPerCapita": 8218.76, "gdpTotal": 20.87, "code": "GAB" },
        { "name": "Mauritania", "population": 5169395, "gdpPerCapita": 2082.78, "gdpTotal": 10.76, "code": "MRT" },
        { "name": "Eswatini", "population": 1242822, "gdpPerCapita": 3936.11, "gdpTotal": 4.89, "code": "SWZ" },
        { "name": "Lesotho", "population": 2337423, "gdpPerCapita": 971.81, "gdpTotal": 2.27, "code": "LSO" },
        { "name": "Djibouti", "population": 1168722, "gdpPerCapita": 3496.47, "gdpTotal": 4.09, "code": "DJI" },
        { "name": "Equatorial Guinea", "population": 1892516, "gdpPerCapita": 6745.40, "gdpTotal": 12.76, "code": "GNQ" },
        { "name": "Congo (Rep.)", "population": 6332961, "gdpPerCapita": 2482.25, "gdpTotal": 15.72, "code": "COG" },
        { "name": "Central African Republic", "population": 5330690, "gdpPerCapita": 516.17, "gdpTotal": 2.75, "code": "CAF" },
        { "name": "Liberia", "population": 5612817, "gdpPerCapita": 846.28, "gdpTotal": 4.75, "code": "LBR" },
        { "name": "Sierra Leone", "population": 8642022, "gdpPerCapita": 873.39, "gdpTotal": 7.55, "code": "SLE" },
        { "name": "Togo", "population": 9515236, "gdpPerCapita": 1043.14, "gdpTotal": 9.92, "code": "TGO" },
        { "name": "Guinea-Bissau", "population": 2201352, "gdpPerCapita": 962.98, "gdpTotal": 2.12, "code": "GNB" },
        { "name": "Gambia", "population": 2759988, "gdpPerCapita": 908.53, "gdpTotal": 2.51, "code": "GMB" },
        { "name": "Comoros", "population": 866628, "gdpPerCapita": 1784.12, "gdpTotal": 1.55, "code": "COM" },
        { "name": "Cape Verde", "population": 524877, "gdpPerCapita": 5272.85, "gdpTotal": 2.77, "code": "CPV" },
        { "name": "Sao Tome and Principe", "population": 235536, "gdpPerCapita": 3244.83, "gdpTotal": 0.76, "code": "STP" },
        { "name": "Seychelles", "population": 121354, "gdpPerCapita": 17858.82, "gdpTotal": 2.17, "code": "SYC" },
        { "name": "Maldives", "population": 527799, "gdpPerCapita": 13215.54, "gdpTotal": 6.97, "code": "MDV" },
        { "name": "Brunei", "population": 462721, "gdpPerCapita": 33417.84, "gdpTotal": 15.46, "code": "BRN" },
        { "name": "Yemen", "population": 40583164, "gdpPerCapita": 800.00, "gdpTotal": 32.47, "code": "YEM" },
        { "name": "Syria", "population": 24672760, "gdpPerCapita": 1200.00, "gdpTotal": 29.61, "code": "SYR" },
        { "name": "Lebanon", "population": 5805962, "gdpPerCapita": 3500.00, "gdpTotal": 20.32, "code": "LBN" },
        { "name": "Afghanistan", "population": 42647492, "gdpPerCapita": 500.00, "gdpTotal": 21.32, "code": "AFG" },
        { "name": "Cuba", "population": 10979783, "gdpPerCapita": 9500.00, "gdpTotal": 104.31, "code": "CUB" },
        { "name": "Venezuela", "population": 28405543, "gdpPerCapita": 3500.00, "gdpTotal": 99.42, "code": "VEN" },
        { "name": "North Korea", "population": 26498823, "gdpPerCapita": 1300.00, "gdpTotal": 34.45, "code": "PRK" },
        { "name": "Eritrea", "population": 3535603, "gdpPerCapita": 600.00, "gdpTotal": 2.12, "code": "ERI" },
        { "name": "Bhutan", "population": 791524, "gdpPerCapita": 3500.00, "gdpTotal": 2.77, "code": "BTN" }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════
// 2. COLOR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const regionColors = {
    'Asia Pacific': '#10b981',
    'North America': '#667eea',
    'Latin America': '#ec4899',
    'Middle East & Africa': '#8b5cf6'
};

const plotlyConfig = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'pan2d', 'autoScale2d'],
    displaylogo: false,
    toImageButtonOptions: {
        format: 'png',
        filename: 'tcf_market_analysis',
        height: 1080,
        width: 1920,
        scale: 2
    }
};

const plotlyLayout = {
    font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        size: 12,
        color: '#1e293b'
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#f8fafc',
    margin: { t: 60, r: 40, b: 80, l: 80 },
    hovermode: 'closest'
};

// ═══════════════════════════════════════════════════════════════════
// 3. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Terra Cotta Foods Dashboard initializing...');
    
    try {
        updateKPICards();
        updateMarketOverview();
        setupResponsiveResize();
        
        console.log('✅ Dashboard initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing dashboard:', error);
    }
});

function updateKPICards() {
    const kpis = calculateGlobalKPIs();
    
    const kpiElements = {
        'total-gdp': `$${kpis.totalGDP.toFixed(1)}T`,
        'top5-concentration': `${kpis.top5Concentration.toFixed(1)}%`,
        'regions-covered': kpis.regionsCount,
        'total-population': `${kpis.totalPopulation.toFixed(2)}B`
    };
    
    Object.entries(kpiElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function calculateGlobalKPIs() {
    let totalGDP = 0;
    let totalPopulation = 0;
    const allCountries = [];
    
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            totalGDP += country.gdpTotal;
            totalPopulation += country.population;
            allCountries.push(country);
        });
    });
    
    const top5 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 5);
    
    const top5GDP = top5.reduce((sum, c) => sum + c.gdpTotal, 0);
    const top5Concentration = (top5GDP / totalGDP) * 100;
    
    return {
        totalGDP: totalGDP / 1000,
        totalPopulation: totalPopulation / 1000000000,
        regionsCount: marketData.regions.length,
        top5Concentration: top5Concentration,
        top5Countries: top5.map(c => c.name)
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4. TAB SYSTEM
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    setTimeout(() => {
        switch(tabName) {
            case 'market-overview':
                updateMarketOverview();
                break;
            case 'regional-analysis':
                updateRegionalAnalysis();
                break;
            case 'strategic-insights':
                updateStrategicInsights();
                break;
        }
    }, 100);
}

function updateMarketOverview() {
    drawTreemap();
    drawScatterPlot();
}

function updateRegionalAnalysis() {
    drawMatrixComparison();
    drawSunburst();
}

function updateStrategicInsights() {
    generateRecommendationsTable();
}

// ═══════════════════════════════════════════════════════════════════
// 5. TREEMAP - WITH GROUPING FOR LOW GDP COUNTRIES
// ═══════════════════════════════════════════════════════════════════

function drawTreemap() {
    const container = document.getElementById('treemap-chart');
    if (!container) return;
    
    const GDP_THRESHOLD = 100; // Países con GDP < 100B se agrupan
    
    const labels = [];
    const parents = [];
    const values = [];
    const colors = [];
    const texts = [];
    
    // Add Global root
    labels.push('Global Market');
    parents.push('');
    values.push(0);
    colors.push('rgba(102, 126, 234, 0.1)');
    texts.push('');
    
    let totalGlobal = 0;
    
    // Sort regions by GDP
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Add regions and countries
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        // Add region
        labels.push(region.name);
        parents.push('Global Market');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        texts.push(`<b>${region.name}</b><br>${regionTotal.toFixed(0)}B`);
        
        // Separate countries into major and minor
        const majorCountries = [];
        const minorCountries = [];
        
        region.countries.forEach(country => {
            if (country.gdpTotal >= GDP_THRESHOLD) {
                majorCountries.push(country);
            } else {
                minorCountries.push(country);
            }
        });
        
        // Sort major countries
        majorCountries.sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        // Add major countries individually
        majorCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
            texts.push(`<b>${country.name}</b><br>${country.gdpTotal.toFixed(0)}B`);
        });
        
        // Group minor countries
        if (minorCountries.length > 0) {
            const minorTotal = minorCountries.reduce((sum, c) => sum + c.gdpTotal, 0);
            const minorCount = minorCountries.length;
            
            labels.push(`Other ${region.name} (${minorCount})`);
            parents.push(region.name);
            values.push(minorTotal);
            
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
            texts.push(`<b>Other ${region.name}</b><br>${minorCount} countries<br>${minorTotal.toFixed(0)}B`);
        }
    });
    
    // Update global value
    values[0] = totalGlobal;
    texts[0] = `<b>Total Global GDP</b><br>${totalGlobal.toFixed(0)}B`;
    
    const data = [{
        type: 'treemap',
        labels: labels,
        parents: parents,
        values: values,
        text: texts,
        textposition: 'middle center',
        textfont: { 
            size: 11, 
            color: '#fff',
            family: '-apple-system, BlinkMacSystemFont, sans-serif'
        },
        hovertemplate: '<b>%{label}</b><br>GDP: %{value:.0f}B<br><extra></extra>',
        marker: {
            colors: colors,
            line: { width: 2, color: 'white' },
            pad: { t: 20, l: 2, r: 2, b: 2 }
        },
        branchvalues: 'total',
        pathbar: {
            visible: true,
            thickness: 20,
            textfont: { 
                size: 12, 
                family: '-apple-system',
                color: '#1e293b'
            },
            edgeshape: '/'
        },
        tiling: {
            packing: 'squarify',
            pad: 3
        }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Purchasing Power Hierarchy: Global → Region → Country</b><br>' +
                  '<sub>Size = Total GDP (market capacity) | Countries with GDP < $100B grouped | Click to explore</sub>',
            font: { size: 17, color: '#1e293b', family: '-apple-system' },
            x: 0.05,
            xanchor: 'left'
        },
        margin: { t: 90, r: 10, b: 10, l: 10 },
        height: 600
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 6. SCATTER PLOT - TOP 10 COUNTRIES ONLY
// ═══════════════════════════════════════════════════════════════════

function drawScatterPlot() {
    const container = document.getElementById('scatter-chart');
    if (!container) return;
    
    // Get all countries and find top 10 by GDP
    const allCountries = [];
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            allCountries.push({
                ...country,
                region: region.name
            });
        });
    });
    
    const top10Countries = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 10);
    
    // Group by region for traces
    const tracesByRegion = {};
    
    top10Countries.forEach(country => {
        if (!tracesByRegion[country.region]) {
            tracesByRegion[country.region] = [];
        }
        tracesByRegion[country.region].push(country);
    });
    
    const traces = [];
    
    Object.entries(tracesByRegion).forEach(([regionName, countries]) => {
        const x = countries.map(c => c.population);
        const y = countries.map(c => c.gdpPerCapita);
        const sizes = countries.map(c => c.gdpTotal);
        const labels = countries.map(c => c.name);
        const codes = countries.map(c => c.code);
        
        // Scale bubble sizes proportionally
        const MIN_SIZE = 25;
        const MAX_SIZE = 70;
        const maxGDP = Math.max(...sizes);
        const minGDP = Math.min(...sizes);
        
        const scaledSizes = sizes.map(gdp => {
            const normalized = (gdp - minGDP) / (maxGDP - minGDP);
            return MIN_SIZE + (normalized * (MAX_SIZE - MIN_SIZE));
        });
        
        const trace = {
            x: x,
            y: y,
            mode: 'markers+text',
            type: 'scatter',
            name: regionName,
            text: codes,
            textposition: 'middle center',
            textfont: {
                size: 10,
                color: '#fff',
                family: 'monospace',
                weight: 'bold'
            },
            marker: {
                size: scaledSizes,
                color: regionColors[regionName],
                opacity: 0.8,
                line: {
                    color: '#fff',
                    width: 2
                }
            },
            customdata: labels.map((label, i) => ({
                name: label,
                gdpTotal: sizes[i],
                population: x[i],
                gdpPerCapita: y[i]
            })),
            hovertemplate: 
                '<b>%{customdata.name}</b><br>' +
                '<br>' +
                '<i>Workforce:</i><br>' +
                'Population: %{customdata.population:,.0f}<br>' +
                '<br>' +
                '<i>Purchasing Power:</i><br>' +
                'GDP per Capita: $%{customdata.gdpPerCapita:,.0f}<br>' +
                '<br>' +
                '<i>Market Size:</i><br>' +
                'Total GDP: $%{customdata.gdpTotal:.0f}B<br>' +
                '<extra></extra>'
        };
        
        traces.push(trace);
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Viability Matrix: Top 10 Markets by GDP</b><br>' +
                  '<sub>X-Axis = Workforce | Y-Axis = Purchasing Power | Size = Total GDP</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.05,
            xanchor: 'left'
        },
        xaxis: {
            title: {
                text: '<b>Population (log scale)</b><br><i>Workforce / Consumer Base</i>',
                font: { size: 13, color: '#475569' }
            },
            type: 'log',
            gridcolor: '#e2e8f0',
            showline: true,
            linecolor: '#cbd5e1',
            linewidth: 2
        },
        yaxis: {
            title: {
                text: '<b>GDP per Capita (USD)</b><br><i>Individual Purchasing Power</i>',
                font: { size: 13, color: '#475569' }
            },
            gridcolor: '#e2e8f0',
            showline: true,
            linecolor: '#cbd5e1',
            linewidth: 2
        },
        legend: {
            x: 1.02,
            xanchor: 'left',
            y: 1,
            bgcolor: 'rgba(255,255,255,0.95)',
            bordercolor: '#cbd5e1',
            borderwidth: 2,
            font: { size: 11 }
        },
        hovermode: 'closest',
        height: 600
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 7. MATRIX COMPARISON - 4 METRICS (WITHOUT EUROPE)
// ═══════════════════════════════════════════════════════════════════

function drawMatrixComparison() {
    const container = document.getElementById('matrix-chart');
    if (!container) return;
    
    const regionMetrics = marketData.regions.map(region => {
        const totalGDP = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalPop = region.countries.reduce((sum, c) => sum + c.population, 0);
        const avgGdpPerCapita = (totalGDP * 1000000000) / totalPop;
        const numCountries = region.countries.length;
        
        return {
            name: region.name,
            totalGDP: totalGDP,
            avgGdpPerCapita: avgGdpPerCapita,
            numCountries: numCountries,
            totalPop: totalPop
        };
    });
    
    regionMetrics.sort((a, b) => b.totalGDP - a.totalGDP);
    
    const regionNames = regionMetrics.map(r => r.name);
    const colors = regionNames.map(name => regionColors[name]);
    
    const traces = [];
    
    // Total GDP
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalGDP),
        type: 'bar',
        name: 'Total GDP',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `${r.totalGDP.toFixed(0)}B`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Total GDP: $%{y:.0f}B<extra></extra>',
        xaxis: 'x1',
        yaxis: 'y1'
    });
    
    // GDP per Capita
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.avgGdpPerCapita),
        type: 'bar',
        name: 'GDP per Capita',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `${(r.avgGdpPerCapita/1000).toFixed(1)}K`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>GDP per Capita: $%{y:,.0f}<extra></extra>',
        xaxis: 'x2',
        yaxis: 'y2'
    });
    
    // Number of Countries
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.numCountries),
        type: 'bar',
        name: 'Countries',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => r.numCountries),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Countries: %{y}<extra></extra>',
        xaxis: 'x3',
        yaxis: 'y3'
    });
    
    // Population
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalPop / 1000000),
        type: 'bar',
        name: 'Population',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `${(r.totalPop/1000000).toFixed(0)}M`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Population: %{y:.0f}M<extra></extra>',
        xaxis: 'x4',
        yaxis: 'y4'
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Multi-Dimensional Regional Comparison</b><br>' +
                  '<sub>Evaluating regions across 4 key strategic metrics</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        grid: {
            rows: 2,
            columns: 2,
            pattern: 'independent',
            roworder: 'top to bottom',
            xgap: 0.18,
            ygap: 0.25
        },
        showlegend: false,
        
        xaxis1: { 
            title: {
                text: '<b>Total GDP</b><br><i>(Market Capacity)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0, 0.41],
            showgrid: false,
            automargin: true
        },
        yaxis1: { 
            title: {
                text: 'Billions USD',
                font: { size: 9 }
            },
            domain: [0.62, 1],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        xaxis2: { 
            title: {
                text: '<b>GDP per Capita</b><br><i>(Purchasing Power)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0.59, 1],
            showgrid: false,
            automargin: true
        },
        yaxis2: { 
            title: {
                text: 'USD per Capita',
                font: { size: 9 }
            },
            domain: [0.62, 1],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        xaxis3: { 
            title: {
                text: '<b>Number of Countries</b><br><i>(Diversification)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0, 0.41],
            showgrid: false,
            automargin: true
        },
        yaxis3: { 
            title: {
                text: 'Country Count',
                font: { size: 9 }
            },
            domain: [0, 0.38],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        xaxis4: { 
            title: {
                text: '<b>Total Population</b><br><i>(Workforce)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0.59, 1],
            showgrid: false,
            automargin: true
        },
        yaxis4: { 
            title: {
                text: 'Millions',
                font: { size: 9 }
            },
            domain: [0, 0.38],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        margin: { t: 100, r: 50, b: 160, l: 80 },
        height: 850
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 8. SUNBURST CHART - WITH GROUPING FOR LOW GDP COUNTRIES
// ═══════════════════════════════════════════════════════════════════

function drawSunburst() {
    const container = document.getElementById('sunburst-chart');
    if (!container) return;
    
    const GDP_THRESHOLD = 100; // Países con GDP < 100B se agrupan
    
    const labels = [];
    const parents = [];
    const values = [];
    const colors = [];
    
    // Add Global root
    labels.push('Global');
    parents.push('');
    values.push(0);
    colors.push('rgba(102, 126, 234, 0.2)');
    
    let totalGlobal = 0;
    
    // Sort regions by GDP
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Add regions and countries
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        
        // Separate countries into major and minor
        const majorCountries = [];
        const minorCountries = [];
        
        region.countries.forEach(country => {
            if (country.gdpTotal >= GDP_THRESHOLD) {
                majorCountries.push(country);
            } else {
                minorCountries.push(country);
            }
        });
        
        // Sort major countries
        majorCountries.sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        // Add major countries individually
        majorCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`);
        });
        
        // Group minor countries
        if (minorCountries.length > 0) {
            const minorTotal = minorCountries.reduce((sum, c) => sum + c.gdpTotal, 0);
            
            labels.push(`Other ${region.name}`);
            parents.push(region.name);
            values.push(minorTotal);
            
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
        }
    });
    
    values[0] = totalGlobal;
    
    const data = [{
        type: 'sunburst',
        labels: labels,
        parents: parents,
        values: values,
        branchvalues: 'total',
        marker: {
            colors: colors,
            line: { width: 2, color: 'white' }
        },
        hovertemplate: 
            '<b>%{label}</b><br>' +
            'GDP: $%{value:.0f}B<br>' +
            'Share: %{percentParent}<br>' +
            '<extra></extra>',
        textfont: {
            size: 12,
            family: '-apple-system',
            color: '#fff'
        },
        insidetextorientation: 'radial',
        leaf: { opacity: 0.8 }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Hierarchical Market Structure</b><br>' +
                  '<sub>Center = Regions | Outer = Countries (GDP < $100B grouped) | Click to explore</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        margin: { t: 80, r: 20, b: 20, l: 20 },
        height: 600,
        sunburstcolorway: Object.values(regionColors)
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 9. RECOMMENDATIONS TABLE - WITHOUT EUROPE
// ═══════════════════════════════════════════════════════════════════

function generateRecommendationsTable() {
    const container = document.getElementById('recommendations-table');
    if (!container) return;
    
    const allCountries = [];
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            allCountries.push({
                ...country,
                region: region.name
            });
        });
    });
    
    const top10 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 10);
    
    let tableHTML = `
        <div class="recommendations-section">
            <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 1.3em;">
                🎯 Top 10 Priority Markets for Investment
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">#</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Country</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Region</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">Total GDP</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">GDP per Capita</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">Population</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Strategic Recommendation</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    top10.forEach((country, index) => {
        const rowColor = index % 2 === 0 ? '#f8fafc' : '#ffffff';
        
        let recommendation = '';
        if (country.gdpTotal > 10000) {
            recommendation = '🌟 Giant Market - Maximum Priority';
        } else if (country.gdpTotal > 3000 && country.gdpPerCapita > 40000) {
            recommendation = '💎 High Value - Premium Products';
        } else if (country.population > 200000000) {
            recommendation = '👥 Massive Base - Economies of Scale';
        } else if (country.gdpPerCapita > 50000) {
            recommendation = '💰 High Purchasing Power';
        } else {
            recommendation = '📈 Viable Emerging Market';
        }
        
        tableHTML += `
            <tr style="background: ${rowColor};">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #667eea;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 600;">${country.name}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">
                    <span style="background: ${regionColors[country.region]}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px;">
                        ${country.region}
                    </span>
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #10b981;">
                    ${country.gdpTotal.toFixed(1)}B
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">
                    ${country.gdpPerCapita.toLocaleString()}
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">
                    ${(country.population / 1000000).toFixed(1)}M
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 13px;">
                    ${recommendation}
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
        
        <div class="strategic-insights" style="margin-top: 40px; padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
            <h3 style="margin-bottom: 16px; font-size: 1.2em;">💡 Strategic Insights for Marco Antonelli</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Priority Distribution Centers:</strong> Asia Pacific dominates with highest total GDP, followed by North America
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>High-Value Markets:</strong> USA, China, Japan, and India represent 75%+ of target market opportunity
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Latin America Opportunity:</strong> Brazil and Mexico offer significant population with growing middle class
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Pricing Strategy:</strong> North America requires premium positioning; Asia needs cost-quality balance
                </li>
                <li style="padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Manufacturing Strategy:</strong> China and India provide massive workforce; Mexico offers proximity to North America
                </li>
            </ul>
        </div>
    `;
    
    container.innerHTML = tableHTML;
}

// ═══════════════════════════════════════════════════════════════════
// 10. RESPONSIVE RESIZE
// ═══════════════════════════════════════════════════════════════════

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) return;
            
            const tabId = activeTab.id;
            
            try {
                if (tabId === 'market-overview') {
                    const treemap = document.getElementById('treemap-chart');
                    const scatter = document.getElementById('scatter-chart');
                    
                    if (treemap && treemap.data) Plotly.Plots.resize('treemap-chart');
                    if (scatter && scatter.data) Plotly.Plots.resize('scatter-chart');
                    
                } else if (tabId === 'regional-analysis') {
                    const matrix = document.getElementById('matrix-chart');
                    const sunburst = document.getElementById('sunburst-chart');
                    
                    if (matrix && matrix.data) Plotly.Plots.resize('matrix-chart');
                    if (sunburst && sunburst.data) Plotly.Plots.resize('sunburst-chart');
                }
            } catch (error) {
                console.warn('⚠️ Resize error:', error);
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 11. UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function formatNumber(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ═══════════════════════════════════════════════════════════════════
// 12. GLOBAL EXPORTS
// ═══════════════════════════════════════════════════════════════════

window.TCFDashboard = {
    version: '2.2.0',
    changeTab: changeTab,
    refreshAllCharts: function() {
        updateMarketOverview();
        updateRegionalAnalysis();
        updateStrategicInsights();
    },
    getKPIs: calculateGlobalKPIs,
    marketData: marketData
};

console.log('✅ TCF Dashboard JavaScript initialized - v2.2.0');
console.log('📖 Documentation: window.TCFDashboard');
console.log('💾 Data: Embedded in main.js (no external file needed)');
console.log('🌍 Regions: Asia Pacific, North America, Latin America, Middle East & Africa');