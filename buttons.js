// =====================
// Dropdown Button Logic
// =====================
// Handles dropdown open/close for all .dropdown elements on the page.

document.addEventListener('DOMContentLoaded', function() {
    // Remove focus from all .round-btn and .dropdown-btn after click/tap to prevent stuck active state on mobile
    function blurOnPointerUp(e) {
        e.currentTarget.blur();
    }
    document.querySelectorAll('.round-btn, .dropdown-btn').forEach(function(btn) {
        btn.addEventListener('mouseup', blurOnPointerUp);
        btn.addEventListener('touchend', blurOnPointerUp);
    });
    // Support multiple dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dropdown) {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        if (btn && content) {
            // Toggle dropdown on button click
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Close other dropdowns
                dropdowns.forEach(function(otherDropdown) {
                    if (otherDropdown !== dropdown) {
                        const otherBtn = otherDropdown.querySelector('.dropdown-btn');
                        const otherContent = otherDropdown.querySelector('.dropdown-content');
                        if (otherBtn && otherContent) {
                            otherContent.classList.remove('show');
                            otherBtn.classList.remove('active');
                            otherDropdown.classList.remove('open');
                        }
                    }
                });
                content.classList.toggle('show');
                btn.classList.toggle('active');
                dropdown.classList.toggle('open');
                // Remove focus after click/tap to prevent stuck highlight
                btn.blur();
            });
        }
    });
    // Close dropdowns if clicking outside
    window.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            const btn = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');
            if (btn && content && !dropdown.contains(e.target)) {
                content.classList.remove('show');
                btn.classList.remove('active');
                dropdown.classList.remove('open');
            }
        });
    });
});