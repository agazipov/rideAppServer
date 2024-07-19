module.exports.EventMocks = class EventMocks {
    // seats = Math.floor(Math.random() * 8);

    constructor(iteration) {
        this.seats = 0;
        this.id = iteration;
        this.start = this.nextDate(iteration);
        this.title = iteration % 2 === 1 ? 'Бакал-Челябинск' : 'Челябинск-Бакал';
    }

    nextDate(daySkip) {
        let roundingDay = Math.ceil(daySkip / 2);
        const cuurentDate = new Date();
        return new Date(cuurentDate.setDate(cuurentDate.getDate() + roundingDay));
    }
}

module.exports.eventMockCreat = function eventMockCreat(obj, numIterations) {
    const eventsArr = [];

    for (let index = 1; index < numIterations + 1; index++) {
        let event = new obj(index);
        eventsArr.push(event);
    }

    return eventsArr;
}
