import CookiesUtils from 'js-cookie';
import moment from 'moment';
import 'moment-timezone';


class Cookies{
  static updateTimezoneCookie(){
    CookiesUtils.set('timezone',moment.tz.guess());
  }
}

export default Cookies;
