import  express from 'express';
import {setupApp} from './setup-app';

//creating App
constapp=express();
setupApp(app);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})