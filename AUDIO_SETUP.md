# 🎵 Audio Setup Guide

## Adding "Ahla Wahda" by Hussien Aljassmi

The sound button is now ready to play your favorite song! Follow these steps to add the audio file:

### Step 1: Obtain the Audio File
- Download "Ahla Wahda" by Hussien Aljassmi from your preferred source
- Popular options:
  - YouTube Music
  - Spotify
  - Apple Music
  - Deezer
  - Or any music streaming platform

### Step 2: Convert to Web-Compatible Format
The audio file should be in one of these formats:
- **MP3** (recommended - most compatible)
- WAV
- M4A
- OGG

If you have the file in a different format, you can use online converters:
- CloudConvert (cloudconvert.com)
- Freeconvert (freeconvert.com)
- Online-Convert (online-convert.com)

### Step 3: Add the File
1. Save the converted audio file as one of these names:
   - `ahla-wahda.mp3` (recommended)
   - `ahla-wahda.wav`
   - `ahla-wahda.m4a`

2. Place it in the `audio` folder:
   ```
   Banorita/
   ├── audio/
   │   └── ahla-wahda.mp3  ← Put your file here
   ├── index.html
   ├── styles-modern.css
   ├── script-enhanced.js
   └── ...
   ```

### Step 4: Update the Audio Path (if needed)
If your file has a different name, edit `script-enhanced.js`:

Find this line (around line 130):
```javascript
audioElement.src = 'audio/ahla-wahda.mp3';
```

Replace `ahla-wahda.mp3` with your filename. For example:
```javascript
audioElement.src = 'audio/my-song.wav';
```

### Step 5: Test It!
1. Reload the website
2. Click the sound button 🔊 in the top right
3. Enjoy the music!

## Audio Control Features
- **Click 🔊**: Play the song (button changes to 🔇)
- **Click 🔇**: Pause the song (button changes to 🔊)
- **Loop**: The song automatically loops when it ends
- **Volume**: Currently set to 50% (adjustable in the code if needed)

## Adjusting Volume
To change the volume, find this line in `script-enhanced.js`:
```javascript
audioElement.volume = 0.5;  // Change 0.5 to any value between 0 and 1
```

Examples:
- `0.3` = 30% volume (quiet)
- `0.5` = 50% volume (medium - current)
- `0.8` = 80% volume (loud)
- `1.0` = 100% volume (maximum)

## Troubleshooting

**"Audio file not found" message appears?**
- Make sure the file is in the `audio` folder
- Check that the filename matches exactly (including capitalization)
- Verify the file format is supported (MP3, WAV, M4A, OGG)

**Sound doesn't play?**
- Clear your browser cache (Ctrl+Shift+Delete)
- Try a different audio format
- Check browser console for errors (F12 → Console tab)

**Button click works but no sound?**
- Check that the audio file path is correct
- Verify the audio file isn't corrupted
- Try playing the file directly to confirm it works

## Legal Note
Make sure you have the right to use this audio file. If downloading from YouTube or other platforms, respect copyright laws and platform terms of service.

Enjoy! 🎵💕
