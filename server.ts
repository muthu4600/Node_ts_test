
import express, { Application, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import XLSX from 'xlsx';
import sequelize from './config/sequelize';
import Users from './models/users';
import Tasks from './models/tasks';

const app: Application = express();
const port = 5000;

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.post('/register', async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log({ hashedPassword })
        const user = await Users.create({ userName, email, password: hashedPassword });
        delete user.dataValues.password;
        res.status(201).send(user);

    } catch (err: any) {
        res.status(500).send({ errorMessage: err?.message });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ attributes: ['id', 'email'], where: { email } });
        if (!user) res.status(404).send({ errorMessage: 'User not found' });
        else {
            const isMatch = bcrypt.compare(password, user?.dataValues.password);
            if (!isMatch) res.status(400).send({ errorMessage: "Password mismatched" });
            else {
                const token = jwt.sign({ userId: user.dataValues.id }, 'node_ts_test_token', { expiresIn: 7 });
                user.dataValues.token = token;
                res.status(200).send({ message: 'login successful', user });
            }
        }
    } catch (err: any) {
        res.status(500).send({ errorMessage: err?.message })
    }
});


app.post('/task/create', async (req: Request, res: Response) => {
    try {
        const task = await Tasks.create({ title: req?.body?.title });
        res.status(200).send({ message: 'Task created', task });
    } catch (err: any) { res.status(500).send({ errorMessage: err?.message }) }
});

app.get('/tasks', async (req: Request, res: Response) => {
    try {
        let where = {};
        if (req?.query?.status) where = { status: req?.query?.status }
        const tasks = await Tasks.findAll({ where });
        res.status(200).send(tasks);
    } catch (err: any) { res.status(500).send({ errorMessage: err?.message }) }
});


app.post('/import-sheet', upload.single('file'), async (req: Request, res: Response) => {

    try {
        if (!req?.file) res.status(404).send({ errorMessage: 'File not found' });
        else {
            const filePath = req.file.path;
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            res.status(200).send({ message: 'Sheet imported successfully' });
        }
    } catch (error: unknown) {
        console.error('Error importing sheet:', error);
        res.status(500).send({ errorMessage: 'Error importing sheet' });
    }
});

sequelize.sync({ alter: true }).then(() => {
    app.listen(5000, () => console.log('listening on port ' + port));
}).catch(err => console.log(err));