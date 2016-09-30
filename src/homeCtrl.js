angular.module( "Starship" )
  .controller( "homeCtrl" , function( $scope, starshipService ) {
    //$scope.test = "Hello!"
    $scope.people = [];
    $scope.starships = [];


    $scope.getPeople = function() {
      starshipService.getCharacters()
      .then( function( people ) {
        //console.log( people );
          $scope.people = people.data.results;
          console.log( people.data );
      } );
    }
    $scope.getPeople();

    $scope.getStarships = function( urlArray ) {
      console.log( "inside of homeCtrl.getStarships" );
      $scope.starships = [];
      starshipService.getStarships( urlArray )
        .then ( function( starships ){
          console.log( "inside of homeCtrl .then" );
          //console.log( starship );
          $scope.starships = starships;
    });
    }

    $scope.getNextPage = function() {
      starshipService.getNextPage()
      .then( function( people ) {
        $scope.people = people.data.results;
      });
    }

  });
