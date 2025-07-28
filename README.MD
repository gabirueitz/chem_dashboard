# Chemistry Dashboard

A dynamic and interactive web dashboard built with HTML, CSS, and Chart.js to visualize chemical reaction data for various compounds. Users can select different compounds to update performance indicators, product details, and interactive charts in real-time.

---

## Features

- **Dynamic Data Selection:** Choose from multiple compounds to load and display their specific reaction data.
- **Key Performance Indicators (KPIs):** Real-time display of critical metrics like `Number of Experiments`, `Average Yield`, `Average Purity`, and `Product Generated Quantity`.
- **Detailed Product Information:** View specific chemical properties of the selected compound, including `Product Name`, `CAS Number`, `Molar Mass`, `Density`, `Physical State`, and `Characteristic`.
- **Interactive Charts (Chart.js):**
    - **Reaction Time Series:** Large line chart showing `Reagent Consumption` and `Product Production` over `Time`.
    - **Reaction Rate Series:** Line chart displaying `Reaction Rate` over `Time`.
    - **Catalyst Yield Comparison:** Horizontal bar chart comparing `Yield` for different `Catalysts`.
    - **Purity Distribution Histogram:** Bar chart visualizing the distribution of `Product Purity` (shared bins).
    - **Yield Distribution Histogram:** Bar chart visualizing the distribution of `Reaction Yield` (shared bins).
- **Responsive Layout:** The dashboard layout adapts dynamically to different screen sizes using CSS Grid and Media Queries.
- **Animated Updates:** Smooth transitions for text data updates enhance user experience.

---

## Technologies Used

- **HTML5:** For the basic structure of the web page.
- **CSS3:** For styling and responsive layout (CSS Grid, Flexbox).
- **JavaScript ES6+:** For all dynamic functionalities, data manipulation, and interactivity.
- **Chart.js:** A powerful JavaScript library for creating dynamic and interactive data visualizations.
- **Chart.js Annotation Plugin:** Used for adding specific highlight regions (e.g., optimal pH range) to charts.

---

## Customization

- **Data:** Modify the `dashboardData` object in `script.js` (or `data-dashboard.js`) to add, remove, or change compound data.
- **Styling:** Adjust `style.css` to change colors, fonts, and layout aesthetics.
- **Charts:** Customize chart types, colors, and options within `script.js` by referring to the [Chart.js documentation](https://www.chartjs.org/docs/latest/).

---

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

---

## Contact

[Gabirueitz] - [roger.gabiru@gmail.com]

---