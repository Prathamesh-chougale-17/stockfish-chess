// at eval (./app/page.tsx:35:71)
//     at HomePage (./app/page.tsx:35:66)
//    5 |   // sendMessage: (message: any) => void;
//    6 |   constructor() {
// >  7 |     this.stockfish = new Worker("./stockfish.js");
//      |                         ^
//    8 |     this.onMessage = (callback) => {
//    9 |       this.stockfish.addEventListener("message", (e) => {
//   10 |         const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

//with reference to above error write a code for worker.ts

// Path: app/Worker.ts
// import Worker from 'typescript/lib/lib.webworker'
// typescript/lib/lib.webworker is not a module
// 1 | // Path: app/Worker.ts