angular.module( "Starship" )
  .service( "starshipService", function( $http , $q ) {
      var baseUrl = "http://swapi.co/api/";
      var nextPageUrl = null;

      this.getCharacters = function() {
        return $http
                    .get( baseUrl + "people" )
                    .then( function( people ) {
                      nextPageUrl = people.data.next;
                      return people;
                    } );
      }

      this.getStarships = function( urlArray ) {
        console.log( "top of getstarships in service" );
        // Need to have this first.
        var dfd = $q.defer();
        var starshipArray = [];

        for ( var i = 0; i < urlArray.length; i++ ) {
          $http.get( urlArray[ i ] ).then( function( starships ) {
            console.log( "inside .then service" );
            starshipArray.push( starships.data );

            if ( starshipArray.length === urlArray.length ) {
              dfd.resolve( starshipArray );
            }
          } );
        }
        // Make this promise at the end so that it loops through it all first!
        return dfd.promise;
      }

      this.getNextPage = function() {
          return $http
                      .get( nextPageUrl )
                      .then( function( people ) {
                        nextPageUrl = people.data.next;
                        return people;
                      } );
      }

  } );
