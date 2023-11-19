// import { Worker } from './Worker';

interface Worker extends EventTarget, AbstractWorker {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Worker/message_event) */
  onmessage: ((this: Worker, ev: MessageEvent) => any) | null;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Worker/messageerror_event) */
  onmessageerror: ((this: Worker, ev: MessageEvent) => any) | null;
  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Worker/postMessage)
   */
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  /**
   * Aborts worker's associated global environment.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Worker/terminate)
   */
  terminate(): void;
  addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}



// class Worker {
//   constructor(scriptURL: string | URL, options?: WorkerOptions | undefined) {
//     // write code that satisfies the below conditions and worker api

//   }
//   addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
//     // write code that satisfies the below conditions and worker api

//   }
// }

export class Engine {
  stockfish: Worker;
  onMessage: (callback: (e: any) => void) => void;
  // sendMessage: (message: any) => void;
  constructor() {
    this.stockfish = new Worker("./stockfish.js");
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e: any) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
        callback({ bestMove });
      });
    };
    // Init engine
    this.onMessage(() => "uci");
    this.onMessage(() => "isready");
  }
  sendMessage(arg0: string) {
    throw new Error("Method not implemented.");
  }

  evaluatePosition(fen: any, depth: any) {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }
  stop() {
    this.onMessage(() => "stop"); // Run when changing positions
  }
  quit() {
    this.onMessage(() => "quit"); // Good to run this before unmounting.
  }
}
