# [Одностраничный сайт](https://alemsharla.kz/) AlemSharla

Лендинг мобильного приложения  для получения виз AlemSharla был разработан на основе предоставленного макета.

## Общая информация

- Общие/повторяющиеся стили вынесены в [style.scss.](https://github.com/adi1zhexen0v/alem-sharla-landing/blob/main/src/scss/style.scss) Стили каждой секции собраны в [отдельных файлах.](https://github.com/adi1zhexen0v/alem-sharla-landing/tree/main/src/scss/sections)
- Сайт адаптирован до ширины 320рх.
- Все изображения сжаты и расформированы по [папкaм.](https://github.com/adi1zhexen0v/alem-sharla-landing/tree/main/src/img)
- JavaScript файлы собраны по модульной структуре.

## Описание gulp-задач

Ниже представлено описание каждой задачи в файле [gulp-скрипта:](https://github.com/adi1zhexen0v/alem-sharla-landing/blob/main/gulpfile.js)

- **compileStyles:** Компилирует и оптимизирует стили, написанные на [Sass](https://sass-lang.com/), вместе с созданием sourcemaps для облегчения отладки.

```javascript
const compileStyles = () => {
	return gulp
		.src(paths.src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(
			rename({
				suffix: '.min'
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.build.css));
};
```

- **minifyHtml:** Минимизирует HTML-файлы, удаляя лишние пробелы и переносы строк.

```javascript
const minifyHtml = () => {
	return gulp
		.src(paths.src.html)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(inliner())
		.pipe(gulp.dest(paths.build.html));
};
```

- **optimizeImages:** Эта функция оптимизирует изображения, находящиеся в исходной директории, с помощью плагина [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin), который уменьшает размер изображений без потери качества.

```javascript
const optimizeImages = () => {
	return gulp
		.src(paths.src.img)
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest(paths.build.img));
};
```

- **concatJs:**: Собирает и объединяет JavaScript-файлы из указанных [исходных файлов,](https://github.com/adi1zhexen0v/alem-sharla-landing/tree/main/src/js/modules) используя Webpack.

```javascript
const concatJs = () => {
	return gulp
		.src(paths.src.js)
		.pipe(webpack(webpackOptions))
		.pipe(gulp.dest(paths.build.js));
};
```

## Взаимодействие с Firebase
В [файле](https://github.com/adi1zhexen0v/alem-sharla-landing/blob/main/src/js/services/firestore.js) мы храним функции, которые выполнеют операций с Firestore. Здесь пример отправки заявки в базу данных.
```javascript
import { firestore } from './firebase.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Определение ссылки на коллекцию 'feedback' в Firestore
const collectionRef = collection(firestore, 'feedback');

// Функция для добавления обратной связи в Firestore
export const addFeedback = async (name, contact, message) => {
	try {
		const feedbackData = {
			name,
			contact,
			message,
			createdAt: Timestamp.now()
		};
		await addDoc(collectionRef, feedbackData); // Добавляем данные в коллекцию 'feedback'
	} catch (error) {
		console.log('Ошибка: ', error);
	}
};
```

## Запуск команд

- `gulp build`: Выполняет сборку проекта, включая компиляцию стилей, минимизацию HTML, оптимизацию изображений и сборку JavaScript-файлов для продакшн-окружения.
- `gulp watch`: Отслеживает изменения в файлах HTML, SCSS, изображений и JavaScript в режиме реального времени, автоматически запуская соответствующие задачи для быстрого обновления собранных файлов в процессе разработки.
