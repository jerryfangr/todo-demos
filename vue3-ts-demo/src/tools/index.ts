export default class Tool {
  /**
   * create some digits
   * 
   * @param dataNumber 
   * @returns 
   */
  public static randomNumber(dataNumber: number): number {
    let result = randomInteger(1, 9)
    for (let i = 1; i < dataNumber; i++) {
      result *= 10
      result += randomInteger(0, 9)
    }
    return result
  }

  /**
   * create some letters
   * 
   * @param dataNumber 
   * @returns 
   */
  public static randomletter(dataNumber: number): string {
    let result = ''
    for (let i = 0; i < dataNumber; i++) {
      // ASCII: 65-90 => a-Z
      result += String.fromCharCode(randomInteger(65, 90))
    }
    return result
  }

  /**
   * create a uniqued id
   * 
   * @returns 
   */
  public static uniqueId(): string {
    let createTime = new Date().getTime()
    let letters = this.randomletter(8)
    let numbers = this.randomNumber(4)
    return createTime + letters + numbers
  }
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
