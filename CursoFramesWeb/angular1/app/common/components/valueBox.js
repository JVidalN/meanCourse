(function () {
  angular.module('primeiraApp').component('valueBox', {
    bindings: {
      grid: '@',
      colorClass: '@',
      value: '@',
      text: '@',
      iconClass: '@',
    },
    controller: [
      'gridSystem',
      function (gridSystem) {
        const vm = this;
        vm.$onInit = () => (vm.gridClasses = gridSystem.toCssClasses(vm.grid));
      },
    ],
    template: `
  <div class="{{ $ctrl.gridClasses }}">
    <div class="small-box {{ $ctrl.colorClass }}">
      <div class="inner">
        <h3>{{ $ctrl.value }}</h3>
        <p>{{ $ctrl.text }}</p>
      </div>
      <div class="icon">
        <i class="{{ $ctrl.iconClass }}"></i>
      </div>
    </div>
  </div>
  `,
  });
})();
