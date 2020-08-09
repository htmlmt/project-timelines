app.component('project-form', {
	template:
	`<section class="dd-u-flex">
		<section class="dd-u-w-1/2">
			<form>
				<div class="u-mb-md">
					<label for="due-date">What is the project's due date?</label>
					<input id="due-date" type="date" v-model="dueDate">
				</div>
			
				<fieldset v-if="dueDate">
					<legend>What does this project need?</legend>
					
					<div class="u-mb-md">
						<input id="writing" type="checkbox" value="writing" v-model="projectNeeds">
						<label for="writing">Writing</label>
					</div>
					
					<div class="u-mb-md">
						<input id="design" type="checkbox" value="design" v-model="projectNeeds">
						<label for="design">Design</label>
					</div>
				</fieldset>
				
				<fieldset v-if="projectNeeds.includes('writing')">
					<legend>Is an interview needed?</legend>
					
					<input id="interview-yes" type="radio" value="yes" v-model="interview">
					<label for="interview-yes">Yes</label>
					
					<input id="interview-no" type="radio" value="no" v-model="interview">
					<label for="interview-no">No</label>
				</fieldset>
				
				<fieldset v-if="projectNeeds.includes('design')">
					<legend>Will it be printed?</legend>
					
					<input id="printing-yes" type="radio" value="yes" v-model="printing">
					<label for="printing-yes">Yes</label>
					
					<input id="printing-no" type="radio" value="no" v-model="printing">
					<label for="printing-no">No</label>
				</fieldset>
				
				<fieldset v-if="projectNeeds.includes('design') && printing === 'yes'">
					<legend>Which printing format?</legend>
					
					<input id="printing-small" type="radio" value="small" v-model="printingFormat">
					<label for="printing-small">Small</label>
					
					<input id="printing-large" type="radio" value="large" v-model="printingFormat">
					<label for="printing-large">Large</label>
				</fieldset>
			</form>
		</section>
		
		<section class="dd-u-w-1/2" v-if="projectNeeds.length > 0">
			<p class="dd-u-mt-0">This project would need to start by {{ formatDate(computedDate) }}.</p>
			<ul v-if="dates.length > 1">
				<li v-for="date in dates" :key="date.need">Start {{ date.need }} by {{ formatDate(addWorkDays(computedDate, date.days)) }}.</li>
			</ul>
		</section>
	</section>`,
	data() {
		return {
			hasDueDate: null,
			dueDate: null,
			projectNeeds: [],
			interview: null,
			printing: null,
			mailing: null,
			printingFormat: null,
			projectNeedsInDays: {
				'writing': 13,
				'design': 15
			},
			printingFormatsInDays: {
				'small': 5,
				'large': 10
			},
			interviewInDays: 10,
			dates: []
		}
	},
	methods: {
		addWorkDays: function(startDate, numberOfDays) {
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
			
			return calculatedDate;
		},
		formatDate: function(date) {
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
			
			const year = date.getFullYear();
			const dayNumber = date.getDate();
			
			const monthIndex = date.getMonth();
			const monthName = months[monthIndex];
			
			const dayIndex = date.getDay();
			const dayName = days[dayIndex];
			
			return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
		}
	},
	computed: {
		computedDate() {
			if (this.projectNeeds.length > 0) {
				let totalDays = 0;
				
				this.dates = [];
				
				if (this.interview === 'yes') {
					this.dates.push({
						need: 'interview',
						days: totalDays
					});
					
					totalDays = totalDays + this.interviewInDays;
				}
				
				this.projectNeeds.forEach(projectNeed => {
					this.dates.push({
						need: projectNeed,
						days: totalDays
					});
					
					totalDays = totalDays + this.projectNeedsInDays[projectNeed];
				});
				
				if (this.printing === 'yes' && this.printingFormat) {
					this.dates.push({
						need: this.printingFormat + '-format printing',
						days: totalDays
					});
					
					totalDays = totalDays + this.printingFormatsInDays[this.printingFormat];
				}
				
				let dateObject = new Date();
				
				if (this.dueDate) {
					const dueDateArray = this.dueDate.split('-');
					
					const dueDateYear = parseInt(dueDateArray[0]);
					const dueDateMonth = parseInt(dueDateArray[1]) - 1;
					const dueDateDate = parseInt(dueDateArray[2]);
					
					dateObject = new Date(dueDateYear, dueDateMonth, dueDateDate);
				}
				
				const endDateObject = subtractWorkDays(dateObject, totalDays);
				
				return endDateObject;
			}
		}
	}
})
