// парсит данные из БД в читаемые для клиента
module.exports.routerMapServer = function routerMapServer(route) {
    return {
        id: route._id,
        title: route.direction,
        start: route.date.toISOString().slice(0, 10),
        seats: route.seats,
        color: route.color,
    }
}

// используется при добавлении евента. парсит данные с клиента в БД форму(ид не нужен)
module.exports.routerMapClient = function routerMapClient(route) {
    return {
        direction: route.title,
        seats: route.seats,
        date: route.start,
    }
}