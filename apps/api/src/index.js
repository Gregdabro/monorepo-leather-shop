const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Загрузка переменных окружения
dotenv.config();

// Импорт обработчика ошибок
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));

// Маршруты (пока пустые, добавим позже)
app.get('/api', (req, res) => {
  res.json({ message: 'API сервера интернет-магазина кожаных изделий' });
});

// Middleware для обработки ошибок
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leather-shop', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
}

start();