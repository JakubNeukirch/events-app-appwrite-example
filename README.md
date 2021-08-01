# events_app
AppWrite EventsApp example

## QuickStart

### Installation
To install AppWrite on your machine you need Docker.
Then just run the command below:
```shell
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:0.9.3
```

### FrontEnd
Interaction with AppWrite from frontend
```javascript
//appwrite-service.js
//installation 'npm install appwrite'
import {Appwrite} from "appwrite";

const client = new Appwrite()
client.setEndpoint("https://localhost/v1")
client.setProject("60eab38d9cf89")
const eventsCollectionId = '60eab4902f6b8'

export default {
    signIn(email, password) {
        return client.account.createSession(email, password)
    },
    addEvent(name, date){
        return client.database.createDocument(eventsCollectionId, {
            name: name,
            date: date
        })
    },
    loadEvents() {
        return client.database.listDocuments(eventsCollectionId)
    },
    deleteLast() {
        return client.functions.createExecution('60eabca93319d')
    }
}
```

### Functions
AppWrite function examples. [According to my small benchmark](https://twitter.com/Kubenqpl/status/1415704522484297730) - dart is much slower in execution (5s) than JavaScript (0.2s), so it is recommended to use JS.
#### Dart
pubspec.yaml
```yaml
dart_appwrite: ^0.4.0`
```

main.dart
```dart
import 'package:dart_appwrite/dart_appwrite.dart';

//inicjalizacja klienta AppWrite
final client = Client()
//adres instancji appwrite - ważne żeby adres był adresem sieci lokalnej a nie 'localhost'
    .setEndpoint("http://192.168.0.129/v1")
//Id projektu na którym pracujemy
    .setProject('60eab38d9cf89')
//to jest potrzebne jeśli nie mamy ustawione SSLa
    .setSelfSigned(status: true)
//Ustawienie API Key do naszego projektu
    .setKey(
        "bfbb89661910ba1d67e6681b6dedfafd5abb37ff8619a277f1d9e28b30740fbdd8e43a73dec467b71cebf5179b26bfc1401896e7b1c6c5d08f919f4e07e42009d888d8e9ae87579c539782e98326dd7a5df55a2ee50c98374bf75bc12bd4fd728e21a948f626bbfc852e58f3a6b40adaa0b0bd906d9b726e7f19c47c60e6a059");

//inicjalizacja modułu bazy danych w appwrite
final db = Database(client);

Future main() async {
  try {
    //zaciąganie listy wydarzeń
    final response = await db.listDocuments(
        collectionId: '60eab4902f6b8',
        limit: 1,
        orderType: OrderType.asc,
        orderField: 'date',
    );
    //wyciągnięcie listy dokumentów z response
    final document = response.data["documents"].toList()[0];
    //usunięcie najstarszego wydarzeń
    await db.deleteDocument(
        collectionId: '60eab4902f6b8',
        documentId: document["\$id"],
    );
    //wypisanie usuniętego dokumentu w celu sprawdzenia
    print("Document $document");
  } catch (error, st) {
    print(st.toString());
    print(error);
  }
}
```

#### Javascript
Example of function in Javascript - much faster than dart

index.js
```javascript
//Najpierw zainstalować tą bibliotekę https://www.npmjs.com/package/node-appwrite
//npm install node-appwrite --save
const sdk = require('node-appwrite');

let client = new sdk.Client();
client
    .setEndpoint("http://192.168.0.129/v1") // Your API Endpoint
    .setProject("60eab38d9cf89") // Your project ID available by default
    .setKey("bfbb89661910ba1d67e6681b6dedfafd5abb37ff8619a277f1d9e28b30740fbdd8e43a73dec467b71cebf5179b26bfc1401896e7b1c6c5d08f919f4e07e42009d888d8e9ae87579c539782e98326dd7a5df55a2ee50c98374bf75bc12bd4fd728e21a948f626bbfc852e58f3a6b40adaa0b0bd906d9b726e7f19c47c60e6a059") // Your secret API key


let db = new sdk.Database(client);
(async () => {
    let response = await db.listDocuments('60eab4902f6b8', null,1, null, 'date', "ASC", null, null);
    console.log(response)
    let document = response.documents[0];
    await db.deleteDocument('60eab4902f6b8', document["\$id"]);
    console.log(`Total files deleted: ${document}`);
})();
```