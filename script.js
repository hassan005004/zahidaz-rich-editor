$.fn.azeditor = function() {
  // Iterate over each textarea in the jQuery collection
  this.each(function() {
    // Convert each textarea to your custom HTML editor

    var textarea = $(this);
    var nameArrribute = $(this).attr('name');
    
    // Your conversion logic here
    var customEditor = $(`
<div class="container mt-3 pt-2 pb-3" id="az-editor-container">
  <div class="btn-toolbar btn-toolbar-first mb-0" role="toolbar">
    <!-- File dropdown -->
    <div class="btn-group">
      <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        File
      </button>
      <div class="dropdown-menu dropdown-menu-lg">
        <a class="dropdown-item" href="#" onclick="newDocument()"><i class="fas fa-file-alt"></i> New Document</a>
          <a class="dropdown-item" href="#" onclick="previewDocument()"><i class="fas fa-eye"></i> Preview</a>
          <a class="dropdown-item clearfix" href="#" onclick="printDocument()">
          <span class="float-start"><i class="fas fa-print"></i> Print</span>
          <span class="float-end">Ctrl+P</span>
        </a>
      </div>
    </div>

    <!-- Edit dropdown -->
    <div class="btn-group">
      <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Edit
      </button>
      <div class="dropdown-menu dropdown-menu-lg">
        <a class="dropdown-item" href="#" onclick="execCommand('undo')"><i class="fas fa-undo"></i> Undo</a>
        <a class="dropdown-item" href="#" onclick="execCommand('redo')"><i class="fas fa-redo"></i> Redo</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item clearfix" href="#" onclick="execCommand('copy')">
          <span class="float-start"><i class="fas fa-copy"></i> Copy</span>
          <span class="float-end shortcut-key">Ctrl+C</span>
        </a>
        <a class="dropdown-item clearfix" href="#" onclick="execCommand('cut')">
          <span class="float-start"><i class="fas fa-cut"></i> Cut</span>
          <span class="float-end shortcut-key">Ctrl+X</span>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item clearfix" href="#" onclick="notSupportCommand()">
          <span class="float-start"><i class="fas fa-paste"></i> Paste</span>
          <span class="float-end shortcut-key">Ctrl+V</span>
        </a>
        <a class="dropdown-item clearfix" href="#" onclick="notSupportCommand()">
          <span class="float-start"><i class="fas fa-paste"></i> Paste Text</span>
          <span class="float-end shortcut-key">Ctrl+SHIFT+V</span>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item clearfix" href="#" onclick="execCommand('selectAll')">
          <span class="float-start"><i class="fas fa-mouse-pointer"></i> Select All</span>
          <span class="float-end shortcut-key">Ctrl+A</span>
        </a>
        <!--a class="dropdown-item" href="#"><i class="fas fa-search"></i> Find and Replace</a-->
      </div>
    </div>

    <!-- View dropdown -->
    <div class="btn-group">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        View
      </button>
      <div class="dropdown-menu dropdown-menu-lg">
        <a class="dropdown-item" href="#" onclick="toggleContent()" id="viewWhichMode">
          <i class="fas fa-code"></i> Source
        </a>
        <a class="dropdown-item" href="#" onclick="toggleSourceView()"><i class="fas fa-eye"></i> Source Preview</a>
        <!--a class="dropdown-item" href="#"><i class="fas fa-eye"></i> Preview</a-->
      </div>
    </div>

    <!-- Insert dropdown -->
    <div class="btn-group">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Insert
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#linkModal"><i class="fas fa-link"></i> Link</a>
        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#imageModal"><i class="fas fa-image"></i> Image</a>
        <!--a class="dropdown-item" href="#"><i class="fas fa-film"></i> Media</a-->
        <!--a class="dropdown-item" href="#"><i class="fas fa-table"></i> Table</a-->
        <!--a class="dropdown-item" href="#"><i class="fas fa-star"></i> Special Character</a-->
        <a class="dropdown-item" href="#" onclick="insertHorizontalLine()"><i class="fas fa-minus"></i> Horizontal Line</a>
        <!--a class="dropdown-item" href="#"><i class="fas fa-user"></i> Author</a-->
        <!--a class="dropdown-item" href="#"><i class="fas fa-calendar-alt"></i> Datetime</a-->
      </div>
    </div>

    <!-- Format dropdown -->
    <div class="btn-group">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Format
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" onclick="execCommand('bold')"><i class="fas fa-bold"></i> Bold</a>
        <a class="dropdown-item" href="#" onclick="execCommand('italic')"><i class="fas fa-italic"></i> Italic</a>
        <a class="dropdown-item" href="#" onclick="execCommand('underline')"><i class="fas fa-underline"></i> Underline</a>
        <a class="dropdown-item" href="#" onclick="toggleSuperscript()"><i class="fas fa-superscript"></i> Superscript</a>
        <a class="dropdown-item" href="#" onclick="toggleSubscript()"><i class="fas fa-subscript"></i> Subscript</a>
        <a class="dropdown-item" href="#" onclick="execCommand('strikeThrough')"><i class="fas fa-strikethrough"></i> Strikethrough</a>
        <!--a class="dropdown-item" href="#" onclick="ccc()"><i class="fas fa-eraser"></i> Clear Format</a-->					
      </div>
    </div>

    <!-- Table dropdown -->
    <!--div class="btn-group">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Tools
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#"><i class="fas fa-table"></i> Table</a>
        <a class="dropdown-item" href="#"><i class="fas fa-table-row"></i> Row</a>
        <a class="dropdown-item" href="#"><i class="fas fa-table-column"></i> Column</a>
        <a class="dropdown-item" href="#"><i class="fas fa-table-cell"></i> Cell</a>
      </div>
    </div-->

    <!-- About us -->
    <div class="btn-group">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="modal" data-bs-target="#aboutUsModal">
        About Us
      </button>
    </div>
  </div>
    
  <div class="btn-toolbar mb-2" role="toolbar">
    <div class="btn-group me-2">
      <button type="button" class="btn btn-light" onclick="execCommand('undo')"><i class="fas fa-undo"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('redo')"><i class="fas fa-redo"></i></button>
    </div>

    <div class="btn-group me-2">
      <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Font Size
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" onclick="applyHeading('p')">Paragraph</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" onclick="applyHeading('h1')"><h1>Heading 1</h1></a>
        <a class="dropdown-item" href="#" onclick="applyHeading('h2')"><h2>Heading 2</h2></a>
        <a class="dropdown-item" href="#" onclick="applyHeading('h3')"><h3>Heading 3</h3></a>
        <a class="dropdown-item" href="#" onclick="applyHeading('h4')"><h4>Heading 4</h4></a>
        <a class="dropdown-item" href="#" onclick="applyHeading('h5')"><h5>Heading 5</h5></a>
        <a class="dropdown-item" href="#" onclick="applyHeading('h6')"><h6>Heading 6</h6></a>
      </div>
    </div>

    <div class="btn-group me-2">
      <button type="button" class="btn btn-light" onclick="execCommand('bold')"><i class="fas fa-bold"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('italic')"><i class="fas fa-italic"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('underline')"><i class="fas fa-underline"></i></button>
      <span class="btn btn-light p-1">
        <label for="textColorPicker" class="position-absolute" style="cursor:pointer;height:28px;width:48px;padding-top:5px;border-radius:2px; font-size:12px; font-weight:bold;background-color:#fff;">A</label>
        <input type="color" id="textColorPicker" class="input-color" onchange="changeTextColor(this.value)">
      </span>
      <span class="btn btn-light p-1 positon-relative">
        <label for="backgroundColorPicker" class="position-absolute" style="cursor:pointer;top:11px;left:12px;height:15px;width:35px;border-radius:2px; font-size:12px; font-weight:bold;background-color:#fff;">A</label>
        <input type="color" id="backgroundColorPicker" class="input-color" onchange="changeBackgroundColor(this.value)">
      </span>
      <button type="button" class="btn btn-light" onclick="execCommand('justifyLeft')"><i class="fas fa-align-left"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('justifyCenter')"><i class="fas fa-align-center"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('justifyRight')"><i class="fas fa-align-right"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('justifyFull')"><i class="fas fa-align-justify"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('insertUnorderedList')"><i class="fas fa-list-ul"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('insertOrderedList')"><i class="fas fa-list-ol"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('indent')"><i class="fas fa-indent"></i></button>
      <button type="button" class="btn btn-light" onclick="execCommand('outdent')"><i class="fas fa-outdent"></i></button>
    </div>
  </div>

  <div class="position-relative">
    <header style="margin-top:10px;display:block;">
      <span id="activeModeText" onclick="toggleContent()" class="tag text-dark">Editor Mode</span>
    </header>
    
    <div class="editor bg-light p-3 shadow-none textarea" contenteditable="true" id="editor" oninput="updateTextarea()">abcdef</div>
    <textarea name="${nameArrribute}" id="textarea" oninput="updateEditor()" class="textarea w-100" style="display:none;">abcdef</textarea>
    <div id="toasting" class="toasting"></div>
    
    <footer>
      <div class="text-end">
      <span id="wordCount" class="me-1 tag text-dark">Word Counts: 0</span>
      <a href="https://hassan005004.github.io/zahidaz-rich-editor" class="text-decoration-none tag text-dark" target="_blank">Powered by zahidaz</a></div>
    </footer>
  </div>

  <!-- Alert Modal -->
  <div class="modal inside" id="alertModal" tabindex="-1" aria-labelledby="alertModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- New Document Modal -->
  <div class="modal inside" id="newDocumentModal" tabindex="-1" aria-labelledby="newDocumentModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="newDocumentModalLabel">New Document</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to create a new document? This action will clear all content.
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="clearEditor()">New</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Preview Modal -->
  <div class="modal inside full" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered- modal-lg-">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="previewModalLabel">Preview</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="previewContent"></div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Sourceview Modal -->
  <div class="modal inside full" id="sourceModal" tabindex="-1" aria-labelledby="sourceModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered- modal-lg-">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sourceModalLabel">Source Preview</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div id="sourceModalBody" class="p-2" contenteditable="true" style="min-height:300px"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Image Modal -->
  <div class="modal inside" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="imageModalLabel">Insert Image</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="linkText" class="form-label">Paste Url</label>
                <input type="text" id="imageUrlInput" class="form-control" placeholder="Paste Image URL">
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="linkText" class="form-label">Upload</label>
                <input type="file" class="form-control" id="imageUploadInput" accept="image/*">
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="linkText" class="form-label">Alt</label>
                <input type="number" class="form-control" id="imageAlt">
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="linkText" class="form-label">Height (px)</label>
                <input type="number" class="form-control" id="imageHeight">
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="linkText" class="form-label">Width (px)</label>
                <input type="number" class="form-control" id="imageWidth">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="insertImage()">Insert</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Link Modal -->
  <div class="modal inside" id="linkModal" tabindex="-1" aria-labelledby="linkModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="linkModalLabel">Insert Link</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="linkText" class="form-label">Link Text</label>
                <input type="text" class="form-control" id="linkText">
              </div>						
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="linkUrl" class="form-label">URL</label>
                <input type="url" class="form-control" id="linkUrl">
              </div>						
            </div>
            <div class="col-6">
              <label for="linkTarget" class="form-label">Target</label>
              <select class="form-select" id="linkTarget">
                <option value="_self">Self</option>
                <option value="_blank">Blank</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="insertLink()">Insert Link</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Aboutus Modal -->
  <div class="modal inside" id="aboutUsModal" tabindex="-1" aria-labelledby="aboutUsModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0 text-center">
          <img width="100px" src="data:image/png;base64,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">
          <div class="mt-2">A software tech company</div>
        </div>
        <div class="modal-footer border-0 py-3"></div>
      </div>
    </div>
  </div>
</div>
    `);

    // Replace the textarea with your custom editor
    textarea.replaceWith(customEditor);
  });
  // Return the jQuery object for chaining
  return this;
};




document.addEventListener('DOMContentLoaded', function() {
  isHtmlVisible = false;
  let savedRange = 0;

  editor = document.getElementById('editor');
  textarea = document.getElementById('textarea');
  activeModeText = document.getElementById('activeModeText');

  viewWhichMode = document.getElementById('viewWhichMode');
  viewWhichModeSource = '<i class="fas fa-code"></i> Source';
  viewWhichModeEditor = '<i class="fas fa-edit"></i> Editor';


  var insertImageUrl = document.getElementById("imageUrlInput");
  var insertImageUploadFile = document.getElementById("imageUploadInput");
  var insertImageAlt = document.getElementById("imageAlt");
  var insertImageHeight = document.getElementById("imageHeight");
  var insertImageWidth = document.getElementById("imageWidth");
    
  countWordsElem = document.getElementById('wordCount');
})

function saveSelection() {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
}

function getSelectionRange() {
  //var selection = window.getSelection();
  //if (selection.rangeCount > 0) {
  //	return selection.getRangeAt(0);
  //}
  //return null;
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) {
      return range;
    }
  }
  return null;
}

function getSelectedText() {
  var selection = window.getSelection();
  return selection.toString();
}

function toggleContent() {
  var textarea = document.getElementById('textarea');
  var toggleButton = document.getElementById('toggleContentButton');
  if (isHtmlVisible) {
    // Show text content
    editor.style.display = 'block';
    textarea.style.display = 'none';
    activeModeText.textContent = 'Editor Mode';
    viewWhichMode.innerHTML = viewWhichModeSource;
  } else {
    editor.style.display = 'none';
    textarea.style.display = 'block';
    activeModeText.textContent = 'Source Mode';
    viewWhichMode.innerHTML = viewWhichModeEditor;
  }
  isHtmlVisible = !isHtmlVisible;
}

function updateTextarea() {
  var editorContent = editor.innerHTML;
  textarea.value = editorContent;
  
  countWords();
  saveSelection();
}

function updateEditor() {
  // Get the content from the textarea
  var textareaContent = textarea.value;
  editor.innerHTML = textareaContent;
  console.log(textareaContent);
  
  countWords();
  saveSelection();
}

function ccc() {
  alert('no work');
}

function execCommand(command, value = null) {
  document.execCommand(command, false, value);
}

function notSupportCommand() {
  showToast("Use ctrl+v / ctrl+shift+p commands");
}

function toggleSubscript() {
  if(document.queryCommandState('subscript')){
    execCommand('removeFormat');
    //document.execCommand('removeFormat', false, null);
  }else{
    execCommand('subscript');
    //document.execCommand('subscript', false, null);
  }
  // var selection = window.getSelection();
  // var range = selection.getRangeAt(0);
  // var selectedText = range.toString();
  // var subText = document.createElement('sub');
  // subText.textContent = selectedText;
  // range.deleteContents();
// range.insertNode(subText);
}

function toggleSuperscript() {
  if(document.queryCommandState('superscript')){
    // document.execCommand('removeFormat', false, null);
    execCommand('removeFormat');
  }else{
    //document.execCommand('superscript', false, null);
    execCommand('superscript');
  }
  // var selection = window.getSelection();
  // var range = selection.getRangeAt(0);
  // var selectedText = range.toString();

  // if (range.commonAncestorContainer.parentNode.tagName === 'SUP') {
  //    convertToNormalText(range.startContainer, range.endContainer, selectedText);
  // } else {
  //    var supText = document.createElement('sup');
  //    supText.textContent = selectedText;
  //    range.deleteContents();
  //    range.insertNode(supText);
  //}
}


function convertToNormalText(startNode, endNode, text) {
  var range = document.createRange();
  range.setStartBefore(startNode);
  range.setEndAfter(endNode);
  range.deleteContents();
  var textNode = document.createTextNode(text);
  range.insertNode(textNode);
}


function insertImage() {
  var imageUrl = insertImageUrl.value.trim();
  //var fileInput = document.getElementById("imageUploadInput");
  console.log('ss ss');

  if (imageUrl !== "") {
    insertImageFromURL(imageUrl);
  } else if (insertImageUploadFile.files.length > 0) {
    uploadAndInsertImage();
  } else {
    alert("Please enter an image URL or select an image file.");
  }
}

function insertImageFromURL(){

  var imageUrl = insertImageUrl.value.trim();

  var range = getSelectionRange();
  if (range) {
    var img = document.createElement("img");
    img.src = imageUrl;
    if(insertImageAlt.value){
      img.alt = insertImageAlt.value;
    }
    if(insertImageHeight.value){
      img.height = insertImageHeight.value;
    }
    if(insertImageWidth.value){
      img.width = insertImageWidth.value;
    } 
    range.insertNode(img);
  } else {
    var img = document.createElement("img");
    img.src = imageUrl;
    if(insertImageAlt.value){
      img.alt = insertImageAlt.value;
    }
    if(insertImageHeight.value){
      img.height = insertImageHeight.value;
    }
    if(insertImageWidth.value){
      img.width = insertImageWidth.value;
    } 
    editor.appendChild(img);
  }
  $('#imageModal').modal('hide');
}

function uploadAndInsertImage() {
  //var fileInput = document.getElementById('imageUploadInput');
  var file = insertImageUploadFile.files[0];
  console.log('s');
    const FR = new FileReader();
  
    FR.addEventListener("load", function(evt) {
      var img = document.createElement("img");
    img.src = evt.target.result;
    if(insertImageAlt.value){
      img.alt = insertImageAlt.value;
    }
    if(insertImageHeight.value){
      img.height = insertImageHeight.value;
    }
    if(insertImageWidth.value){
      img.width = insertImageWidth.value;
    } 
    editor.appendChild(img);
  }); 
  
  FR.readAsDataURL(file);
  $('#imageModal').modal('hide');
}

/*function insertImage(imageUrl) {
  var editor = document.getElementById("editor");
  var range = getSelectionRange(editor);
  if (range) {
    var img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Image";

    // Insert the image at the current cursor position
    range.insertNode(img);
  } else {
    // If no text is selected, append the image at the end of the editor
    var img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Image";

    editor.appendChild(img);
  }
}*/


function insertLink() {
  var linkText = document.getElementById("linkText").value;
  var linkUrl = document.getElementById("linkUrl").value;
  var linkTarget = document.getElementById("linkTarget").value;

  var selectedText = getSelectedText();

  if (!selectedText && editor) {
    var range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false); // Move range to the end
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  var range = getSelectionRange();
  if (range) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.textContent = linkText;
    link.target = linkTarget;

    range.deleteContents();
    range.insertNode(link);
  }
  $('#linkModal').modal('hide')
}

function insertHorizontalLine() {
  var horizontalLine = document.createElement("hr");
  if (savedRange) {
    savedRange.deleteContents();
    savedRange.insertNode(horizontalLine);
  } else {
    document.getElementById("editor").appendChild(horizontalLine);
  }

}



function applyHeading(tagName) {
  //if (document.queryCommandSupported('formatBlock')) {
    document.execCommand('formatBlock', false, tagName);
  //} else {
    // Fallback to manually wrapping the selection with the specified tag
  //	var selection = window.getSelection();
  //	var range = selection.getRangeAt(0);
  //	var headingElement = document.createElement(tagName);
  //	headingElement.textContent = selection.toString();
  //	range.deleteContents();
  //	range.insertNode(headingElement);
  //}
}

function changeBackgroundColor(color) {
        //document.execCommand('hiliteColor', false, color);
  execCommand('hiliteColor');
    }

    function changeTextColor(color) {
        //document.execCommand('foreColor', false, color);
  execCommand('foreColor');
    }

function showToast(message) {
        var toast = document.getElementById('toasting');
        toast.textContent = message;
        toast.style.display = 'block';

        // Hide the toast after 3 seconds
        setTimeout(function() {
            toast.style.display = 'none';
        }, 3000);
    }

//document.addEventListener('keydown', function(event) {
    //    if (event.ctrlKey && event.key === 'p') {
    //        event.preventDefault();
    //        showToast('Your browser does not support Ctrl + P');
    //    }
    //});

    function generateHtml() {
        var editorContent = editor.innerHTML;
        console.log(editorContent);
        // You can now use editorContent as the HTML output
        // For example, you can send it to a server, display it in a preview, etc.
    }

    function newDocument() {
        // Show Bootstrap modal for new document confirmation
  $(document).ready(function(){
    $('#newDocumentModal').modal('show');
  });
    }


function clearEditor() {
  editor.innerHTML = '';
  $('#newDocumentModal').modal('hide');
}


    function previewDocument() {
        // Show Bootstrap modal for preview
        $('#previewModal').modal('show');
        // Display content in preview modal
        document.getElementById('previewContent').innerHTML = editor.innerHTML;
    }


function alertMsg(msg){
  $('#alertModal').find('.modal-body').text(msg);
  $('#alertModal').modal('show');
}

function printDocument() {
    // Open print window with editor content
    var editorContent = editor.innerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Preview</title></head><body>' + editorContent + '</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function toggleSourceView() {
        var editorContent = editor.innerHTML;
        var sourceModalBody = document.getElementById('sourceModalBody');
        sourceModalBody.textContent = editorContent;
        var sourceModal = new bootstrap.Modal(document.getElementById('sourceModal'));
        sourceModal.toggle();
    }

function countWords() {
  var text = editor.innerText;
  var wordCount = text.split(/\s+/).filter(function(word) {
    return word.length > 0;
  }).length;
  countWordsElem.textContent = "Word Counts: " + wordCount;
}




document.addEventListener('DOMContentLoaded', function() {
// Add a 'paste' event listener to the editor
editor.addEventListener('paste', function(event) {
  
  var clipboardData = event.clipboardData || window.clipboardData;

  if (clipboardData && clipboardData.items) {
    for (var i = 0; i < clipboardData.items.length; i++) {
      var item = clipboardData.items[i];

      if (item.type.indexOf('image') !== -1) {
      event.preventDefault();
        var fileReader = new FileReader();
        var blob = item.getAsFile();
        fileReader.onload = function(event) {
          var imageElement = document.createElement('img');
          imageElement.src = event.target.result;
          editor.appendChild(imageElement);
        };
        fileReader.readAsDataURL(blob);
      }
    }
  }
});

// Add event listener for keyboard shortcuts
editor.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
    event.preventDefault();
    console.log(event.key.toLowerCase());
    switch (event.key.toLowerCase()) {
      case 's':
        alertMsg('I can not save to draft, no work done');
        break;
      case 'n':
        newDocument();
        break;
      case 'c':
        execCommand('copy');
        break;
      case 'x':
        execCommand('cut');
        break;
      case 'v':
        execCommand('paste');
        break;
      case 'a':
        execCommand('selectAll');
        break;
      case 'p':
        printDocument();
        break;
      }
  }
});
});