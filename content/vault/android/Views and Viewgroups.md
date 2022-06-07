#cs240 #android
![[Viewgroups image.png]]
- A viewgroup can be something like LinearLayout, or FrameLayout
- Otherwise known as Layouts and Layout Managers
- `layout_*`  is an attribute in a view that communicates to the parent viewgroup how it wants to be layed out.
	- `layout_width`
	- `layout_height`
	- can be in px, in, mm, dp, match_parent, or wrap_content
	- `layout_weight` can give each item a proportion of how big it'll be, in a LinearLayout. GridLayout is similar but in 2 dimensions.
	- RelativeLayout is my preferred layout. You describe it's position relative to another. 
	- FrameLayout is for any dynamically added object (fragments or widgets)
