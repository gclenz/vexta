import 'dotenv/config';
import server from './app';

const port = process.env.APP_PORT;

server.listen(port, () => {
  console.log('The server is running...');
});