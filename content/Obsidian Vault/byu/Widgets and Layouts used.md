#cs240 

Layouts
http://developer.android.com/guide/topics/ui/declaring-layout.html
Child views have “layout_*” attributes that specify how the containing layout should arrange them (see layoutparams.png)
Universal layout attributes: 
layout_width, layout_height
wrap_content, match_parent
specific values (e.g., 30dp)
LinearLayout
    orientation
    LinearLayout.LayoutParams:
    https://developer.android.com/reference/android/widget/LinearLayout.LayoutParams.html
RelativeLayout
    RelativeLayout.LayoutParams:
https://developer.android.com/reference/android/widget/RelativeLayout.LayoutParams.html
GridLayout
    rowCount, columnCount
    GridLayout.LayoutParams:
https://developer.android.com/reference/android/widget/GridLayout.LayoutParams.html
FrameLayout
    Used as placeholder for dynamically created fragments
    FrameLayout.LayoutParams:
https://developer.android.com/reference/android/widget/FrameLayout.LayoutParams.html
Layout Exercises
How would you create the following layouts (widgets and layouts)?  [Widgets used are listed below]
Login Fragment
Map Fragment
Main Activity
Person Activity
Map Activity
Widgets / Atrributes / Events
http://developer.android.com/guide/topics/ui/controls.html
TextView (text labels)
    text, textAppearance
    .setClickable(boolean) – make clickable
    .setOnClickListener(View.OnClickListener)
EditText (text fields)
    inputType, ems
    .addTextChangedListener(TextWatcher)
Space (blank space)
    set layout_width and layout_height to specific values (e.g., 30dp)
Button
    text
    .setOnClickListener(View.OnClickListener)
ImageView (display image)
    .setClickable(boolean) – make clickable
    .setImageDrawable(IconDrawable) – set icon to display
    .setOnClickListener(View.OnClickListener)
Switch (on/off)
    .setChecked(boolean) – set check state
    .setOnCheckedChangeListener(CompoundButton.OnCheckedChangeListener)
Spinner (dropdown list)
    .setAdapter(ArrayAdapter) – specify list values
    .setSelection(int) – specify selected item
    onItemSelectedListener(AdapterView.OnItemSelectedListener)
SearchView
    .setFocusable(boolean) – accept key focus
    .setIconified(boolean) – make always visible
    .requestFocusFromTouch() – request focus when touched
    .setOnQueryTextListener(SearchView.OnQueryTextListener)
ScrollView
    Wrap around any view to make it scrollable
RecyclerView
    Dynamic lists of items
* ListView / ExpandableListView
