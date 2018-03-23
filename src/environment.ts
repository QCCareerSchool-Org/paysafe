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

const MAX_SOCKETS = 10;
const TIMEOUT = 30000; // 30 seconds

export const LIVE = new Environment('https://api.paysafe.com', MAX_SOCKETS, TIMEOUT);
export const TEST = new Environment('https://api.test.paysafe.com', MAX_SOCKETS, TIMEOUT);
