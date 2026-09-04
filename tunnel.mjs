import localtunnel from 'localtunnel';
import fs from 'fs';

(async () => {
  try {
    fs.writeFileSync('tunnel-status.txt', 'CONNECTING...');
    // Explicitly binding local_host to 127.0.0.1 prevents IPv6 Bad Gateway issues on Windows
    const tunnel = await localtunnel({ 
      port: 3000, 
      local_host: '127.0.0.1' 
    });
    
    console.log('TUNNEL_URL:', tunnel.url);
    fs.writeFileSync('tunnel-status.txt', 'READY: ' + tunnel.url);

    tunnel.on('close', () => {
      fs.writeFileSync('tunnel-status.txt', 'CLOSED');
    });
    
    tunnel.on('error', (err) => {
      fs.writeFileSync('tunnel-status.txt', 'ERROR: ' + err.message);
    });
  } catch (e) {
    fs.writeFileSync('tunnel-status.txt', 'EXCEPTION: ' + e.message);
  }
})();
