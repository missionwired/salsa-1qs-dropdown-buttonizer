function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' '
    );
  }
}

const convertDropdowns = (...highlightAnswers) => {
  const convertNow = (highlightAnswers) => {
    // For each select element, excluding State and Country dropdowns...
    const selector = 'select:not([name="State"]):not([name="Country"]):not([name="Title"])'
    if (document.querySelectorAll(selector)) {
      Array.from(document.querySelectorAll(selector)).forEach(
        select => {
          // Remove formRow class from parent div. Otherwise ALS action page styling breaks this code. 
          const formRow = select.parentNode.parentNode;
          removeClass(formRow, 'formRow');
          // Hide existing labels in the formRow parent div. Don't remove them in case they are needed later.
          Array.from(formRow.querySelectorAll('label')).forEach(label => label.style.display = 'none');
  
          // Create a container div for the radio buttons.
          const el = document.createElement('div');
          const className = 'oqs';
          // Create radio buttons.
          Array.from(select.querySelectorAll('option')).forEach(option => {
            const name = select.getAttribute('name');
            const value = option.getAttribute('value');
            // Create snippets used to check the "highlight" checkbox and apply a highlight CSS class.
            const highlight = highlightAnswers.includes(value) ? 'class="highlight"' : '';
            const checked = highlight ? 'checked' : '';
            if (value === '' || value === null) {
              return;
            }
            addClass(el, className)
            const html = `
              <input name="${name}" id="${name}_${value}_id" type="radio" value="${value}" ${checked}>
              <label for="${name}_${value}_id" ${highlight}>${option.text}</label>
            `;
            // Put the highlight answer first.
            if (highlightAnswers.includes(value)) {
              el.innerHTML = html + el.innerHTML;
            } else {
              el.innerHTML += html;
            }
          });
          // Insert the radio buttons.
          select.parentNode.insertBefore(el, select);
          // Remove the original dropdown.
          select.remove();
        }
      );
    }
  }
  // Run this function when the DOM is ready.
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    convertNow(highlightAnswers);
  } else {
    document.addEventListener('DOMContentLoaded', convertNow(highlightAnswers));
  }  
}

export default convertDropdowns;