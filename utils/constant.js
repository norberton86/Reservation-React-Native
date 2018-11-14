export const urlBase= 'https://afternoon-meadow-68062.herokuapp.com' //'http://localhost:3000' 

export function formatdDate(date){

    var parts = date.split('-')

    return parts[1]+'-'+parts[2]+'-'+parts[0]
}

export function getFormattedTodayDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + '-' + month + '-' + day;
  }

  export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  