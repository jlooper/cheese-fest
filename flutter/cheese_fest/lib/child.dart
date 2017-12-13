//
// Code liberally stole from Dart Example: https://github.com/flutter/flutter/blob/master/examples/flutter_gallery
//

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';


class _ProductItem extends StatelessWidget {
  const _ProductItem({
    Key key,
    @required this.name,
    @required this.description,
  }) :
        super(key: key);

  final String name;
  final String description;

  @override
  Widget build(BuildContext context) {
    return new Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        new Text(description),
        const SizedBox(height: 16.0),
      ],
    );
  }
}

class _HeadingLayout extends MultiChildLayoutDelegate {
  _HeadingLayout();

  static final String image = 'image';
  static final String product = 'product';


  @override
  void performLayout(Size size) {
    const double margin = 36.0;
    final bool landscape = size.width > size.height;
    final double imageWidth = (landscape ? size.width / 2.0 : size.width) - margin * 2.0;
    final BoxConstraints imageConstraints = new BoxConstraints(maxHeight: 224.0, maxWidth: imageWidth);
    final Size imageSize = layoutChild(image, imageConstraints);
    final double imageY = 0.0;
    positionChild(image, new Offset(margin, imageY));

    final double productWidth = landscape ? size.width / 2.0 : size.width - margin;
    final BoxConstraints productConstraints = new BoxConstraints(maxWidth: productWidth);
    final Size productSize = layoutChild(product, productConstraints);
    final double productX = landscape ? size.width / 2.0 : margin;
    final double productY = landscape ? 0.0 : imageY + imageSize.height + 16.0;
    positionChild(product, new Offset(productX, productY));

  }

  @override
  bool shouldRelayout(_HeadingLayout oldDelegate) => true;
}

class _Heading extends StatelessWidget {
  const _Heading({
    Key key,
    @required this.name,
    @required this.image,
    @required this.description

  }) : super(key: key);

  final String name;
  final String image;
  final String description;

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size;
    return new SizedBox(
      height: (screenSize.height - kToolbarHeight) * 1.35,
      child: new Material(
        type: MaterialType.card,
        elevation: 0.0,
        child: new Padding(
          padding: const EdgeInsets.only(left: 16.0, top: 18.0, right: 16.0, bottom: 24.0),
          child: new CustomMultiChildLayout(
            delegate: new _HeadingLayout(),
            children: <Widget>[
              new LayoutId(
                id: _HeadingLayout.image,
                child: new Hero(
                  tag: name,
                  child: new Image(
                      image: new NetworkImage(image),
                      fit: BoxFit.contain,
                      alignment: Alignment.center,),
                ),
              ),
              new LayoutId(
                id: _HeadingLayout.product,
                child: new _ProductItem(
                  name: name,
                  description: description
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ChildPage extends StatefulWidget {
  ChildPage({
    Key key,
    @required this.name,
    @required this.description,
    @required this.image,
  }) : super(key: key);

  final String name;
  final String description;
  final String image;

  @override
  _ChildPageState createState() => new _ChildPageState();
}

class _ChildPageState extends State<ChildPage> {
  GlobalKey<ScaffoldState> scaffoldKey;

  @override
  void initState() {
    super.initState();
    scaffoldKey = new GlobalKey<ScaffoldState>(debugLabel: 'Name ${widget.name}');
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
        title: new Text(widget.name),
    ),
      body: new CustomScrollView(
        slivers: <Widget>[
          new SliverToBoxAdapter(
            child: new _Heading(
              description: widget.description,
              name: widget.name,
              image: widget.image,
            ),
          ),
        ],
      ),
    );
  }
}

