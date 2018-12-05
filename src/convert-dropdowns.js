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

export function convertDropdownsToRadios() {
  // Define answer that should be highlighted as the "right" answer.
  const highlightedAnswer = 'No';

  // For each select element, excluding State and Country dropdowns...
  if (document.querySelectorAll('select:not([name="State"]):not([name="Country"]):not([name="Title"])')) {
    Array.from(document.querySelectorAll('select:not([name="State"]):not([name="Country"])')).forEach(
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
          const highlight = value === highlightedAnswer ? 'class="highlight"' : '';
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
          if (value === highlightedAnswer) {
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
