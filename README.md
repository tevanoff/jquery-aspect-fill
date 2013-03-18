# jQuery AspectFill plugin

The jQuery AspectFill plugin is designed to scale an image to completely fill its container.

The image will be hidden, scaled to completely fill its container, centered in that container, and then faded in. 

Unless the image has the exact aspect ratio of its container, it will be cropped in one dimension. But that's the point. 

## Requirements

jQuery, of course!

## Usage

All you need is an image inside of a container, like so:

```
<div class="image-box">
  <img class="aspect-fill" src="/some/image.jpg" />
</div>
```

Make sure you have a size set for the image container:

```
.image-box {
  width: 50px;
  height: 75px;
}
```

Call aspectFill on the image:

```
$('.aspect-fill').aspectFill();
```

And the image will be scaled to fill its immediate container, and then centered within it.
