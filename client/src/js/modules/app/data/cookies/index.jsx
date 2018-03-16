import Cookies from 'js-cookie';
import moment from 'moment';
export const saveUTCOffset=()=>{
  Cookies.set('utcOffset',moment().zone())
}
