(function () {
  angular
    .module('primeiraApp')
    .constant('consts', {
      appName: 'MEAN - Primeira Aplicação',
      version: '1.0',
      owner: 'JVidalN',
      year: 2020, //new Date().getFullYear(),
      site: 'http://https://github.com/JVidalN.com.br',
      apiUrl: 'http://localhost:3003/api',
      oapiUrl: 'http://localhost:3003/oapi',
      userKey: '_primeira_app_user',
    })
    .run([
      '$rootScope',
      'consts',
      function ($rootScope, consts) {
        $rootScope.consts = consts;
      },
    ]);
})();
