var composto = "Compound A";

function generateColor(composto, opacity) {
	const baseColor = dashboardData[composto].compoundDetails.base_color;
	return baseColor.replace("{}", String(opacity));
}

function generateMapColors(composto) {
	const opacityMin = 0.2;
	const opacityMax = 0.9;

	const yieldData = dashboardData[composto].charts.catalystYield.data;
	const valueMin = Math.min(...yieldData);
	const valueMax = Math.max(...yieldData);

	const opacity = [];
	const colors = [];

	for (let i = 0; i < yieldData.length; i++) {
		const relative = (yieldData[i] - valueMin) / (valueMax - valueMin);
		opacity[i] = opacityMin + relative * (opacityMax - opacityMin);

		const baseColor = dashboardData[composto].compoundDetails.base_color;
		colors[i] = baseColor.replace("{}", String(opacity[i]));
	}

	return colors;
}

// ---------------------------------------- Visors Panel ----------------------------------------

function buildVisors(composto) {
	const currentCompoundData = dashboardData[composto];

	const textElements = {
		visor1: currentCompoundData.indicators.numExperiments.toLocaleString(),
		visor2: currentCompoundData.indicators.averageYield + "%",
		visor3: currentCompoundData.indicators.averagePurity + "%",
		visor4:
			currentCompoundData.indicators.productGeneratedQty.toLocaleString() +
			" kg",
		name: currentCompoundData.compoundDetails.product_name,
		CAS: currentCompoundData.compoundDetails.CAS_number,
		weigth: currentCompoundData.compoundDetails.molar_mass + " g/mol",
		density: currentCompoundData.compoundDetails.density + " g/cm³",
		state: currentCompoundData.compoundDetails.physical_state,
		charac: currentCompoundData.compoundDetails.characteristic,
	};

	for (const id in textElements) {
		const element = document.getElementById(id);
		if (element) {
			element.classList.remove("active");
			element.classList.add("fade-in");

			setTimeout(() => {
				element.textContent = textElements[id];
				element.classList.add("active");
			}, 250);
		}
	}

	root.style.setProperty("--compound-color1", generateColor(composto, 0.9));
	root.style.setProperty("--compound-color2", generateColor(composto, 0.1));
	root.style.setProperty("--compound-color3", generateColor(composto, 0.3));
}

buildVisors(composto);

// ---------------------------------------- Reaction Graph ----------------------------------------

const chartReaction = document.getElementById("reaction");

const graphReaction = new Chart(chartReaction, {
	data: {
		labels: dashboardData[composto].charts.reactionTime.time_hours,
		datasets: [
			{
				type: "line",
				label: "Limiting reagent",
				data: dashboardData[composto].charts.reactionTime.reagent_consumed,
				borderColor: "rgba(100, 100, 100, 1)",
				tension: 0.3,
			},
			{
				type: "line",
				label: "Principal product",
				data: dashboardData[composto].charts.reactionTime.product_produced,
				borderColor: generateColor(composto, 1),
				tension: 0.3,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Reaction",
				font: {
					size: 16,
				},
			},
			legend: {
				display: true,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Time / h",
					font: {
						size: 16,
					},
				},
			},
			y: {
				beginAtZero: false,
				title: {
					display: true,
					text: "Concentration / g.L⁻¹",
					font: {
						size: 16,
					},
				},
			},
		},
	},
});

const chartTaxa = document.getElementById("rate");

const graphRate = new Chart(chartTaxa, {
	type: "line",
	data: {
		labels: dashboardData[composto].charts.reactionTime.time_hours,
		datasets: [
			{
				label: "Reaction rate",
				data: dashboardData[composto].charts.reactionTime.reaction_rate,
				fill: true,
				borderWidth: 1,
				borderColor: generateColor(composto, 0.8),
				backgroundColor: generateColor(composto, 0.4),
				tension: 0.5,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Reaction Rate",
				font: {
					size: 16,
				},
			},
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Time / h",
					font: {
						size: 14,
					},
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Rate / min⁻¹",
					font: {
						size: 14,
					},
				},
			},
		},
	},
});

// ---------------------------------------- Yield Graph ----------------------------------------

const chartYield = document.getElementById("catalyst");

const graphYield = new Chart(chartYield, {
	type: "bar",
	data: {
		labels: dashboardData[composto].charts.catalystYield.labels,
		datasets: [
			{
				label: "Reaction yield (%)",
				data: dashboardData[composto].charts.catalystYield.data,
				borderWidth: 0,
				backgroundColor: generateMapColors(composto),
			},
		],
	},
	options: {
		indexAxis: "y",
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Yield by Catalyst",
				font: {
					size: 16,
				},
			},
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				beginAtZero: false,
				title: {
					display: true,
					text: "Yield / %",
					font: {
						size: 14,
					},
				},
			},
			y: {
				title: {
					display: false,
				},
			},
		},
	},
});

// ---------------------------------------- Histograms Graph ----------------------------------------

const histPure = document.getElementById("purity");

const graphHistogram = new Chart(histPure, {
	data: {
		labels: dashboardData[composto].charts.purityHistogram.labels,
		datasets: [
			{
				type: "bar",
				label: "Purity",
				data: dashboardData[composto].charts.purityHistogram.data,
				borderWidth: 1,
				pointRadius: 0,
				pointHoverRadius: 0,
				fill: true,
				borderColor: generateColor(composto, 0.7),
				backgroundColor: generateColor(composto, 0.4),
				tension: 0.3,
			},
			{
				type: "bar",
				label: "Yield",
				data: dashboardData[composto].charts.yieldHistogram.data,
				borderWidth: 1,
				pointRadius: 0,
				pointHoverRadius: 0,
				fill: true,
				borderColor: "rgba(100, 100, 100, 0.7)",
				backgroundColor: "rgba(100, 100, 100, 0.4)",
				tension: 0.3,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Yield and Purity",
				font: {
					size: 16,
				},
			},
			legend: {
				display: true,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Values / %",
					font: {
						size: 14,
					},
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Sample Counting",
					font: {
						size: 14,
					},
				},
			},
		},
	},
});
