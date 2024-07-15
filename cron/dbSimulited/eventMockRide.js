module.exports.EventMocksRide = class EventMocksRide {
    a = () => Math.floor(Math.random() * 2);

    constructor(iterationEvent, iterationRide) {
        this.id = iterationEvent * 2 + iterationRide;
        this.time = iterationEvent % 2 === 1 ? (iterationRide === 1 ? '16:00' : '09:00') : (iterationRide === 1 ? '19:30' : '12:00');
        this.car = iterationRide === 1 ? 'Hyundai' : 'CIA';
        this.driver = iterationEvent % 2 === 1 ? 'Иван' : 'Сергей';
        this.route = iterationEvent;

        const positions = ['front', 'left', 'mid', 'right'];
        const names = ['валера', 'игорь', 'вера', 'плутон'];
        const phones = ['+79001235544', '+79001237766', '+79001232547', '+79001237456'];
        this.passengers = positions.map((position, index) => {
            const variant = this.a() === 1;
            return {
                position,
                name: variant ? '' : names[index],
                phone: variant ? '' : phones[index]
            }
        });
    }

    freeSeats() {
        return this.passengers.reduce((count, pos) => !pos.name ? count + 1 : count, 0);
    }
}