// =====================
// Sparkle Background Animation
// =====================
// Controls the animated sparkle effect in the background.
// Set 'disable' to true to turn off for performance.

var disable = true; // disable sparkles for performance

if (!disable) {
    // Returns a random number between a and b
    function randomBetween(a, b) {
        return Math.random() * (b - a) + a;
    }
    // Creates a single sparkle element and animates it
    function createSparkle() {
        const sparkle = document.createElement('span');
        sparkle.style.left = randomBetween(0, 100) + 'vw';
        sparkle.style.top = randomBetween(0, 100) + 'vh';
        sparkle.style.width = sparkle.style.height = randomBetween(6, 16) + 'px';
        sparkle.style.opacity = randomBetween(0.4, 0.9);
        document.querySelector('.sparkle').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2200);
    }
    // Launch multiple sparkles at random intervals
    for (let i = 0; i < 32; i++) {
        setTimeout(createSparkle, Math.random() * 1200);
    }
}