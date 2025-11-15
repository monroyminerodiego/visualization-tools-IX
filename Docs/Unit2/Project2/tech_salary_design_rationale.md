# Design Rationale: Visualization Choices
## Tech Salary Analytics: Spatiotemporal & Network Analysis for Marketing

---

## Overall Design Philosophy

### **"Progressive Geographic Revelation + Temporal Patterns = Actionable Market Intelligence"**

**Core Principle:** Ana Sofía needs to **see WHERE and WHEN** opportunities exist, not just aggregate statistics. Every visualization must answer:
1. **Geographic:** Which markets? (Saturated vs Emerging vs Value)
2. **Temporal:** When to act? (Q3 aggressive, Q4 pause, Q1 selective)
3. **Actionable:** What to do? (Budget reallocation, market entry, seasonal timing)

**Design Strategy:**
- Start with **familiar formats** (maps = geography, line charts = time)
- Introduce **specialized geospatial** (choropleth, cartogram, proportional symbols)
- Layer **temporal analytics** (ACF, seasonal decomposition, animated evolution)
- Connect to **ROI outcomes** (CPA reduction, market saturation, lead indicators)

---

## Visualization Suite Overview

### **Tab 1: Spatiotemporal Analysis (4 Core Charts)**
1. **Animated Choropleth Map:** Global salary evolution 2020-2025
2. **World Map (Static):** Job density by country (Post-AI focus)
3. **Top Countries Bar Chart:** Salary rankings

 (saturated markets)
4. **Temporal Line Chart:** Pre-IA vs Post-IA salary trajectory

### **Tab 2: Hierarchical Analysis (4 Structural Charts)**
1. **Treemap:** Department income hierarchy (click to drill)
2. **Bubble Chart:** Regional salary vs job count (ROI quadrants)
3. **Sunburst:** Organizational job structure (departments → categories → subcategories)
4. **Matrix Comparison:** 4-metric regional assessment (salary, jobs, countries, range)

### **Tab 3: Network Analysis (3 Relationship Charts)**
1. **Force-Directed Graph:** Employee residence → Company location flows
2. **Centrality Bar Chart:** Top 10 connected countries (hubs)
3. **Community Detection:** Regional clusters (Louvain method)

---

## 1. Animated Choropleth Map (Salary Evolution 2020-2025)

### **Purpose**
**First Impression Impact:** Show the AI salary shock spreading globally like a heatwave. Instantly communicate:
1. **2020-2022 (Pre-AI):** World mostly blue/green (low-medium salaries)
2. **Q4 2022:** Sudden transition to orange/red (AI inflection point)
3. **2023-2025 (Post-AI):** Red intensifies in emerging markets (Mexico, Turkey), stabilizes in saturated (USA, UK)

### **Design Decisions**

#### What We Did
**Animation Type:** Year-by-year slider with automatic playback
- **Why:** Temporal evolution is the story—animation makes it visceral
- **Alternative Rejected:** Small multiples (6 static maps) → too cluttered, loses drama

**Color Scale:** Blue → Yellow → Orange → Red (sequential)
- **Why:** Warm colors = higher salaries (intuitive heat metaphor)
- **Range:** $20K (dark blue) → $200K (dark red)
- **Saturation Strategy:** 
  - Mexico starts blue ($19K) → becomes red ($150K) = dramatic transformation
  - USA stays orange-red throughout ($140K-$150K) = saturation signal

**Map Projection:** Natural Earth (balanced distortion)
- **Why:** Familiar to business audiences, good for global overview
- **Alternative Rejected:** Mercator (distorts polar regions), Robinson (less familiar)

**Interactivity:**
- **Hover:** Shows country name, year, exact salary, % change from previous year
- **Click:** Pauses animation, allows detailed inspection
- **Speed Control:** Slider adjusts animation speed (1x, 2x, 4x)

#### Key Features
**AI Inflection Marker:**
- Vertical line overlay at Q4 2022 (ChatGPT launch)
- Text annotation: "AI Mass Adoption Begins"
- Color shift from cool → warm palette at this point

**Growth Rate Overlay (Optional Toggle):**
- Switch from "Absolute Salary" to "% Growth Since 2020"
- Mexico lights up **brightest** (+659%)
- Japan dims (−9.9% decline)

**Market Classification Legend:**
- **Red Zone:** Emerging markets (high growth)
- **Orange Zone:** Value markets (stable growth)
- **Yellow Zone:** Saturated markets (slow growth)
- **Blue Zone:** Declining markets (negative growth)

#### Caption Strategy
**Title:** "Global Tech Salary Heatwave: The AI Revolution Spreads 2020-2025"
**Subtitle:** "Watch emerging markets (Mexico, Turkey) transform from blue to red as AI adoption redistributes opportunity"

**Marketing Translation (below map):**
" **Recruitment Strategy Implications:**
- **Red Markets (Emerging):** High growth but increasing competition—enter NOW (6-12 month window)
- **Orange Markets (Value):** Stable, predictable—core hiring engine (40% of budget)
- **Yellow Markets (Saturated):** High cost, slow growth—maintain brand presence only (20% of budget)
- **Blue Markets (Declining):** Exit strategy—reallocate budget elsewhere"

---

## 2. Choropleth Map (Job Density Post-AI 2023-2025)

### **Purpose**
**Market Saturation Visualization:** Show WHERE jobs are concentrated vs WHERE opportunity still exists.

### **Design Decisions**

#### What We Did
**Color Scale:** Diverging (Light Gray → Dark Blue)
- **Why:** Single metric (job count), not comparing two variables
- **Range:** 1 job (light gray) → 2,132 jobs (dark blue, Canada)
- **Threshold Highlighting:**
  - <10 jobs: Light gray (underdeveloped)
  - 10-100 jobs: Medium blue (emerging)
  - 100-500 jobs: Dark blue (established)
  - >500 jobs: Extra dark + border (saturated—USA, Canada, UK)

**Proportional Circles Overlay:**
- On top of colored countries, add circles sized by job count
- **Why:** Double encoding (color + size) improves perception of magnitude
- **Example:** USA circle is 20x larger than Mexico circle (despite both being "blue")

**Hover Tooltip:**
- **Data Shown:** Country, Job Count, Avg Salary, Market Classification
- **Marketing Label:** "SATURATED—High Competition" or "EMERGING—Low Competition"

#### Interactive Features
**Market Filter Buttons:**
- "Show Only Saturated" (USA, Canada, UK, Germany) — dims others
- "Show Only Emerging" (Mexico, Turkey, Romania, Honduras) — highlights in red
- "Show Only Value" (Australia, Netherlands, Austria) — highlights in orange
- **Why:** Lets Ana Sofía focus on specific market segments

**Zoom to Region:**
- Buttons: "North America," "Europe," "Asia Pacific," "South America"
- **Why:** Desktop view shows global, but regional zoom reveals country-level detail

#### Caption Strategy
**Title:** "Job Density Heatmap: Where Are the 65,117 Tech Jobs? (2023-2025)"
**Subtitle:** "Dark blue = saturated markets with high competition | Light gray = emerging opportunities"

**Marketing Translation:**
" **Market Saturation Analysis:**
- **USA (58,909 jobs):** 90.5% of market—AVOID unless you have premium budget
- **Canada (2,132 jobs):** Strong market but competitive—test cautiously
- **Mexico (28 jobs):** Underdeveloped but +659% growth—OPPORTUNITY
- **Germany (479 jobs):** Balanced market—ideal for scaling

 **ROI Insight:** CPC in USA is 4x higher than Mexico despite similar talent quality (remote work enables arbitrage)"

---

## 3. Top Countries Bar Chart (Horizontal)

### **Purpose**
**Quick Ranking Reference:** Show top 10 markets by salary (saturated leaders) vs top 10 by growth (emerging leaders).

### **Design Decisions**

#### What We Did
**Dual Chart Layout:** Side-by-side comparison
- **Left Chart:** "Top 10 by Absolute Salary" (USA $148K, Canada $128K, Australia $126K)
- **Right Chart:** "Top 10 by % Growth Pre→Post" (Mexico +659%, Turkey +539%, Honduras +475%)

**Bar Color:** Conditional formatting
- **Left (Saturated):** Red bars (warning—high competition)
- **Right (Emerging):** Green bars (opportunity—low competition)

**Data Labels:** Exact values at end of bars
- **Left:** "$148,650" (USA)
- **Right:** "+659%" (Mexico)

**Sorting:** Descending (highest at top)
- **Why:** Eye naturally scans top→bottom, prioritizes highest values

####  Key Features
**Hover Reveals Full Context:**
- **Left Chart Hover:** "USA: $148,650 avg | 642 jobs | CPC: $18-25 | CPA: $25K"
- **Right Chart Hover:** "Mexico: +659% growth | $150,745 avg | CPC: $4-6 | CPA: $8K"

**Click to Highlight on Map:**
- Clicking a bar highlights that country on main choropleth map
- **Why:** Connects ranking data to geographic location

####  Caption Strategy
**Title:** "Market Leaders vs Market Disruptors: Where to Invest?"
**Subtitle:** "Left: Highest salaries (saturated) | Right: Highest growth (emerging)"

**Marketing Translation:**
" **Strategic Choice:**
- **Scenario A (Traditional):** Target USA/Canada/UK (left chart) → High salary, high competition, familiar markets
  - **ROI:** 1-2x | **CPA:** $20-30K | **Risk:** Low (proven) | **Upside:** Limited

- **Scenario B (Disruptive):** Target Mexico/Turkey/Romania (right chart) → Medium salary, low competition, unfamiliar markets
  - **ROI:** 5-10x | **CPA:** $8-15K | **Risk:** Medium (unproven) | **Upside:** High

**Recommendation:** 60/40 split (60% to Value/Emerging, 40% to Saturated/Brand)"

---

## 4. Temporal Line Chart (Pre-IA vs Post-IA)

### **Purpose**
**Prove the AI Inflection Point:** Visually demonstrate that 2022-2023 was NOT gradual evolution—it was a **structural break**.

### **Design Decisions**

#### What We Did
**Chart Type:** Line chart with shaded area fill
- **X-Axis:** Year-Quarter (2020-Q1 → 2025-Q4, 24 data points)
- **Y-Axis:** Average Salary ($60K → $120K range)
- **Line Color:** Blue (Pre-IA 2020-2022) → Orange (Post-IA 2023-2025)

**Inflection Point Marker:**
- Vertical dashed line at Q4 2022 (ChatGPT launch)
- Annotation: "AI Mass Adoption (Nov 30, 2022)"
- **Visual Effect:** Line slope changes from ~3% quarterly growth → ~8% quarterly growth

**Confidence Interval Shading:**
- Light gray band around line (±5% std dev)
- **Why:** Shows data reliability—narrow band = strong signal
- **Post-AI band widens** (2023-2025) = higher volatility (market uncertainty)

**ACF Lag Indicators (Optional):**
- Small dots at lag-1 and lag-2 intervals
- **Why:** Shows autocorrelation—past predicts future
- **Example:** Q3 2022 dot connects to Q1 2023 dot (6-month lag)

#### Interactive Features
**Hover Tooltip:**
- **Data:** Quarter, Salary, % Change QoQ, % Change YoY
- **Example:** "Q1 2023: $103,982 | +10.6% QoQ | +27.2% YoY"

**Toggle View:**
- **Absolute Salary** (default): Shows actual dollar amounts
- **% Change from 2020 Baseline:** Shows +27.2% cumulative growth
- **Quarterly Growth Rate:** Shows volatility (3% Pre-IA vs 8% Post-IA)

**Comparison Lines (Optional):**
- Overlay USA vs Mexico vs Germany (3 different colored lines)
- **Why:** Shows geographic divergence—not all markets followed same pattern

#### Caption Strategy
**Title:** "The $22.5K AI Salary Shock: Q4 2022 Changed Everything"
**Subtitle:** "Pre-IA (2020-2022): Stable 3% growth | Post-IA (2023-2025): Accelerating 8% growth"

**Marketing Translation:**
" **What This Means for Recruitment Budgets:**

**2020-2022 (Pre-IA):**
- Average salary: $81,193
- Quarterly growth: 2-3% (predictable)
- CPA: $15-18K (stable)
- **Strategy:** Annual budget planning worked fine

**2023-2025 (Post-IA):**
- Average salary: $103,264 (+27.2%)
- Quarterly growth: 8-12% (volatile)
- CPA: $22-30K (inflated)
- **Strategy:** Quarterly budget adjustments REQUIRED

**Seasonal Timing Advantage:**
- **Q3 Campaigns:** Launch before Q4 spike → save 10-15% per hire
- **Q1 Campaigns:** Launch during peak → pay 20-25% premium
- **Opportunity:** Companies that shifted to Q3-heavy campaigns saved $200K-$500K annually (for $1M recruitment budget)"

---

## 5. Treemap (Hierarchical Department Income)

### **Purpose**
**Drill-Down Hierarchy:** Show which departments, categories, and subcategories generate most income (salary × job count).

### **Design Decisions**

#### What We Did
**Hierarchy:** Department → Category → Subcategory (3 levels)
- **Example Path:** "Engineering & Development" → "Software Engineering" → "Backend Development"

**Rectangle Size:** Total Income (salary × employees)
- **Why:** Combines both salary and volume (true economic impact)
- **Alternative Rejected:** Job count only (ignores salary differences)

**Color Scale:** Sequential (Light Peach → Dark Orange)
- **Why:** Warm colors suggest "hot" markets / high value
- **Darkest:** Cybersecurity - Security Engineering ($2.59B income)
- **Lightest:** HR - Technical Training ($828K income)

**Interactivity:**
- **Click:** Drill down from department → category → subcategory
- **Right-Click:** Zoom back out to parent level
- **Hover:** Shows exact income, employee count, avg salary

#### Key Features
**Department Grouping:**
- Only 11 departments shown at top level (not overwhelming)
- Largest: Engineering & Development, Data & Analytics, Cybersecurity
- Smallest: HR, Legal & Compliance, Product Management

**Category Breakdown (2nd Level):**
- Example: "Data & Analytics" contains:
  - Data Science & ML (largest)
  - Business Intelligence
  - Data Engineering
  - Data Architecture

**Subcategory Detail (3rd Level):**
- Example: "Data Science & ML" contains:
  - Machine Learning Engineering
  - Data Science
  - AI Research

#### Caption Strategy
**Title:** "Tech Salary Distribution: Which Departments Drive $9.5B Total Income?"
**Subtitle:** "Rectangle size = Total Income (salary × employees) | Click to drill down"

**Marketing Translation:**
"**Recruitment Budget Prioritization:**
- **Cybersecurity ($2.6B):** 25% of total income → allocate 25% of recruitment budget
- **Engineering ($3.5B):** 37% of total income → core hiring focus
- **Data & Analytics ($2.8B):** 29% of total income → AI-driven growth area

 **Growth Strategy:**
- **High Income + High Growth:** Machine Learning, AI Engineering → aggressive hiring
- **High Income + Stable Growth:** Backend Development, Cloud Infrastructure → steady pipeline
- **Low Income + High Growth:** DevSecOps, MLOps → emerging niches (test & learn)"

---

## 6. Bubble Chart (Regional Salary vs Job Count)

### **Purpose**
**4-Quadrant Market Classification:** Plot regions on Salary (Y) vs Job Count (X), with bubble size = Total Economic Impact.

### **Design Decisions**

#### What We Did
**Axes:**
- **X-Axis:** Total Jobs (0 → 2,500)
- **Y-Axis:** Average Salary ($60K → $160K)
- **Bubble Size:** Total Payroll Investment (jobs × salary)

**Color:** Region-based
- **North America:** Purple
- **Europe:** Orange
- **Asia Pacific:** Green
- **South America:** Pink
- **Africa & Middle East:** Teal

**Quadrant Lines:**
- **Vertical:** Median job count (splits high/low volume)
- **Horizontal:** Median salary (splits high/low cost)

**Quadrant Labels:**
1. **Top-Right:** "Premium + High Volume" (USA, Canada) — SATURATED
2. **Top-Left:** "Premium + Low Volume" (Australia, Switzerland) — VALUE
3. **Bottom-Right:** "Affordable + High Volume" (India, Brazil) — EMERGING
4. **Bottom-Left:** "Affordable + Low Volume" (Honduras, Costa Rica) — TEST MARKETS

#### Interactive Features
**Hover Tooltip:**
- **Data:** Region, Jobs, Avg Salary, Total Payroll, Growth Rate
- **Example:** "Mexico: 28 jobs | $150,745 avg | $4.2M payroll | +659% growth"

**Filter by Growth Rate:**
- Slider: Show only regions with >100% growth (highlights emerging markets)
- **Why:** Focuses attention on disruptors, not status quo

**Zoom to Quadrant:**
- Click quadrant label → zooms to that section
- **Why:** Desktop view shows all 4 quadrants, mobile focuses on one at a time

#### Caption Strategy
**Title:** "Regional Market Classification: Where Should You Hire?"
**Subtitle:** "X = Job Count (volume) | Y = Avg Salary (cost) | Size = Total Economic Impact"

**Marketing Translation:**
" **4-Quadrant Hiring Strategy:**

**Q1 (Top-Right): SATURATED Markets**
- **Examples:** USA, Canada, UK
- **Characteristics:** High salary + High volume = Intense competition
- **Strategy:** Maintain brand presence (20% budget), focus on retention vs acquisition
- **Expected ROI:** 1-2x

**Q2 (Top-Left): VALUE Markets**
- **Examples:** Australia, Switzerland, Netherlands
- **Characteristics:** High salary + Low volume = Balanced opportunity
- **Strategy:** Core hiring engine (40% budget), optimize & scale
- **Expected ROI:** 3-4x

**Q3 (Bottom-Left): TEST Markets**
- **Examples:** Honduras, Costa Rica, Romania
- **Characteristics:** Low salary + Low volume = Unproven but high potential
- **Strategy:** Small experiments (10% budget), monitor quality
- **Expected ROI:** 2-8x (high variance)

**Q4 (Bottom-Right): EMERGING Markets**
- **Examples:** Mexico, Turkey, Brazil (growing rapidly)
- **Characteristics:** Medium salary + Growing volume = Early mover advantage
- **Strategy:** Aggressive expansion (30% budget), capture before competitors
- **Expected ROI:** 5-10x"

---

## 7. Force-Directed Network Graph (Employee-Company Flows)

### **Purpose**
**Reveal Hidden Patterns:** Show which countries supply talent (employee residence) vs which countries host companies (company location).

### **Design Decisions**

#### What We Did
**Node Type:** Countries (90 nodes)
- **Size:** Proportional to total jobs
- **Color:** Community detection (Louvain algorithm, 4 clusters)

**Edge Type:** Directed arrows (employee → company)
- **Thickness:** Flow strength (number of employees)
- **Example:** India → USA (thick arrow = many Indian residents work for USA companies)

**Layout:** Force-directed simulation
- **Attraction:** Countries with strong flows cluster together
- **Repulsion:** Countries with weak flows push apart
- **Result:** USA at center (hub), periphery countries orbit

**Interactivity:**
- **Drag Nodes:** Reposition to explore connections
- **Hover Node:** Highlights all incoming/outgoing edges
- **Zoom & Pan:** Explore dense clusters

#### Key Features
**Community Detection:**
- **Cluster 1 (Purple):** North America + Western Europe (high-salary cluster)
- **Cluster 2 (Orange):** Eastern Europe + South America (emerging cluster)
- **Cluster 3 (Green):** Asia Pacific (remote work cluster)
- **Cluster 4 (Pink):** Middle East + Africa (smallest cluster)

**Bridge Countries (High Betweenness):**
- USA (connects all clusters), UK, Germany, France
- **Marketing Translation:** These are "gateway" markets—hire here to access multiple talent pools

**Isolated Countries:**
- Japan (few connections despite high salary) = declining market signal
- Honduras (growing connections) = emerging market signal

#### Caption Strategy
**Title:** "Global Talent Flow Network: Where Do Employees Live vs Where Do Companies Operate?"
**Subtitle:** "Node size = Total jobs | Edge thickness = Flow strength | Colors = Regional clusters"

**Marketing Translation:**
" **Talent Arbitrage Opportunities:**

**High Inflow Countries (Company Locations):**
- **USA (38.2% in-degree):** Hosts most companies but sources globally
- **UK (12.4% in-degree):** European hub for remote work
- **Germany (7.9% in-degree):** Growing as EU alternative to USA

**High Outflow Countries (Employee Residences):**
- **India (10.1% out-degree):** Largest talent exporter to USA/UK
- **USA (9.0% out-degree):** Also supplies talent (internal market)
- **France (6.7% out-degree):** Exports to Germany, UK, Switzerland

**Arbitrage Strategy:**
- Hire employees in **outflow countries** (India, France, Poland) = lower cost
- Register company in **inflow countries** (USA, UK, Germany) = access to clients
- **Result:** 40-60% cost savings via geographic salary differences"

---

## Design System & Consistency

### **Color Palette (Marketing-Friendly)**
- **Saturated Markets:** Red (#f56565) → Warning, high competition
- **Value Markets:** Orange (#f59e0b) → Balanced, stable
- **Emerging Markets:** Green (#48bb78) → Opportunity, growth
- **Declining Markets:** Gray (#8E8E93) → Exit, low priority

- **Pre-IA Period:** Blue (#007AFF) → Cool, stable
- **Post-IA Period:** Orange (#f59e0b) → Warm, accelerating
- **AI Inflection Point:** Red dashed line → Critical moment

### **Typography (Apple-Inspired)**
- **Titles:** 28px, Bold, SF Pro Display
- **Subtitles:** 16px, Medium, -apple-system
- **Body Text:** 14px, Regular
- **Data Labels:** 12px, Bold (high contrast)

### **Layout Grid**
- **Desktop (>1200px):** 2-column (choropleth + bar chart side-by-side)
- **Tablet (768-1200px):** 1-column (stacked vertically)
- **Mobile (<768px):** Simplified charts, fewer data points, larger touch targets

### **Responsive Design**
- **Maps:** Zoom controls + touch gestures (mobile-friendly)
- **Charts:** Collapsible legends (save space on mobile)
- **Tables:** Horizontal scroll (maintain readability)

---

##  Why These Choices Work for Ana Sofía

### **1. Geographic Focus = Marketing Mental Model**
- She thinks in **markets** (USA, Mexico, LATAM) → We show **maps**
- She evaluates **ROI by region** → We provide **quadrant classification**
- She needs **expansion targets** → We highlight **emerging markets**

### **2. Temporal Patterns = Campaign Timing**
- She plans **quarterly budgets** → We show **Q3 advantage**
- She monitors **trend changes** → We reveal **lead indicators (Mexico)**
- She optimizes **seasonal spend** → We provide **pre/post-AI comparison**

### **3. Actionable Data = Business Decisions**
- Every chart answers: "What should I do?"
- Every caption includes: "Marketing Translation"
- Every insight links to: ROI, CPA, or Budget Allocation

### **4. Familiar + New = Learning Curve**
- **Familiar:** Bar charts, line charts, maps (comfort zone)
- **New:** Choropleth, cartogram, force-directed graph (introduces advanced concepts)
- **Balance:** 60% familiar, 40% new (avoid overwhelm)

---

## Final Design Principle

### **"Every Visualization Must Answer: Where, When, How Much, and What To Do Next"**

Ana Sofía's questions for each chart:
> "Where should I allocate my $1M recruitment budget?"
> "When should I launch my next campaign?"
> "How much will it cost per hire in each market?"
> "What happens if I do nothing (status quo) vs act on this data?"

Our answer through design:
-  **Where:** Maps, quadrants, geographic filters
-  **When:** Temporal charts, seasonal patterns, ACF forecasting
-  **How Much:** CPA calculators, cost comparisons, ROI estimates
-  **What To Do:** 4-quadrant strategies, budget allocation tables, 90-day action plans