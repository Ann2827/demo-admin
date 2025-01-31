const TYPE_PAGE = 'page';
const TYPE_COMPONENT = 'component';
const PATH_PAGE = 'src/pages';
const PATH_COMPONENT = 'src/components';
const PATH_MODULE = 'src/modules';
const PATH_CUSTOM = 'custom';

const pageGenerator = {
  description: 'Creating a new page',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Выберите тип добавляемой дерриктории:',
      choices: [TYPE_PAGE, TYPE_COMPONENT],
      default: TYPE_PAGE,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Укажите название дирректории:',
      default: 'AddPhone',
    },
    {
      type: 'list',
      name: 'path',
      message: 'Дирректория будет добавлена по пути:',
      choices: [PATH_PAGE, PATH_COMPONENT, PATH_MODULE, PATH_CUSTOM],
      default: TYPE_PAGE,
    },
    {
      type: 'input',
      name: 'customPath',
      message: 'Введите путь дерриктории:',
      default: 'src/',
      when(answers) {
        return answers.path === PATH_CUSTOM;
      },
    },
  ],
  actions: ({ type = TYPE_PAGE, path = TYPE_PAGE, customPath = '' }) => {
    let dirPath = customPath || path;

    // Слэш в конце всегда убирается что бы избежать ошибок
    dirPath = dirPath.replace(/(.*)(\/)$/, (_, pathWithoutEndSlash) => pathWithoutEndSlash);

    const actions = [
      // copy files
      {
        type: 'add',
        path: `../${dirPath}/{{ name }}/index.ts`,
        templateFile: `./${type}/index.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../${dirPath}/{{ name }}/{{ name }}.tsx`,
        templateFile: `./${type}/${type}Name.tsx.hbs`,
        abortOnFail: true,
      },
    ];

    if (type === TYPE_COMPONENT) {
      actions.push({
        type: 'add',
        path: `../${dirPath}/{{ name }}/{{name}}.types.ts`,
        templateFile: `./${type}/${type}Name.types.ts.hbs`,
        abortOnFail: true,
      });
    }

    return actions;
  },
};

module.exports = (plop) => {
  plop.setGenerator('page', pageGenerator);
};
