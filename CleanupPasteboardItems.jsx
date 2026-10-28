#target indesign

(function () {
    function isTopLevelPasteboardItem(item) {
        if (!item || !item.isValid) {
            return false;
        }

        if (item.parentPage !== null) {
            return false;
        }

        try {
            var parent = item.parent;

            // Avoid double-counting children inside groups or other containers.
            if (parent && parent.hasOwnProperty("parentPage")) {
                return false;
            }
        } catch (e) {}

        return true;
    }

    if (app.documents.length === 0) {
        alert("No documents are open.");
        return;
    }

    var doc = app.activeDocument;
    var pasteboardItems = [];

    var items = doc.allPageItems;

    for (var i = 0; i < items.length; i++) {
        try {
            if (isTopLevelPasteboardItem(items[i])) {
                pasteboardItems.push(items[i]);
            }
        } catch (e) {}
    }

    var count = pasteboardItems.length;

    if (count === 0) {
        alert("No pasteboard objects were found.");
        return;
    }

    var confirmDelete = confirm(
        "Found " + count + " pasteboard object(s).\n\nDelete them?"
    );

    if (!confirmDelete) return;

    var deletedCount = 0;
    var failedCount = 0;

    for (var j = pasteboardItems.length - 1; j >= 0; j--) {
        try {
            if (pasteboardItems[j].isValid) {
                pasteboardItems[j].remove();
                deletedCount++;
            }
        } catch (e) {
            failedCount++;
        }
    }

    if (failedCount > 0) {
        alert(
            "Deleted " + deletedCount + " object(s).\n" +
            "Failed to delete " + failedCount + " object(s)."
        );
        return;
    }

    alert("Deleted " + deletedCount + " object(s).");
})();
