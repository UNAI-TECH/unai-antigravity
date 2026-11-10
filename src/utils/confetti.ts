import confetti from "canvas-confetti";

export const triggerPaymentSuccessConfetti = () => {
  // Burst 1: Center blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"],
    zIndex: 99999,
  });

  // Burst 2 & 3: Side cannons after slight delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ["#10b981", "#3b82f6", "#f59e0b"],
      zIndex: 99999,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ["#a855f7", "#ec4899", "#6366f1"],
      zIndex: 99999,
    });
  }, 250);

  // Burst 4: Falling stars/celebration shower
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.5 },
      shapes: ["circle"],
      scalar: 1.2,
      colors: ["#FFD700", "#FFA500", "#FF4500", "#00FFFF", "#7B68EE"],
      zIndex: 99999,
    });
  }, 500);
};

