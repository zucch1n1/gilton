document.getElementById('fetch-data').addEventListener('click', function() {
  const url = document.getElementById('table-url').value;

  // Проверка на пустой URL
  if (!url) {
    alert("Пожалуйста, введите URL таблицы.");
    return;
  }

  // Отправка запроса на сервер (замените на ваш URL)
  fetch('/parse-table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при обращении к серверу.');
    }
    return response.json(); // Предполагаем, что сервер возвращает JSON
  })
  .then(data => {
    // Обработка полученных данных
    if (data.error) {
      alert("Ошибка: " + data.error);
      return;
    }

    // 1. (Необязательно) Отображение таблицы
    if (data.table_data) {
      displayTable(data.table_data);
    }

    // 2. Отображение изображения
    if (data.image_url) {
      displayImage(data.image_url);
    }
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
    alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
  });
});

// Функция для динамического создания HTML-таблицы (необязательно)
function displayTable(tableData) {
  const tableContainer = document.getElementById('table-container');
  const table = document.createElement('table');

  tableData.forEach(row => {
    const tableRow = document.createElement('tr');
    row.forEach(cell => {
      const tableCell = document.createElement('td');
      tableCell.textContent = cell;
      tableRow.appendChild(tableCell);
    });
    table.appendChild(tableRow);
  });

  tableContainer.innerHTML = ''; // Очищаем предыдущее содержимое
  tableContainer.appendChild(table);
}

// Функция для отображения изображения
function displayImage(imageUrl) {
  const imageContainer = document.getElementById('image-container');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'Финальная таблица';
  imageContainer.innerHTML = ''; // Очищаем предыдущее содержимое
  imageContainer.appendChild(img);
}
