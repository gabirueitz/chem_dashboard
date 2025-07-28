const options = Object.keys(dashboardData);
const CompoundSelector = document.getElementById("compound-selection");

for (let i = 0; i < options.length; i++) {
	const element = options[i];
	const option = document.createElement("option");
	option.value = element;
	option.textContent = dashboardData[element].compoundDetails.product_name;
	CompoundSelector.appendChild(option);
}

function updateDashboard() {
	newData = dashboardData[CompoundSelector.value].charts;
	graphReaction.data.labels = newData.reactionTime.time_hours;
	graphReaction.data.datasets[0].data = newData.reactionTime.reagent_consumed;
	graphReaction.data.datasets[1].data = newData.reactionTime.product_produced;
	(graphReaction.data.datasets[1].borderColor = generateColor(
		CompoundSelector.value,
		1
	)),
		graphReaction.update();

	graphRate.data.labels = newData.reactionTime.time_hours;
	graphRate.data.datasets[0].data = newData.reactionTime.reaction_rate;
	graphRate.data.datasets[0].borderColor = generateColor(
		CompoundSelector.value,
		0.8
	);
	graphRate.data.datasets[0].backgroundColor = generateColor(
		CompoundSelector.value,
		0.4
	);
	graphRate.update();

	graphYield.data.labels = newData.catalystYield.labels;
	graphYield.data.datasets[0].data = newData.catalystYield.data;
	graphYield.data.datasets[0].backgroundColor = generateMapColors(
		CompoundSelector.value
	);
	graphYield.update();

	graphHistogram.data.labels = newData.purityHistogram.labels;
	graphHistogram.data.datasets[0].data = newData.purityHistogram.data;
	graphHistogram.data.datasets[1].data = newData.yieldHistogram.data;
	graphHistogram.data.datasets[0].borderColor = generateColor(
		CompoundSelector.value,
		0.7
	);
	graphHistogram.data.datasets[0].backgroundColor = generateColor(
		CompoundSelector.value,
		0.4
	);
	graphHistogram.update();

	buildVisors(CompoundSelector.value);
}

CompoundSelector.addEventListener("change", updateDashboard);
