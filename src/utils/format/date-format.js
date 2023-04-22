import moment from 'moment';

const formatYearMonth = 'YYYY/MM';
const formatYearMonthSchedule = 'YYYY-MM';
const format = 'DD/MM/YYYY';
const formatYearMonthDay = 'YYYY-MM-DD';
const formatScheduleTime = 'YYYY/MM/DD HH:mm';
const formatTimestamp = 'YYYY-MM-DD HH:mm';
const formatYear = 'YYYY';
const formatTime = 'HH:mm';
const formatNameDay = 'dddd';
/*  */

const formatDate = (value) => {
    return  moment(value).format(format)
}
const formatDateSendDB = (value) => {
    return moment(value).format(formatTimestamp)
}

/*  */
const formatTimeScheduleWeek = {
    timeGutterFormat: 'HH:mm',
    dayFormat: 'ddd DD', // Mon 28
    dayRangeHeaderFormat: ({
        start,
        end
    }, culture, local) => `${local.format(start, 'MMM DD', culture)} - ${local.format(end, 'MMM DD', culture)}`, // Oct 28 - Nov 03
    eventTimeRangeFormat: ({
        start,
        end
    }, culture, local) => `${local.format(start, 'HH:mm', culture)} - ${local.format(end, 'HH:mm', culture)}`
};

function formatTimeMonthSchedule(value) {
    const date = moment().format('DD');
    const yearMonth = moment(value).format(formatYearMonthSchedule);

    return `${yearMonth}-${date}`;
}

const formatFloat = (n) => {
    if (typeof n === 'number') {
        if (Number(n) === n && n % 1 !== 0) {
            return n.toFixed(2);
        }
    }

    return n;
};

const countNumberCharAfterDot = number => String(number).length - String(number).indexOf('.') - 1;

const plusNumbers = (...numbers) => {
    let result = 0;
    numbers.forEach((number) => {
        const resultTens = countNumberCharAfterDot(result);
        const numberTens = countNumberCharAfterDot(number);
        const maxTens = resultTens >= numberTens ? resultTens : numberTens;

        result = Number((result + Number(number)).toFixed(maxTens));
    });

    return result;
};

// eslint-disable-next-line no-mixed-operators
const truncateFloatNumber = (n, x) => Math.floor(n * 10 ** x) / (10 ** x);

// eslint-disable-next-line max-len
const truncateFloatNumberAchievementScreen = (n, x) => ((n !== '' && n) || n === 0 ? Math.floor(n * (10 ** x)) / (10 ** x) : null);

export {
    formatYearMonth,
    formatScheduleTime,
    formatTimeScheduleWeek,
    formatYear,
    formatYearMonthDay,
    formatYearMonthSchedule,
    formatTime,
    formatTimeMonthSchedule,
    formatTimestamp,
    format,
    formatNameDay,
    formatFloat,
    plusNumbers,
    truncateFloatNumber,
    truncateFloatNumberAchievementScreen,
    formatDate,
    formatDateSendDB
};

export { format as default };
