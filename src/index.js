import { convertDropdownsToRadios }  from './convert-dropdowns';
import '../css/styles.css';

// Run this function when the DOM is ready.
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  convertDropdownsToRadios();
} else {
  document.addEventListener('DOMContentLoaded', convertDropdownsToRadios());
}
