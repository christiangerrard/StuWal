let isHidden = false;

      function toggleVisibility() {
        const hideToggleIcon = document.getElementById('hide-toggle');
        const elementsToToggle = [
          'total-balance',
          'balance-change', 
          'total-expense',
          'expense-change',
          'total-income',
          'income-change'
        ];
        
        // Toggle transaction amounts
        const transactionAmounts = document.querySelectorAll('.transaction-amount');
        const recurringAmounts = document.querySelectorAll('.recurring-amount-value');
        
        if (!isHidden) {
          // Hide all amounts
          elementsToToggle.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
              element.textContent = '• • • • • • • •';
              element.classList.add('hidden-amount');
            }
          });
          
          // Hide transaction amounts
          transactionAmounts.forEach(element => {
            element.textContent = '• • • • • •';
            element.classList.add('hidden-amount');
          });
          
          // Hide recurring amounts
          recurringAmounts.forEach(element => {
            element.textContent = '• • • • •';
            element.classList.add('hidden-amount');
          });
          
          // Change icon to eye-slash (hide icon)
          hideToggleIcon.className = 'fas fa-eye-slash hide-toggle-icon';
          isHidden = true;
        } else {
          // Show all amounts
          elementsToToggle.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
              element.textContent = element.getAttribute('data-value');
              element.classList.remove('hidden-amount');
            }
          });
          
          // Show transaction amounts
          transactionAmounts.forEach(element => {
            element.textContent = element.getAttribute('data-value');
            element.classList.remove('hidden-amount');
          });
          
          // Show recurring amounts
          recurringAmounts.forEach(element => {
            element.textContent = element.getAttribute('data-value');
            element.classList.remove('hidden-amount');
          });
          
          // Change icon to eye (unhide icon)
          hideToggleIcon.className = 'fas fa-eye hide-toggle-icon';
          isHidden = false;
        }
      }

      const canvas = document.getElementById('chart');
        const ctx = canvas.getContext('2d');
        
        // Get container size
        const container = canvas.parentElement;
        const containerRect = container.getBoundingClientRect();
        
        // Set canvas size with proper pixel ratio
        const pixelRatio = window.devicePixelRatio || 1;
        const width = containerRect.width;
        const height = containerRect.height;
        
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        ctx.scale(pixelRatio, pixelRatio);
        
        // Data points (in millions of Rupiah for easier calculation)
        const data = {
            labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
            income: [8, 6, 12, 15], // in millions
            expense: [10, 4, 8, 12] // in millions
        };
        
        // Chart dimensions
        const padding = 50;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Y-axis values (in millions)
        const yValues = [0, 5, 10, 15, 20];
        const maxY = 20;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        // Horizontal grid lines
        yValues.forEach((value, index) => {
            const y = padding + (chartHeight * (maxY - value)) / maxY;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
            
            // Y-axis labels
            ctx.fillStyle = '#999';
            ctx.font = '11px Gilroy';
            ctx.textAlign = 'right';
            ctx.fillText(`Rp ${value}M`, padding - 10, y + 3);
        });
        
        // Vertical grid lines and X-axis labels
        data.labels.forEach((label, index) => {
            const x = padding + (chartWidth * index) / (data.labels.length - 1);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
            
            // X-axis labels
            ctx.fillStyle = '#999';
            ctx.font = '11px Gilroy';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, height - padding + 25);
        });
        
        // Function to draw smooth curve
        function drawSmoothLine(points, color, lineWidth = 2) {
            if (points.length < 2) return;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                const prevPoint = points[i - 1];
                const currentPoint = points[i];
                
                if (i === 1) {
                    ctx.lineTo(currentPoint.x, currentPoint.y);
                } else {
                    const nextPoint = points[i + 1] || currentPoint;
                    const prevPrevPoint = points[i - 2] || prevPoint;
                    
                    // Calculate control points for smooth curve
                    const cp1x = prevPoint.x + (currentPoint.x - prevPrevPoint.x) * 0.1;
                    const cp1y = prevPoint.y + (currentPoint.y - prevPrevPoint.y) * 0.1;
                    const cp2x = currentPoint.x - (nextPoint.x - prevPoint.x) * 0.1;
                    const cp2y = currentPoint.y - (nextPoint.y - prevPoint.y) * 0.1;
                    
                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y);
                }
            }
            ctx.stroke();
        }
        
        // Function to draw points
        function drawPoints(points, color) {
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        }
        
        // Calculate points for income line
        const incomePoints = data.income.map((value, index) => ({
            x: padding + (chartWidth * index) / (data.labels.length - 1),
            y: padding + (chartHeight * (maxY - value)) / maxY
        }));
        
        // Calculate points for expense line
        const expensePoints = data.expense.map((value, index) => ({
            x: padding + (chartWidth * index) / (data.labels.length - 1),
            y: padding + (chartHeight * (maxY - value)) / maxY
        }));
        
        // Draw income line (yellow)
        drawSmoothLine(incomePoints, '#FFD700', 3);
        drawPoints(incomePoints, '#FFD700');
        
        // Draw expense line (red)
        drawSmoothLine(expensePoints, '#FF6B6B', 3);
        drawPoints(expensePoints, '#FF6B6B');
        
        // Handle month selector change
        document.querySelector('.month-selector').addEventListener('change', function(e) {
            // Here you can add logic to change data based on selection
            console.log('Selected period:', e.target.value);
        });