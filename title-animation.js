// Array of different styled versions of "stephen lutz"
const titleVariations = [
  "𝒔𝙩𝙚𝐩𝗵𝗲𝒏 𝐥𝒖𝘁𝙯",
  "𝖘🆃🅴𝑝𝘩𝘦𝖓 𝑙𝕦𝘵🆉",
  "𝘀𝙩𝑒ⓟ𝚑𝓮𝖓 𝖑𝚞𝖙𝘻",
  "𝕤𝚝𝚎𝑝𝖍𝖊𝕟 𝑙𝓾𝔱𝚣",
  "𝔰𝖙𝐞𝘱𝗵ℯ𝕟 𝕝𝘂𝕥𝖟"
];

// Variable to hold our interval
let titleAnimationInterval;

// Function to start the title animation
function startTitleAnimation() {
  let currentIndex = 0;
  
  // Clear any existing interval first
  if (titleAnimationInterval) {
    clearInterval(titleAnimationInterval);
  }
  
  // Set initial title
  document.title = titleVariations[currentIndex];
  
  // Create interval to change title every 500ms (0.5 seconds)
  titleAnimationInterval = setInterval(() => {
    // Move to next title variation
    currentIndex = (currentIndex + 1) % titleVariations.length;
    
    // Update the document title
    document.title = titleVariations[currentIndex];
  }, 500);
}

// Function to stop the animation if needed
function stopTitleAnimation() {
  if (titleAnimationInterval) {
    clearInterval(titleAnimationInterval);
    document.title = "Stephen Lutz"; // Reset to default title
  }
}

// Start the animation when the page loads
window.addEventListener('load', startTitleAnimation);

// Optional: Stop animation when the tab is not visible to save resources
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Save the current state, but pause the animation
    if (titleAnimationInterval) {
      clearInterval(titleAnimationInterval);
    }
  } else {
    // Resume animation when tab becomes visible again
    startTitleAnimation();
  }
});
