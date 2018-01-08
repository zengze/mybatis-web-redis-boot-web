// import cookie from 'js-cookie'
/**
 * 用户token（基于cookie）
 */
export default class TokenUtil {

  static isExistToken = () => {
    return localStorage.getItem('user_token') ? true : false ;
    // return cookie.get('user_token') ? true : false ;
  }

  static getUserToken = () => {
    return localStorage.getItem('user_token');
    // return cookie.get('user_token');
  }
  /**
   * 在cookie保存用户token 失效时间 15分钟
   * @param expires 失效时间 可以是GMT(new Data().toGMTString()) 格式
   *                {expires:1} 表示一天 如果 expires不传
   *                就默认为关闭网页就失效 和session类似
   */
  static setUserToken = (token) => {
    if(TokenUtil.isExistToken()){
      localStorage.removeItem('user_token');
      // cookie.remove('user_token');
    }
    localStorage.setItem('user_token', token);
    // cookie.set('user_token',`${token}`,{ expires : (1/24/60)*15 }) ;
  }

  static delUserToken = () => {
    localStorage.removeItem('user_token');
    // cookie.remove('user_token');
  }

  static getCookieValue = (key) => {
    return localStorage.getItem('user_token');
    // return cookie.get(key);
  }

  static setCookieByKey = (key,value,options = {}) => {
    localStorage.setItem(key, value);
    // cookie.set(key,value,options);
  }

}
