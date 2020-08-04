(function () {
  angular
    .module('primeiraApp')
    .controller('BillingCycleCtrl', [
      '$http',
      '$location',
      'msgs',
      'tabs',
      'consts',
      BillingCycleController,
    ]);

  function BillingCycleController($http, $location, msgs, tabs, consts) {
    const vm = this;

    vm.getBillingCycles = function () {
      const numberPerPage = 10;
      const page = parseInt($location.search().page) || 1;
      const url = `${consts.apiUrl}/billingCycles?skip=${
        (page - 1) * numberPerPage
      }&limit=${numberPerPage}`;

      $http.get(url).then(function (resp) {
        vm.billingCycles = resp.data;
        vm.billingCycle = {};
        initCreditsAndDebts();
        $http.get(`${consts.apiUrl}/billingCycles/count`).then(function (resp) {
          vm.pages = Math.ceil(resp.data.value / numberPerPage);
          tabs.show(vm, { tabList: true, tabCreate: true });
        });
      });
    };

    vm.createBillingCycle = function () {
      const url = `${consts.apiUrl}/billingCycles`;
      $http
        .post(url, vm.billingCycle)
        .then(function (response) {
          vm.billingCycle = {};
          initCreditsAndDebts();
          vm.getBillingCycles();
          msgs.addSuccess('Operação realizada com sucesso!!');
        })
        .catch(function (resp) {
          msgs.addError(resp.data.errors);
        });
    };

    vm.showTabUpdate = function (billingCycle) {
      vm.billingCycle = billingCycle;
      initCreditsAndDebts();
      tabs.show(vm, { tabUpdate: true });
    };

    vm.updateBillingCycle = function () {
      const url = `${consts.apiUrl}/billingCycles/${vm.billingCycle._id}`;
      $http
        .put(url, vm.billingCycle)
        .then(function (response) {
          vm.billingCycle = {};
          initCreditsAndDebts();
          vm.getBillingCycles();
          tabs.show(vm, { tabList: true, tabCreate: true });
          msgs.addSuccess('Operação realizada com sucesso!');
        })
        .catch(function (resp) {
          msgs.addError(resp.data.errors);
        });
    };

    vm.showTabDelete = function (billingCycle) {
      vm.billingCycle = billingCycle;
      initCreditsAndDebts();
      tabs.show(vm, { tabDelete: true });
    };

    vm.deleteBillingCycle = function () {
      const url = `${consts.apiUrl}/billingCycles/${vm.billingCycle._id}`;
      $http
        .delete(url, vm.billingCycle)
        .then(function (response) {
          vm.billingCycle = {};
          initCreditsAndDebts();
          vm.getBillingCycles();
          tabs.show(vm, { tabList: true, tabCreate: true });
          msgs.addSuccess('Operação realizada com sucesso!');
        })
        .catch(function (resp) {
          msgs.addError(resp.data);
        });
    };

    vm.addDebt = function (index) {
      vm.billingCycle.debts.splice(index + 1, 0, {});
    };

    vm.cloneDebt = function (index, { name, value, status }) {
      vm.billingCycle.debts.splice(index + 1, 0, { name, value, status });
      initCreditsAndDebts();
    };

    vm.deleteDebt = function (index) {
      vm.billingCycle.debts.splice(index, 1);
      initCreditsAndDebts();
    };

    vm.addCredit = function (index) {
      vm.billingCycle.credits.splice(index + 1, 0, { name: null, value: null });
    };

    vm.cloneCredit = function (index, { name, value }) {
      vm.billingCycle.credits.splice(index + 1, 0, { name, value });
      initCreditsAndDebts();
    };

    vm.deleteCredit = function (index) {
      vm.billingCycle.credits.splice(index, 1);
      initCreditsAndDebts();
    };

    vm.cancel = function () {
      tabs.show(vm, { tabList: true, tabCreate: true });
      vm.billingCycle = {};
      initCreditsAndDebts();
    };

    vm.calculateValues = function () {
      vm.credit = 0;
      vm.debt = 0;

      if (vm.billingCycle) {
        vm.billingCycle.credits.forEach(function ({ value }) {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
        });

        vm.billingCycle.debts.forEach(function ({ value }) {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
        });
      }

      vm.total = vm.credit - vm.debt;
    };

    var initCreditsAndDebts = function () {
      if (!vm.billingCycle.debts || !vm.billingCycle.debts.length) {
        vm.billingCycle.debts = [];
        vm.billingCycle.debts.push({});
      }

      if (!vm.billingCycle.credits || !vm.billingCycle.credits.length) {
        vm.billingCycle.credits = [];
        vm.billingCycle.credits.push({});
      }

      vm.calculateValues();
    };

    vm.getBillingCycles();
  }
})();
