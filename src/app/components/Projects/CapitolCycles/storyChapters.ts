/** Story chapters for Capitol Cycles walkthrough */

export type StoryFigure = {
  /** Filename under /public/dm/images */
  file: string;
  /** Business / analytical question this visualization answers */
  question: string;
  /** What a stakeholder might conclude or do with this evidence */
  insight: string;
};

export type StoryChapter = {
  slug: string;
  title: string;
  blurb: string;
  figures: StoryFigure[];
};

export const IMAGE_BASE = "/dm/images";

export const storyChapters: StoryChapter[] = [
  {
    slug: "foundation",
    title: "Pipeline & spatial foundation",
    blurb:
      "Ingesting Capital Bikeshare–style trip data in Colab, cleaning and standardizing stations, merging weather, enriching with capacity and transit proximity, geohash activity tiers, and fare rules tied to the CBD polygon.",
    figures: [],
  },
  {
    slug: "eda-demand",
    title: "Demand, stations & capacity",
    blurb:
      "Daily revenue rollups, trip mix by bike and membership, top starting stations, sunburst breakdowns, capacity histograms, and grouped comparisons of start vs end station size classes.",
    figures: [
      {
        file: "distribution-of-trips-by-bike-type-and-membership-status.png",
        question:
          "How is demand split between bike types and membership status, and where should we focus fleet mix or pricing experiments?",
        insight:
          "A skewed mix signals whether to prioritize casual conversion, member retention, or e-bike capacity versus classic bikes.",
      },
      {
        file: "frequency-of-top-5-start-stations.png",
        question:
          "Which start hubs concentrate the most trips for operations, marketing, and network planning?",
        insight:
          "High-concentration hubs justify targeted rebalancing, staffing windows, and partnership or expansion decisions at those nodes.",
      },
      {
        file: "distribution-of-trips-for-top-5-starting-stations.png",
        question:
          "Among top origins, how uneven is trip share—do a few stations dominate share of wallet?",
        insight:
          "Heavy tails suggest dependency risk; diversification or overflow capacity nearby reduces single-point failure for demand.",
      },
      {
        file: "distribution-of-end-station-capacity.png",
        question:
          "Do trips tend to finish at large or small docking stations, and what does that imply for full-rack risk?",
        insight:
          "Bias toward low-capacity ends flags where “no dock” events may spike, guiding dock upgrades or dynamic pricing nudges.",
      },
      {
        file: "trip-counts-by-start-and-end-station-capacity-categories.png",
        question:
          "How do start- vs. end-station capacity classes combine—where are flow imbalances likely between big and small hubs?",
        insight:
          "Systematic mismatches (e.g., many starts at small, ends at large) inform rebalancing routes and capital for dock expansion.",
      },
    ],
  },
  {
    slug: "duration-maps",
    title: "Duration behavior & cartography",
    blurb:
      "Trip length buckets, log-scale comparisons by bike type, and a Mapbox view of stations involved in exceptional multi-day trips—centering downtown usage patterns.",
    figures: [
      {
        file: "distribution-of-trip-duration.png",
        question:
          "What is the typical trip-duration profile, and are there long-tail rides that distort utilization or revenue?",
        insight:
          "Dominant short trips support commuter-oriented pricing; a long tail may warrant overage fees or bike-type rules to protect asset turnover.",
      },
      {
        file: "distribution-of-trip-durations-by-bike-type-log-scale.png",
        question:
          "After log scaling, do classic vs. electric bikes show different duration behavior?",
        insight:
          "Persistent differences suggest distinct use cases—e-bikes for longer errands vs. classics for last mile—informing fleet ratio and maintenance cycles.",
      },
      {
        file: "bike-stations-handling-trips-longer-than-24-hours-in-dc.png",
        question:
          "Where do exceptional multi-day trips cluster geographically?",
        insight:
          "Spatial hotspots support targeted loss-prevention, pricing policy, or station audits rather than system-wide blanket rules.",
      },
    ],
  },
  {
    slug: "revenue",
    title: "Revenue, pricing & time series",
    blurb:
      "Trip cost distributions, duration–cost relationship, weather/bike views, and daily vs weekly vs monthly revenue views before modeling.",
    figures: [
      {
        file: "distribution-of-trip-cost.png",
        question:
          "What does per-trip revenue look like—is yield concentrated in a few high-value trips?",
        insight:
          "The shape of the distribution guides whether to optimize for volume, upsell longer rides, or cap downside from very short trips.",
      },
      {
        file: "trip-cost-vs-duration-with-trendline.png",
        question:
          "How tightly does trip cost track duration, and how predictable is revenue from ride length?",
        insight:
          "A strong trend supports duration-based forecasting and margin models; scatter around the line flags pricing anomalies worth investigating.",
      },
      {
        file: "trip-cost-vs-temperature-by-bike-type.png",
        question:
          "How does the cost–temperature relationship differ by bike type?",
        insight:
          "Weather-sensitive segments suggest when to scale e-bike supply, surge pricing, or promotions without guessing from aggregates alone.",
      },
      {
        file: "daily-and-weekly-totals.png",
        question:
          "What day-of-week and daily revenue rhythms should staffing and campaigns align to?",
        insight:
          "Recurring peaks and troughs turn into concrete calendar decisions for rebalancing, ads, and rider communications.",
      },
      {
        file: "average-daily-revenue-per-month.png",
        question:
          "How does average daily revenue move month to month for budgeting and target-setting?",
        insight:
          "Seasonal lifts or dips ground financial plans and help separate structural growth from weather-driven noise.",
      },
    ],
  },
  {
    slug: "urban-spatial",
    title: "CBD, transit & residential context",
    blurb:
      "Choropleth of trip intensity across residential zones, geohash activity bands vs the CBD, distance to bus/metro/CBD, partial vs full CBD trips, and CBD usage by bike and subscription type.",
    figures: [
      {
        file: "geographic-heatmap-of-trip-activity-per-residential-zone.png",
        question:
          "Which residential zones contribute the most trip intensity for partnerships and station investment?",
        insight:
          "High-activity zones prioritize outreach, sponsorship, and where new docks likely pay back fastest.",
      },
      {
        file: "comparison-of-starts-vs-end-location-activity-levels.png",
        question:
          "Are morning pull (starts) and evening push (ends) balanced across activity tiers?",
        insight:
          "Asymmetry highlights corridors where rebalancing trucks or incentives should run first thing vs. end of day.",
      },
      {
        file: "distribution-of-key-trip-distances.png",
        question:
          "Which distance bands dominate trips, and does that favor e-bikes or short-hop classic coverage?",
        insight:
          "Distance concentration informs bike mix, battery planning, and whether peripheral expansion is economically justified.",
      },
      {
        file: "distribution-of-trips-inside-vs-oustide-the-cbd.png",
        question:
          "What share of trips is core CBD versus outside—how zonal is the business?",
        insight:
          "CBD-heavy usage supports downtown pricing zones and transit integration; a large outer share argues for suburban density plays.",
      },
      {
        file: "number-of-cbd-trips-by-bike-and-subscription-type.png",
        question:
          "Within the CBD, who rides most by bike type and subscription—members or casuals?",
        insight:
          "Segment splits steer pass products, commuter subsidies, and where to place e-bikes versus classics in the central grid.",
      },
    ],
  },
  {
    slug: "weather-stats",
    title: "Weather, correlations & inference",
    blurb:
      "Seasonal weather signals over time, then OLS on revenue vs temperature, humidity, and wind, plus chi-square tests on weather vs bike type—statistical story told in the chapter blurbs and figures.",
    figures: [
      {
        file: "daily-weather-conditions-over-time.png",
        question:
          "What weather regimes and seasonal swings occurred over the study window?",
        insight:
          "Contextualizing demand and regression results avoids over-interpreting a single hot week or mild season as a permanent trend.",
      },
    ],
  },
  {
    slug: "forecasting",
    title: "Baseline & Prophet forecasting",
    blurb:
      "Rolling 7-day mean extrapolation vs historical daily revenue, then Prophet trend and weekly seasonality (Thu/Sat peaks, Sun/Mon dips) aligned with commuter and leisure patterns.",
    figures: [
      {
        file: "daily-revenue-historical-data-and-10-day-forecast.png",
        question:
          "What near-term daily revenue path does the model project versus recent history?",
        insight:
          "Short-horizon forecasts support staffing, inventory, and cash expectations with explicit uncertainty versus a naive baseline.",
      },
      {
        file: "trend-and-weekly-seasonality.png",
        question:
          "What underlying trend and weekly seasonality does Prophet recover for planning?",
        insight:
          "Peaks (e.g., Thu/Sat) and dips (e.g., Sun/Mon) become repeatable levers for capacity and promotional timing.",
      },
    ],
  },
  {
    slug: "clustering",
    title: "Clustering & segmentation",
    blurb:
      "Feature sampling, scaling, elbow method for k (k=4), then K-means and DBSCAN on trip and environmental features—detailed in the project notebook.",
    figures: [
      {
        file: "elbow-method-for-optimal-k.png",
        question:
          "How many distinct behavioral segments does the elbow suggest before diminishing returns?",
        insight:
          "Choosing k (here aligned with k=4 in the notebook) balances actionable segments against over-fragmented strategies.",
      },
    ],
  },
];
