import { listen } from './app';

const port = process.env.PORT || 3000;

listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`http://localhost:${port}/api/health`);
});