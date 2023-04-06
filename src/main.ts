import express from 'express'
import cors from 'cors';
import axios from 'axios';

const app = express()
const port = Number(process.env.PORT || 3000)

app.set('trust proxy', true);
app.use(cors());

app.get('/', (req, res) => {
    res.send('App running.')
})

app.get('/liveness_check', (req, res) => {
    res.sendStatus(200);
});

app.get('/readiness_check', (req, res) => {
    res.sendStatus(200);
});

app.get('/ping', async (req: any, res) => {
    console.log(req.query)
    if (req.query?.ip as any) {
        try {
            const ip = req.query?.ip
            const response = await axios.get(ip)
            console.log(response.data)
            res.send(response.data)
            return
        } catch {
            console.log('could not reach ip')
            res.send('could not reach ip')
            return
        }
    }
    res.send('pong')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})