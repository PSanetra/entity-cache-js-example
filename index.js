var entityCacheJs = require('entity-cache-js');

function Person(personId, motherId, fatherId, firstName, lastName, address)
{
    this.personId = personId;

    this.motherId = motherId;
    this.fatherId = fatherId;

    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
}

var personCache = new entityCacheJs.EntityCache('person', Person, 'personId');

personCache.addEntityCacheDependency(personCache, 'motherId', 'mother');
personCache.addEntityCacheDependency(personCache, 'fatherId', 'father');

personCache.updateOrInsert(new Person(1, 2, 3, 'John', 'Doe', { zip : '12345' }));
personCache.updateOrInsert(new Person(2, null, null, 'Julia', 'Joe'));
personCache.updateOrInsert(new Person(3, null, null, 'Johnson', 'Doe'));

var johnDoe = personCache.get(1);

//use mother reference
console.log("johnDoe.mother.firstName: " + johnDoe.mother.firstName); //prints Julia

//iterate over all entities
for(var i in personCache.entities)
{
    console.log(i + ": " + personCache.entities[i].firstName);
}


console.log("before update of johnDoe.address.zip: " + johnDoe.address.zip); //prints 12345

personCache.updateOrInsert({
    personId: 1,
    address : {
        zip : '98765'
    }
});

console.log("after update of johnDoe.address.zip: " + johnDoe.address.zip); //prints 98765