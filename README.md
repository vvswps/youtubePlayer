# Youtube player

It's a simple player with youtube like page and controls based on a tutorial by "web dev simplified".

### Get the thumbnails from any video using ffmpeg

    ffmpeg -i input.mp4 -vf fps=1/10 out%d.png

Gets a thumbnail every 10s in the video and saves them as out1.png, out2.png, etc.

## TODO

    Get that thumbnail thingy to work
    Add a sidebar and a dummy comments section
    Maybe get the comments section to work 🥱

### Problems

    Controls disappear on fullscreen in firefox
    In chrome play/pause with click doesn't work as intended (it works in firefox)
