/**
 * @param array
 * @return unique array
 */
 export const unique = <V>(array: V[]) => {
    return array.filter((v, i, a) => a.indexOf(v) === i)
  }
  
  /**
   * Function that always return array
   */
  export const toArray = (value: unknown) => {
    return value instanceof Array
      ? value
      : value ? [value] : []
  }
  
  /**
   * Function returns array of same length, but it contains length of biggest value in one array in percentige
   * 
   * @param array array of arrays with strings or numbers
   * @returns 
   */
  export const getListWidths = (array?: (string | number)[][]) => {
  
    if (array) {
      const rows = array
      .map((arr, i) => arr.map(v => v.toString()))
      .map((arr) => arr.map(v => v.length))
  
      const lengths = rows[0].map((v, i) => rows.map(arr => arr[i]).reduce((a, b) => a > b ? a : b))
      const sum = lengths.reduce((a, b) => a + b)
  
      return lengths.map((v) => (v / sum) * 100 + '%')
    } else {
      return []
    }
  }