// update-dates.js
// Sets the update dates and descriptions for each section from variables in version.js

document.addEventListener('DOMContentLoaded', function() {
  var updateDates = {
    'study-guide': typeof studyGuideDate !== 'undefined' ? studyGuideDate : date,
    'quizlet': typeof quizletDate !== 'undefined' ? quizletDate : date,
    'publications': typeof publicationsDate !== 'undefined' ? publicationsDate : date,
    'additional-guides': typeof additionalGuidesDate !== 'undefined' ? additionalGuidesDate : date
  };
  var updateDescs = {
    'study-guide': typeof studyGuideDesc !== 'undefined' ? studyGuideDesc : '',
    'quizlet': typeof quizletDesc !== 'undefined' ? quizletDesc : '',
    'publications': typeof publicationsDesc !== 'undefined' ? publicationsDesc : '',
    'additional-guides': typeof additionalGuidesDesc !== 'undefined' ? additionalGuidesDesc : ''
  };

  document.querySelectorAll('.update-bar.single').forEach(function(bar) {
    var section = bar.getAttribute('data-section');
    var dateSpan = bar.querySelector('.update-date');
    if (section && updateDates[section] && dateSpan) {
      dateSpan.textContent = 'Last Updated: ' + updateDates[section];
    }
    function formatDesc(desc) {
      if (!desc) return '';
      // Replace // with newlines and * with bullet points
      return desc
        .replace(/\* ?/g, '• ')
        .replace(/\/\//g, '\n')
        .replace(/\n/g, '<br>');
    }
    function toggleDropdown(e) {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      var dropdown = bar.querySelector('.update-desc-dropdown[data-section="' + section + '"]');
      if (!dropdown) return;
      var isOpen = dropdown.getAttribute('data-open') === 'true';
      if (!isOpen) {
        // Close all others first
        document.querySelectorAll('.update-desc-dropdown').forEach(function(drop) {
          drop.setAttribute('data-open', 'false');
        });
        dropdown.innerHTML = formatDesc(updateDescs[section]);
        dropdown.setAttribute('data-open', 'true');
      } else {
        dropdown.setAttribute('data-open', 'false');
      }
    }
    bar.addEventListener('click', toggleDropdown);
    bar.addEventListener('keydown', toggleDropdown);
  });

  document.addEventListener('click', function(e) {
    // Only close if click is outside any .update-bar.single
    if (!e.target.closest('.update-bar.single')) {
      document.querySelectorAll('.update-desc-dropdown').forEach(function(drop) {
        drop.setAttribute('data-open', 'false');
      });
    }
  });
});
