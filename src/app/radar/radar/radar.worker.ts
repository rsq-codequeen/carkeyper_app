/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data === 'start') {
    setInterval(() => {
      const ping = {
        id: Math.floor(Math.random() * 900) + 100,
        top: Math.random() * 80 + 10 + '%',
        left: Math.random() * 80 + 10 + '%',
        timestamp: Date.now()
      };
      
      
      postMessage(ping);
    }, 2000);
  }
});