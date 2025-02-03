// import React, { useState, useEffect, useRef } from 'react';
// import styles from './InventoryManagement.module.css'; // Import CSS Module

// const InventoryManagement = () => {
//   const [inventory, setInventory] = useState([
//     { id: 1, name: 'Rice', quantity: 50 },
//     { id: 2, name: 'Wheat', quantity: 30 },
//   ]);

//   const [newItem, setNewItem] = useState('');
//   const [newQuantity, setNewQuantity] = useState('');
//   const canvasRef = useRef(null);

//   const addItem = () => {
//     if (newItem && newQuantity) {
//       setInventory([...inventory, { id: inventory.length + 1, name: newItem, quantity: parseInt(newQuantity) }]);
//       setNewItem('');
//       setNewQuantity('');
//     }
//   };

//   // Particle Animation
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let particlesArray = [];

//     class Particle {
//       constructor(x, y, directionX, directionY, size, color) {
//         this.x = x;
//         this.y = y;
//         this.directionX = directionX;
//         this.directionY = directionY;
//         this.size = size;
//         this.color = color;
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//       }

//       update() {
//         if (this.x + this.size > canvas.width || this.x - this.size < 0) {
//           this.directionX = -this.directionX;
//         }
//         if (this.y + this.size > canvas.height || this.y - this.size < 0) {
//           this.directionY = -this.directionY;
//         }
//         this.x += this.directionX;
//         this.y += this.directionY;

//         // Add interactivity
//         if (
//           mouse.x - this.x < 50 &&
//           mouse.x - this.x > -50 &&
//           mouse.y - this.y < 50 &&
//           mouse.y - this.y > -50
//         ) {
//           if (this.size < 5) {
//             this.size += 0.5;
//           }
//         } else if (this.size > 2) {
//           this.size -= 0.1;
//         }

//         this.draw();
//       }
//     }

//     const init = () => {
//       particlesArray = [];
//       const numberOfParticles = (canvas.height * canvas.width) / 9000;
//       for (let i = 0; i < numberOfParticles; i++) {
//         const size = Math.random() * 3 + 1;
//         const x = Math.random() * (canvas.width - size * 2) + size;
//         const y = Math.random() * (canvas.height - size * 2) + size;
//         const directionX = Math.random() * 0.4 - 0.2;
//         const directionY = Math.random() * 0.4 - 0.2;
//         const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random HSL color
//         particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
//       }
//     };

//     const animate = () => {
//       requestAnimationFrame(animate);
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw particles
//       particlesArray.forEach((particle) => particle.update());

//       // Connect particles
//       connectParticles();
//     };

//     const connectParticles = () => {
//       let opacity = 1;
//       for (let a = 0; a < particlesArray.length; a++) {
//         for (let b = a; b < particlesArray.length; b++) {
//           const distance =
//             (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
//             (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
//           if (distance < (canvas.width / 7) * (canvas.height / 7)) {
//             opacity = 1 - distance / 20000;
//             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//             ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//             ctx.stroke();
//           }
//         }
//       }
//     };

//     // Mouse interactivity
//     let mouse = {
//       x: null,
//       y: null,
//       radius: 100,
//     };

//     window.addEventListener('mousemove', (event) => {
//       mouse.x = event.x;
//       mouse.y = event.y;
//     });

//     init();
//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       init();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', () => {});
//     };
//   }, []);

//   return (
//     <div className={styles.inventoryManagementPage}>
//       <canvas ref={canvasRef} className={styles.backgroundCanvas}></canvas>
//       <div className={styles.content}>
//         <h1>Smart Inventory Management</h1>
//         <p>Manage your stock levels, sales, and resources with automated alerts.</p>

//         <div className={styles.inventoryList}>
//           <h3>Current Inventory</h3>
//           <ul>
//             {inventory.map((item) => (
//               <li key={item.id}>
//                 {item.name}: {item.quantity} units
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={styles.addItemSection}>
//           <h3>Add New Item</h3>
//           <input
//             type="text"
//             placeholder="Item Name"
//             value={newItem}
//             onChange={(e) => setNewItem(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newQuantity}
//             onChange={(e) => setNewQuantity(e.target.value)}
//           />
//           <button onClick={addItem}>Add Item</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryManagement;





import React, { useState, useEffect, useRef } from 'react';
import styles from './InventoryManagement.module.css'; // Import CSS Module

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Rice', quantity: 50, sales: 10, threshold: 20 },
    { id: 2, name: 'Wheat', quantity: 30, sales: 5, threshold: 15 },
  ]);

  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newThreshold, setNewThreshold] = useState('');
  const [cooperativeDeals, setCooperativeDeals] = useState([]);
  const [dealName, setDealName] = useState('');
  const [dealDiscount, setDealDiscount] = useState('');
  const canvasRef = useRef(null);

  // Add new item to inventory
  const addItem = () => {
    if (newItem && newQuantity && newThreshold) {
      setInventory([
        ...inventory,
        {
          id: inventory.length + 1,
          name: newItem,
          quantity: parseInt(newQuantity),
          sales: 0,
          threshold: parseInt(newThreshold),
        },
      ]);
      setNewItem('');
      setNewQuantity('');
      setNewThreshold('');
    }
  };

  // Track sales and update inventory
  const trackSales = (id, soldQuantity) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - soldQuantity, sales: item.sales + soldQuantity }
          : item
      )
    );
  };

  // Check for restocking alerts
  useEffect(() => {
    inventory.forEach((item) => {
      if (item.quantity <= item.threshold) {
        alert(`Restock Alert: ${item.name} is below the threshold (${item.threshold} units).`);
      }
    });
  }, [inventory]);

  // Add cooperative deal
  const addCooperativeDeal = () => {
    if (dealName && dealDiscount) {
      setCooperativeDeals([
        ...cooperativeDeals,
        { id: cooperativeDeals.length + 1, name: dealName, discount: parseInt(dealDiscount) },
      ]);
      setDealName('');
      setDealDiscount('');
    }
  };

  // Particle Animation (same as before)
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

        // Add interactivity
        if (
          mouse.x - this.x < 50 &&
          mouse.x - this.x > -50 &&
          mouse.y - this.y < 50 &&
          mouse.y - this.y > -50
        ) {
          if (this.size < 5) {
            this.size += 0.5;
          }
        } else if (this.size > 2) {
          this.size -= 0.1;
        }

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random HSL color
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesArray.forEach((particle) => particle.update());

      // Connect particles
      connectParticles();
    };

    const connectParticles = () => {
      let opacity = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance =
            (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacity = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Mouse interactivity
    let mouse = {
      x: null,
      y: null,
      radius: 100,
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

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
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <div className={styles.inventoryManagementPage}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas}></canvas>
      <div className={styles.content}>
        <h1>Smart Inventory Management</h1>
        <p>Manage your stock levels, sales, and resources with automated alerts.</p>

        {/* Inventory List */}
        <div className={styles.inventoryList}>
          <h3>Current Inventory</h3>
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>
                {item.name}: {item.quantity} units (Sales: {item.sales} units)
                <button onClick={() => trackSales(item.id, 1)}>Sell 1 Unit</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Item */}
        <div className={styles.addItemSection}>
          <h3>Add New Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Restock Threshold"
            value={newThreshold}
            onChange={(e) => setNewThreshold(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>

        {/* Cooperative Deals */}
        <div className={styles.cooperativeDeals}>
          <h3>Cooperative Deals</h3>
          <ul>
            {cooperativeDeals.map((deal) => (
              <li key={deal.id}>
                {deal.name}: {deal.discount}% discount
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Deal Name"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={dealDiscount}
            onChange={(e) => setDealDiscount(e.target.value)}
          />
          <button onClick={addCooperativeDeal}>Add Deal</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;