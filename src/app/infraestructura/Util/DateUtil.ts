import * as moment from 'moment';

export class DateUtil {

    static getDate() {
        return moment().format('YYYY-MM-DD');
    }

    static formatDateYYYYMMDD(date) {
        return moment(date).format('YYYY-MM-DD');
    }
}
