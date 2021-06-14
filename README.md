# Тестовое задание для разработчика Support Dashboard

### REST API

#### Стек: Express.js, Typescript

##### Инструкция

1. Установить все зависимости:
   
    `npm run install` или `yarn install`

2. Создать файл .env и заполнить все поля, как в .env.sample
   
2. Запустить сервер (в режиме разработки):

    `npm run dev` или `yarn dev`
   
#### Сущности

1. Currency
   
    Описание: Валюта, которая имеет 2 поля - имя и тикер
    
    ```
    {
       name: string - имя валюты
       ticker: string - тикер валюты (уникальный)
    }
    ```

#### Описание роутов

| Роут                       | Метод  | Описание                  |
|----------------------------|--------|---------------------------|
| /currency                  | GET    | Получить все валюты       |
| /currency/:id              | GET    | Получить валюту по id     |
| /currency                  | POST   | Добавить новую валюту     |
| /currency/:id              | DELETE | Удалить валюту по id      |
| /currency/:id              | PATCH  | Обновиться валюту         |
| /currency/?ticker={ticker} | GET    | Получить валюту по тикеру |

Для добавления body должен иметь вид:

```json
{
   "currency": {
      "name": "Rubbles",
      "ticker": "USD"
   }
}
```

Для обновления body должен иметь вид:

```json
{
   "currency": {
      "id": "6AGV5oNRf9zTd8q6Zv4eT",
      "name": "Rubbles",
      "ticker": "USD"
   }
}
```