const { EventMocks, eventMockCreat } = require('./eventMock');
const { EventMocksRide } = require('./eventMockRide');
const fs = require('fs');
const path = require('path');

function createRide () {
    console.log('createRide');
    const events = [];
    const rides = [];
    for (let indexEvent = 1; indexEvent < 7; indexEvent++) {
        const event = new EventMocks(indexEvent);
        for (let indexRide = 0; indexRide < 2; indexRide++) {
            const ride = new EventMocksRide(indexEvent, indexRide);
            event.seats += ride.freeSeats();
            rides.push(ride);
        }
        events.push(event);
        // const events = eventMockCreat(event);			
    }
    const pathnameEvents = path.join(__dirname, 'event.json');
    const pathnameRides = path.join(__dirname, 'ride.json');

    fs.writeFile(pathnameEvents, JSON.stringify(events, null, 4), (err) => {
        if (err) throw err;
    });
    fs.writeFile(pathnameRides, JSON.stringify(rides, null, 4), (err) => {
        if (err) throw err;
    });
};

createRide();

