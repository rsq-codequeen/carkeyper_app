/// <reference lib="webworker" />

// This runs on a separate thread!
addEventListener('message', ({ data }) => {
  if (data === 'start') {
    setInterval(() => {
      // Perform math/logic away from the main UI thread
      const ping = {
        id: Math.floor(Math.random() * 900) + 100,
        top: Math.random() * 80 + 10 + '%',
        left: Math.random() * 80 + 10 + '%',
        timestamp: Date.now()
      };
      
      // Send the processed data back to the UI thread
      postMessage(ping);
    }, 2000);
  }
});