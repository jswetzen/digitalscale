var module = angular.module('DigiScale', ['ngTouch']);

module.directive('clearOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('touchstart click', function () {
                this.value = '';
            });
        }
    };
});

module.directive('cursorEndOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('touchstart click', function () {
              this.focus(); //sets focus to element
              var val = this.value; //store the value of the element
              this.value = ''; //clear the value of the element
              this.value = val; //set that value back.
            });
        }
    };
});

module.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
                items: '=',
                prompt:'@',
                title: '@',
                subtitle:'@',
                model: '=',
                onSelect:'&'
        },
        link:function(scope,elem,attrs){
               scope.handleSelection=function(selectedItem){
                     scope.model=selectedItem;
                     scope.current=0;
                     scope.selected=true;
                     $timeout(function(){
                         scope.onSelect();
                      },200);
              };
              scope.current=0;
              scope.selected=true;
              scope.isCurrent=function(index){
                 return scope.current==index;
              };
              scope.setCurrent=function(index){
                 scope.current=index;
              };
        },
        /*templateUrl: 'templates/templateurl.html'*/
        template: '<input type="text" ng-model="model" placeholder="{{prompt}}" ng-keydown="selected=false" cursor-end-on-click /> <br/> <div class="items" ng-hide="!model.length || selected"> <div class="item" ng-repeat="item in items | filter:model" ng-click="handleSelection(item)" style="cursor:pointer" ng-class="{active:isCurrent(item)}" ng-mouseenter="setCurrent(item)"> <p class="title">{{item}}</p></div> </div>'
  };
});

function DigiScaleCtrl($scope) {
  $scope.weight = 0;
  $scope.volume = 0;
  $scope.ingredient = "";

  // Vara och gram per ml
  $scope.items = {
    //Mjöl
    "Blandmjöl": 0.525,
    "Bovetemjöl": 0.6,
    "Grahamsmjöl": 0.6,
    "Kornmjöl": 0.525,
    "Kruskakli": 0.2,
    "Majzena": 0.55,
    "Potatismjöl": 0.8,
    "Rågsikt": 0.55,
    "Rågmjöl, gammaldags": 0.6,
    "Rågmjöl, grovt": 0.55,
    "Rågmjöl, fint": 0.5,
    "Vetemjöl": 0.625,
    //Gryn
    "Havregryn": 0.375,
    "Mannagryn": 0.7,
    "Korngryn": 0.7,
    "Ris, långkornigt": 0.8,
    "Ris, rundkornigt": 0.9,
    "Råris": 0.9,
    //Mjölkprodukter
    "Keso": 1,
    "Mjölkpulver": 0.5,
    "Ost": 0.375,
    // Socker/sirap/honung
    "Farinsocker": 0.7,
    "Florsocker": 0.6,
    "Honung": 1.2,
    "Pärlsocker": 0.6,
    "Sirap": 1.4,
    "Strösocker": 0.85,
    "Vaniljsocker": 0.55,
    //Matfett
    "Smör eller margarin, fast": 0.95,
    "Smör eller margarin, smält": 0.9,
    "Olja": 0.9,
    //Bär
    "Björnbär": 0.7,
    "Blåbär": 0.7,
    "Hallon": 0.7,
    "Jordgubbar": 0.5,
    "Krusbär": 0.6,
    "Körsbär": 0.6,
    "Lingon": 0.6,
    "Vinbär": 0.64,
    "Plommon": 0.75,
    //Övrigt
    "Bönor , torkade": 0.75,
    "Ärtor, torkade": 0.75,
    "Hasselnötskärnor": 0.65,
    "Kakao": 0.40,
    "Kokos, riven": 0.35,
    "Linfrö, hela": 0.65,
    "Sötmandel": 0.65,
    "Bittermandel": 0.65,
    "Nötkärnor": 0.65,
    "Mandelspån": 0.3,
    "Russin, kärnfria": 0.6,
    "Salt, fint": 0.125,
    "Salt, grovt": 0.95,
    "Sojaprotein, pulver": 0.35,
    "Ströbröd": 0.5,
    "Valnötskärnor": 0.40
  };
  $scope.itemNames = Object.keys($scope.items);

  $scope.conversion = function() {
    return $scope.items[$scope.ingredient];
  };

  $scope.setWeightChanged = function() {
    $scope.lastFieldChanged = 'weight';
    alert('weight last changed');
    $scope.updateConversion();
  };
  $scope.setVolumeChanged = function() {
    $scope.lastFieldChanged = 'volume';
    alert('volume last changed');
    $scope.updateConversion();
  };

  $scope.updateConversion = function() {
    switch ($scope.lastFieldChanged) {
      case 'weight':
        $scope.volume = Math.round(($scope.weight/($scope.conversion()*100))*100)/100;
        break;
      case 'volume':
        $scope.weight = Math.round(($scope.volume*($scope.conversion()*100))*100)/100;
        break;
      default:
        $scope.weight = Math.round(($scope.volume*($scope.conversion()*100))*100)/100;
    }
  };

  $scope.onItemSelected = function() {
    $scope.updateConversion();
  };
}

function setCursorEnd(elem) {
  elem.focus(); //sets focus to element
  var val = elem.value; //store the value of the element
  elem.value = ''; //clear the value of the element
  elem.value = val; //set that value back.
}
