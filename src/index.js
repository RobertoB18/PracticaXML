const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const productosRouter = require('./app/routes/productos');
app.use('/api/productos', productosRouter);
app.listen(3000, () => {
    console.log('Server is running on port 4200');
});