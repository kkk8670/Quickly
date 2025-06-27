import dayjs from 'dayjs';

export const getTimeRangeFromSlot = (slotKey: string): [string, string] => {
    const now = new Date();

    switch (slotKey) {
        case 'now':
            return [
                now.toISOString(),
                new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2小时
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