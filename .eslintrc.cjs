require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'eslint-config-airbnb-base',
    'plugin:vue-scoped-css/base',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    strict: ['error', 'never'],
    camelcase: 0, //强制驼峰法命名
    'default-param-last': 1, // 函数参数默认值应该放在后面
    'dot-notation': 0, // 禁止不必要的方括号符号
    'no-console': 0, //不禁用console
    'no-debugger': 2, //禁用debugger
    'no-var': 1, //对var警告
    'no-class-assign': 2, //禁止给类赋值
    'no-lone-blocks': 0, //禁止不必要的嵌套块
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-trailing-spaces': 1, //一行结束后面有空格就发出警告
    'no-underscore-dangle': 0, //标识符不能以_开头或结尾
    'no-invalid-this': 0, //禁止无效的this，只能用在构造器，类，对象字面量
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-this-before-super': 0, //在调用super()之前不能使用this或super
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, // 禁止重复的 case 标签
    'no-label-var': 2, // 不允许标签与变量同名
    'no-extra-parens': 0, // 禁止不必要的括号 //(a * b) + c;//报错
    'no-catch-shadow': 0, // 禁止 catch 子句的参数与外层作用域中的变量同名
    'no-shadow': 0, // 禁止 var 声明 与外层作用域的变量同名
    'no-bitwise': 0, // 禁用按位运算符
    'no-continue': 0, // 禁用 continue 语句
    'no-inline-comments': 0, // 禁止在代码行后使用内联注释
    'no-lonely-if': 0, // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-negated-condition': 0, // 不允许否定的表达式
    'no-nested-ternary': 0, // 不允许使用嵌套的三元表达式
    'no-plusplus': 0, // 禁止使用一元操作符 ++ 和 --
    'no-ternary': 0, // 不允许使用三元操作符
    'no-use-before-define': 0, //禁止在定义前使用
    'no-param-reassign': 0, //禁止对函数参数再赋值
    'func-names': 0, // 强制使用命名的 function 表达式
    'jsx-quotes': 0, // 强制在 JSX 属性中一致地使用双引号或单引号
    'prefer-const': 0, // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-reflect': 0, // 要求在合适的地方使用 Reflect 方法
    'prefer-spread': 0, // 要求使用扩展运算符而非 .apply()
    'generator-star-spacing': 0, //强制 generator *号单独
    'function-paren-newline': 0, //强制在函数括号内使用一致的换行
    'sort-imports': 0, //导入排序
    'class-methods-use-this': 0, // 强制class使用this // 因为AxiosCancel必须实例化而能静态化所以加的规则，如果有办法解决可以取消
    'no-confusing-arrow': 0, //禁止可能与比较混淆的箭头函数
    'linebreak-style': 0, //强制使用一致的换行符风格
    'no-prototype-builtins': 0, //禁止直接使用 Object.prototypes 的内置属性 //限制性太强
    'prefer-destructuring': [
      1,
      {
        array: false,
      },
    ],
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',

    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 0, // 当只有有个模块导出时，使用默认导出而不是用命名导出
    'import/first': 'off', // https://github.com/vuejs/vue-eslint-parser/issues/58
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/first-attribute-linebreak': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/component-name-in-template-casing': [2, 'kebab-case'],
        'vue/require-default-prop': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-reserved-props': 0,
        'vue/no-v-html': 0,
        'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped'] }],
      },
    },
    {
      files: ['*.ts', '*.tsx'], // https://github.com/typescript-eslint eslint-recommended
      rules: {
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(2588)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': 'error', // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)
      },
    },
  ],
};
