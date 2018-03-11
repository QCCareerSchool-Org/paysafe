export class Environment {

  maxSockets: number;
  timeout: number;
  host: string;

  constructor(host: string, maxSockets: number, timeout: number) {
    this.host = host;
    this.maxSockets = maxSockets;
    this.timeout = timeout;
  }

}

export const LIVE = new Environment('https://api.paysafe.com', 10, 30000);
export const TEST = new Environment('https://api.test.paysafe.com', 10, 30000);
export const LOCALTEST = new Environment('localhost', 10, 30000);
export const SBOXTEST = new Environment('https://api.sbox.paysafe.com', 10, 30000);
