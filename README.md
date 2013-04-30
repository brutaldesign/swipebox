Swipebox
================================

A touchable jQuery lightbox.

[View project page](http://brutaldesign.github.com/swipebox)

##What is Swipebox ?

Swipebox is a jQuery "lightbox" plugin for desktop, mobile and tablet.

##Features

- Swipe gestures for mobile
- Keyboard Navigation for desktop
- CSS transitions with jQuery fallback
- Retina support for UI icons
- Easy CSS customization

###Compatibility

Chrome, Safari, Firefox, Opera, IE8+, IOS4+, Android, windows phone.

##Usage

###Javascript

Include jquery and the swipebox script in your head tags or right before your body closing tag.

`<script src="lib/jquery-1.9.0.js"></script>`

`<script src="source/jquery.swipebox.min.js"></script>`

###CSS

Include the swipebox CSS style in your head tags.

`<link rel="stylesheet" href="source/swipebox.css">`

###HTML

Use a specific class for your links and use the title attribute as caption.

`<a href="big/image.jpg" class="swipebox" title="My Caption">`

###Fire the plugin

Bind the swipebox behaviour on every link with the "swipebox" class.

`$(".swipebox").swipebox();`

###Pass slides via array

Launch slides viewer dynamically.

`$.swipebox([{href:'big/image.jpg', title:'My Caption'}, ...], options);`

###Need a couple of options?

`useCSS : true, // false will force the use of jQuery for animations`
`hideBarsDelay : 3000 // 0 to always show caption and action bar`
`beforeOpen : function(){} // called before opening slides`
`afterClose : function(){} // called after closing slides`

###Check if slides are open

`if ($.swipebox.isOpen) ...`
