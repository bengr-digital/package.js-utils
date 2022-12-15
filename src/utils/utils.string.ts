/**
 * Join params of string by space
 * @param classes - strings
 * @returns string
 */
 export function cn(...classes: any[]): string {
    const strings: string[] = classes.filter(item => typeof item === 'string')
  
    return strings.join(' ').trim()
  }
  
  /**
   * Return lowercase string without diacritics
   * @param value 
   * @returns string
   */
  export function slug(value: any): string {
    return value?.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
  }
  
  /**
   * Return string with specific lenght. Overflow charts will replace three dots
   * @param value string
   * @param lenght number
   * @returns string
   */
  export function cut(value: string, length: number): string {
    return value.length > length
      ? value.slice(0, length) + '...'
      : value
  }
  
  /**
   * Return new shade for color. Work same as opacity but without transparent
   * @param col hex code of color
   * @param amt number of opacity
   * @returns 
   */
  export const newShade = (col: string, amt: number) => {
    amt = ((amt - 50) / 100) * 255
    col = col.replace('#', '')
    
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    r > 255 && (r = 255)
    r < 0 && (r = 0)
    var b = ((num >> 8) & 0x00FF) + amt;
    b > 255 && (b = 255)
    b < 0 && (b = 0)
    var g = (num & 0x0000FF) + amt;
    g > 255 && (g = 255)
    g < 0 && (g = 0)
    var newCol = g | (b << 8) | (r << 16);
    
    return '#' + ('000000' + newCol.toString(16)).slice(-6);
  };
  
  
  /**
   * Format bytes as human-readable text.
   * 
   * @param bytes Number of bytes.
   * @param si True to use metric (SI) units, aka powers of 1000. False to use 
   *           binary (IEC), aka powers of 1024.
   * @param dp Number of decimal places to display.
   * 
   * @return Formatted string.
   */
  export const humanFileSize = (bytes: number, si:boolean=true, dp=1) => {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
  }