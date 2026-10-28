# InDesign Pasteboard Cleaner

An ExtendScript for Adobe InDesign that counts the objects on the pasteboard of the active document and deletes them after you confirm.

Video: https://youtu.be/py8SKEviq0Q
Written guide: https://www.linguist-coder.com/2026/04/scaling-multilingual-dtp-by-detecting.html

## Install

1. Download `CleanupPasteboardItems.jsx` from the [latest release](https://github.com/linguist-coder/indesign-pasteboard-cleaner/releases/latest).
2. In InDesign, open the Scripts panel (Window > Utilities > Scripts).
3. Right-click the User folder and choose Reveal in Explorer (Reveal in Finder on macOS).
4. Copy the file into that folder. It appears in the Scripts panel under User.

## Use

1. Open the document and make it the active one.
2. Double-click `CleanupPasteboardItems.jsx` in the Scripts panel.
3. The script shows `Found N pasteboard object(s). Delete them?`
   - No: nothing changes.
   - Yes: the objects are deleted and the script shows `Deleted N object(s).`
4. If no objects are found, it shows `No pasteboard objects were found.`

Work on a copy if you are not sure what is on the pasteboard. The script does not wrap the deletions in a single undo step.

## What counts as a pasteboard object

The script goes through `doc.allPageItems` and keeps an item when both checks pass:

1. `item.parentPage` is `null`.
2. The item's parent does not have a `parentPage` property. This skips items inside a group, so a group on the pasteboard counts as one object.

What we saw in our tests:

- Rectangles, text frames, ellipses and groups on the pasteboard (first and second spreads) were counted and deleted.
- Objects on the pasteboard of a parent page (master) spread were counted and deleted too.
- A frame that overlapped the right edge of a page had that page as its `parentPage`, so it was not counted. We only tested this one case.
- Anchored objects (in a frame on the page, and in overset text) were not counted.
- A locked object and an object on a locked layer were counted, but deleting them failed. The script reports these as `Failed to delete N object(s).` and leaves them in place.

## Tested with

Adobe InDesign 2026 (21.5) on Windows. Not tested on macOS.

## License

MIT. See [LICENSE](LICENSE).
