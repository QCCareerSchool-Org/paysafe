export class Environment {

  public maxSockets: number;
  public timeout: number;
  public host: string;

  constructor(host: string, maxSockets: number, timeout: number) {
    this.host = host;
    this.maxSockets = maxSockets;
    this.timeout = timeout;
  }

}

export const LIVE = new Environment('https://api.paysafe.com', 10, 30000);
export const TEST = new Environment('https://api.test.paysafe.com', 10, 30000);
