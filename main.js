const app = Vue.createApp({});

function addWorkDays(startDate, numberOfDays) {
	var startDateDayOfWeek = startDate.getDay();
	
	var currentDayOfWeek = startDateDayOfWeek;
	var totalDays = numberOfDays;
	
	var upperLimit = numberOfDays;
	
	for (var i = 0; i < upperLimit; i++) {
		if (currentDayOfWeek === 5 || currentDayOfWeek === 6) {
			totalDays++;
			upperLimit++;
		}
		
		if (currentDayOfWeek === 6) {
			currentDayOfWeek = 0;
		} else {
			currentDayOfWeek++;
		}
	}
	
	var calculatedDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + totalDays);
	
	var formattedDate = formatDate(calculatedDate);
	
	return formattedDate;
}

function subtractWorkDays(endDate, numberOfDays) {
	var endDateDayOfWeek = endDate.getDay();
	
	var currentDayOfWeek = endDateDayOfWeek;
	var totalDays = numberOfDays;
	
	var lowerLimit = 0;
	
	for (var i = numberOfDays; i >= lowerLimit; i--) {
		if (currentDayOfWeek === 6 || currentDayOfWeek === 0) {
			totalDays++;
			lowerLimit--;
		}
		
		if (currentDayOfWeek === 0) {
			currentDayOfWeek = 6;
		} else {
			currentDayOfWeek--;
		}
	}
	
	var calculatedDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - totalDays);
	
	var formattedDate = formatDate(calculatedDate);
	
	return calculatedDate;
}

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function formatDate(date) {
	const year = date.getFullYear();
	const dayNumber = date.getDate();
	
	const monthIndex = date.getMonth();
	const monthName = months[monthIndex];
	
	const dayIndex = date.getDay();
	const dayName = days[dayIndex];
	
	return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
}
