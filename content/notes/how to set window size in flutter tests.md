---
id: d5301f90-a3bd-11ec-88d6-ef8182bb665f
title: how to set window size in flutter tests
notetype: feed
date: 2022-03-14
---
```
void main() {

  final TestWidgetsFlutterBinding binding =
    TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets("Basic layout test (mobile device)", (tester) async {
    binding.window.physicalSizeTestValue = Size(400, 200);
    binding.window.devicePixelRatioTestValue = 1.0;

    await tester.pumpWidget(new MyApp());

    expect(find.byType(MyHomePage), findsOneWidget);
    // etc.
  });
}
```

---

https://stackoverflow.com/questions/53706569/how-to-test-flutter-widgets-on-different-screen-sizes