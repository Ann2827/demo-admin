# demo-admin

Demo admin @ react

## Links

- Front site - <https://ann2827.github.io/demo-admin/index.html>
- Example api enpoints - <https://http.hexlet.app/http-api-openapi#>

## System requirements

- node v22.9.0
- npm 11.0.0

## Runbook

### First local start

1. Скопировать `.env.example` -> `.env` и подставить свои данные.
2. Выполнить в репозитории `npm ci`

### Local development

1. Запустить фронт одной из команд:
   - `npm run dev` - запуск с запросами к api
   - `npm run dev:mock` - изолированный запуск приложения

- `npm run preview` - предпоказ сборки для прода
- `npm run lint:fix` - привести в порядок стиль кода

### CI Build

1. Выполнить `npm ci`
2. Прогнать линтеры `npm run lint`
3. Выполнить сборку `npm run build`

## Contribution

Перед отправкой коммита не забывайте прогнать комманду `npm run precommit`, чтобы убедиться в работоспособности новой версии.

### Branches

- main - основная ветка
- feat/[any_name] - ветки фитчей для сливания в main

## Documentations

### Создание новой директории страницы/компонента/модуля

Для усокрения процесса разработки можно воспользоваться готовыми шаблонами.
Запустите `npm run plop` и следйте инструкциям в консоли.

### Комментарии

- // TODO: Опишите, что необходимо сделать в будущем.
- // CRUTCH: Неочевидная/запутанная реализация, но из-за внешних обстоятельств иначе нельзя. Опишите, почему пришлось сделать так.
- // FIXME: Грязная реализация на скорую руку. Опишите, что нужно сделать для чистого варианта и каков он должен быть.

### Названия

- Name.styled.ts
- Name.types.ts

### Архитектурные особенности репозитория

- api -
- assets -
- components - Воспринимайте компонент - как отдельный модуль. Компонент должно быть легко перенести в другую директорию. Допустимы импорты из '@mui/material', 'react' и '@/utils'. Все остальное передается через props, включая тексты и данные из общего хранилища. Если требуется более сильная привязка к репозиторию, то переносите компонент в модуль.
- constants -
- hooks -
- locales -
- modules -
- navigation -
- pages -
- types -
- utils -
- validation -
