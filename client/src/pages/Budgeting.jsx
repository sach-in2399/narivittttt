import React, { useState, useEffect, useRef } from 'react';
import styles from './Budgeting.module.css'; // Import CSS Module

const Budgeting = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const canvasRef = useRef(null);

  const calculateSavings = () => {
    if (!income || !expenses) {
      alert('Please enter both income and expenses.');
      return;
    }

    const savingsAmount = parseFloat(income) - parseFloat(expenses);
    if (savingsAmount < 0) {
      alert('Your expenses exceed your income. Please review your budget.');
    }
    setSavings(savingsAmount.toFixed(2));
  };

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => particle.update());
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.budgetingPage}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas}></canvas>
      <div className={styles.content}>
        <h1>AI-Driven Budgeting & Financial Planning</h1>
        <p>Track your expenses, cash flow, and savings with personalized recommendations.</p>

        <div className={styles.budgetForm}>
          <div className={styles.formGroup}>
            <label htmlFor="income">Monthly Income (₹): </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your income"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="expenses">Monthly Expenses (₹): </label>
            <input
              type="number"
              id="expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Enter your expenses"
            />
          </div>

          <button onClick={calculateSavings}>Calculate Savings</button>

          {savings && (
            <div className={styles.savingsResult}>
              <h3>Your Monthly Savings: ₹{savings}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budgeting;