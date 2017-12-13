
import 'package:flutter/material.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'child.dart';

final reference = FirebaseDatabase.instance.reference().child('Cheeses');

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Cheeses',
      theme: new ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or press Run > Flutter Hot Reload in IntelliJ). Notice that the
        // counter didn't reset back to zero; the application is not restarted.
        primarySwatch: Colors.yellow,
      ),
      home: new MyHomePage(title: 'Cheeses'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: new Text(widget.title),
        ),
        body: new Column(children: <Widget>[
          new Flexible(
            child: new FirebaseAnimatedList(
              query: reference,
              sort: (a, b) => b.key.compareTo(a.key),
              padding: new EdgeInsets.all(8.0),
              reverse: false,
              itemBuilder: (_, DataSnapshot snapshot,
                  Animation<double> animation) {
                return new CheeseBox(
                    snapshot: snapshot,
                    animation: animation
                );
              },
            ),
          )
        ]
        ));
  }
}


@override
class CheeseBox extends StatelessWidget {
  CheeseBox({this.snapshot, this.animation});
  final DataSnapshot snapshot;
  final Animation animation;

  Widget build(BuildContext context) {
    return new SizeTransition(
      sizeFactor: new CurvedAnimation(
          parent: animation, curve: Curves.easeOut),
      axisAlignment: 0.0,
      child: new Container(

        margin: const EdgeInsets.symmetric(vertical: 10.0),
        child: new InkWell(
          onTap: () {
            print(snapshot.value);

          Navigator.push(context, new MaterialPageRoute(
              builder: (_) => new ChildPage(image: snapshot.value['Image'], description: snapshot.value['Description'], name: snapshot.value['Name']),
          ));
          },
          child: new Row(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: <Widget>[
            new Container(
              margin: const EdgeInsets.only(right: 16.0),
              child: new Hero(
                tag: snapshot.value['Name'],
                  child: new Image(image: new NetworkImage(snapshot.value['Image']), width: 50.0)
              ),
            ),
           new Expanded(
              child: new Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  new Text(
                      snapshot.value['Name'],
                      style: Theme.of(context).textTheme.subhead),
                ],
              ),
            //),
            ),

          ],
        ),
      ),
      ),
    );
  }
}

