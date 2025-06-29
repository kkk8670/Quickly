import dayjs from 'dayjs';

export const getTimeRangeFromSlot = (slotKey: string): [string, string] => {
    const now = new Date();

    switch (slotKey) {
        case 'now':
            return [
                now.toISOString(),
                new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2h
            ];
        case 'moring':
            return [
                new Date(`${now.toDateString()} 09:00:00`).toISOString(),
                new Date(`${now.toDateString()} 11:00:00`).toISOString(),
            ];
        case 'afternoon':
            return [
                new Date(`${now.toDateString()} 14:00:00`).toISOString(),
                new Date(`${now.toDateString()} 16:00:00`).toISOString(),
            ];
        case 'evening':
            return [
                new Date(`${now.toDateString()} 18:00:00`).toISOString(),
                new Date(`${now.toDateString()} 20:00:00`).toISOString(),
            ];
        default:
            return [
                now.toISOString(),
                new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
            ];
    }
}

export const getTimeRangeFromOption = (option: string): [string, string] => {
    const now = new Date();
    const startTime = new Date(now);
    const endTime = new Date(now);

    switch (option) {
        case 'asap':
            endTime.setHours(23, 59, 59, 999);
            break;
        case 'this_week':
            const day = now.getDay();
            const daysUntilSunday = 7 - day;
            endTime.setDate(endTime.getDate() + daysUntilSunday);
            endTime.setHours(23, 59, 59, 999);
            break;
        case 'flexible':
            endTime.setDate(endTime.getDate() + 7);
            endTime.setHours(23, 59, 59, 999);
            break;
    }
    return [
        startTime.toISOString(),
        endTime.toISOString()
    ]
}


export const getCoordfromAddr = (key: string) => {
    const lat = 100.2
    const lng = 13.4
    return [lat, lng]
}

export const formatTime = (timeStr: string) => {
    if (!timeStr) return 'Invalid time';
    const time = dayjs(timeStr);
    return time.format('MMM D, h:mm A')
}