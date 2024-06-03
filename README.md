# Документація API

## Огляд

Цей документ описує доступні кінцеві точки API на `https://test-server-lovat.vercel.app/api`. Цей API надає дані про
різні бізнеси, включаючи кав'ярні, барбершопи та ресторани. Нижче наведено детальний опис структури відповіді та
приклади відповідей для API.

## Кінцеві точки API

### Отримання всіх елементів

**GET https://test-server-lovat.vercel.app/api**

**Опис:** Отримання списку всіх доступних об'єктів.

<details>
    <summary>Відповідь:</summary>

    ```json
    [    
        { 
            "_id": "6653520b40a72914fa8db440",        
            "title": "365 Coffee Shop",        
            "type": "Кав'ярня",        
            "locations": "вулиця Ділова 7 Київ",        
            "suggestions": [
                {
                    "name": "Зерна мелені",                
                    "price": "600",                
                    "volume": "5 кг."
                },            
                {
                    "name": "Зерна",
                    "price": "550",
                    "volume": "5 кг."
                },            
                {
                    "name": "Допінг",
                    "price": "400",
                    "volume": "1 л."
                }        
            ],
            "image": [            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43d",            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43e",            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43f"        
            ]
        }
        // інші об'єкти колекції
    ]
    ```

</details>

---

### Отримання всіх довідника

**GET https://test-server-lovat.vercel.app/api/handbook**

**Опис:** Отримання списку всіх доступних об'єктів.

<details>
    <summary>Відповідь:</summary>

    ```json
    [    
        { 
            "_id": "6653520b40a72914fa8db440",        
            "title": "365 Coffee Shop",        
            "type": "Кав'ярня",        
            "locations": "вулиця Ділова 7 Київ",        
            "suggestions": [
                {
                    "name": "Зерна мелені",                
                    "price": "600",                
                    "volume": "5 кг."
                },            
                {
                    "name": "Зерна",
                    "price": "550",
                    "volume": "5 кг."
                },            
                {
                    "name": "Допінг",
                    "price": "400",
                    "volume": "1 л."
                }        
            ],
            "image": [            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43d",            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43e",            
                "https://test-server-lovat.vercel.app/api/image/6653520a40a72914fa8db43f"        
            ]
        }
        // інші об'єкти колекції
    ]
    ```

</details>

---

### Додавання елементу в колекцію

**POST https://test-server-lovat.vercel.app/api/{uploadObject}**

**Опис:** Додавання нового об'єкта до колекції.

**Приклади доступних uploadObject:**

- uploadEstablishments
- uploadHandbook

**Структура даних для закладів:**
- `title` - строка
- `type` - строка
- `locations` - строка
- `suggestions` - масив об'єктів, де кожен об'єкт має наступні поля:
    - `name` - строка
    - `price` - число
    - `volume` - строка
- `image` - файл зображення

**Структура даних для довідника:**
- `title` - строка
- `addresses` - масив об'єктів, де кожен елемент є строкою
- `phone_number` - строка
- `email` - строка
- `schedule` - строка
---

### Отримання зображення за його ID

**GET https://test-server-lovat.vercel.app/api/image/{image_id}**

**Опис:** Отримання зображення за його ID.

<details>
    <summary>Приклад відповіді:</summary>

    Зображення у форматі JPEG або PNG

</details>

---

### Видалення об'єкта з колекції

**DELETE https://test-server-lovat.vercel.app/api/delete/{deleteObject}/{object_id}**

**Опис:** Видалення бізнесу з колекції за його ID.

**Приклади доступних deleteObject:**

- establishments
- handbook

<details>
    <summary>Приклад відповіді:</summary>

    ```json
    {
        "message": "Об'єкт видалено успішно"
    }
    ```

</details>

---

### Вибір об'єктів за типом

**GET https://test-server-lovat.vercel.app/api/type/{type}/{page}**

**Опис:** Отримання всіх об'єктів певного типу (наприклад, barber-shops, coffee-shops, restaurants).

**Приклад: GET https://test-server-lovat.vercel.app/api/type/barber-shops/1**

**Приклади доступних типів для запитів:**

- all
- barber-shops
- coffee-shops
- restaurants

<details>
    <summary>Приклад відповіді:</summary>

    ```json
    [    
            {
            "_id": "6653530840a72914fa8db444",
            "title": "Barberos",
            "type": "Барбершоп",
            "locations": "м. Київ, пр-т. Петра Григоренка, 28",
            "suggestions": [
                {
                    "name": "Чоловіча стрижка Топ барбер",
                    "price": "600",
                    "volume": "60хв"
                },
                {
                    "name": "Чоловіча стрижка + борода Топ барбер",
                    "price": "800",
                    "volume": "60хч"
                },
                {
                    "name": "Камуфлювання бороди Топ барбер",
                    "price": "350",
                    "volume": "60хв"
                }
            ],
            "image": [
                "https://test-server-lovat.vercel.app/api/image/6653530840a72914fa8db441",
                "https://test-server-lovat.vercel.app/api/image/6653530840a72914fa8db442",
                "https://test-server-lovat.vercel.app/api/image/6653530840a72914fa8db443"
            ]
        }
        // інші об'єкти колекції
    ]
    ```

</details>


### Вибір об'єктів закладу за id

**GET https://test-server-lovat.vercel.app/api/{id}**

**Опис:** Отримання певного обєкту за його id.

**Приклад: GET https://test-server-lovat.vercel.app/api/66574f08c614e6f4cba63e8b**
