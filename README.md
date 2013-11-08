Shinybox
================================

A touchable jQuery lightbox.

[View project page](http://one-com.github.io/shinybox/)

##What is Shinybox ?

shinybox is a jQuery "lightbox" plugin for desktop, mobile and tablet.

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

Include jquery and the shinybox script in your head tags or right before your body closing tag.

```html
<script src="lib/jquery-1.9.0.js"></script>
<script src="source/jquery.shinybox.js"></script>
```

###CSS

Include the shinybox CSS style in your head tags.

```html
<link rel="stylesheet" href="source/shinybox.css">
```

###HTML

Use a specific class for your links and use the title attribute as caption.

```html
<a href="big/image.jpg" class="shinybox" title="My Caption">
```

###Fire the plugin

Bind the shinybox behaviour on every link with the "shinybox" class.

```javascript
$(".shinybox").shinybox();
```

###Options

```javascript
useCSS : true, // false will force the use of jQuery for animations
initialIndexOnArray: 0, // which image index to init when a array is passed
hideBarsDelay : 3000, // 0 to always show caption and action bar
videoMaxWidth : 1140, // videos max width
beforeOpen: function(){} , // called before opening
afterClose: function(){} // called after closing
```

####Credits
Photos by [Daniele Zedda](http://www.flickr.com/photos/astragony/)
Based on [Swipebox](http://brutaldesign.github.com/swipebox)
