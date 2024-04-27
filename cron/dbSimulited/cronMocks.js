const { CronJob } = require('cron');
const { EventMocks, eventMockCreat } = require('./eventMock');
const fs = require('fs');
const path = require('path');

// updates moks files every midnight
module.exports.job = CronJob.from({
	// cronTime: '00 * * * * *',
	cronTime: '00 00 00 * * *',
	onTick: function () {
		console.log('mock cron worked');
		const data = eventMockCreat(EventMocks, 6);
		const pathname = path.join(__dirname, 'event.json');

		fs.writeFile(pathname, JSON.stringify(data, null, 4), (err) => {
			if (err) throw err;
		});
	},
	timeZone: 'Asia/Yekaterinburg'
});

