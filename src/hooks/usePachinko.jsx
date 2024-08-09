import { Box, Circle, Line, Point, Polygon, SATVector, System } from 'detect-collisions'
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';

const SCALE_FACTOR = 2.0;


const placePegsInRect = (system, startX, startY, width, height, spacingX, spacingY) => {
  const pegs = []
  for (let y = startY; y < height; y += spacingY) {
    const idxY = Math.round(y / spacingY)
    for (let x = startX + spacingX / 2 * (idxY % 2); x < width; x += spacingX) {
      system.createCircle({x, y}, 3 * SCALE_FACTOR, {
        isStatic: true,
      });
    }
  }
  return pegs
}

const constructBoardPlygon = (width, height, optionCount) => {
  const y = height - 30
  const spikes = optionCount - 1;
  let increments = width / optionCount / 3;
  
  const points = [];

  // first
  for(let i = 0; i <= optionCount * 3; ++i) {
    const isSpike = (i % 3) == 0;
    points.push({ x: i * increments, y: isSpike ? y : (height - 4) });
  }
  points.push({x: width, y: height - 1 });
  points.push({x: 0, y: height - 1 });
  return points
}

export function usePachinko({ selectedIndex, options, onChange, radioButtonRefs, width, height }) {
    const [canvasRef, setCanvasRef] = useState(null);
    useLayoutEffect(() => {
        if(!canvasRef) return;
        const cwidth = canvasRef.clientWidth * SCALE_FACTOR;
        const cheight = canvasRef.clientHeight * SCALE_FACTOR;
        canvasRef.width = cwidth;
        canvasRef.height = cheight;

        const context = canvasRef?.getContext('2d');
        if(!context) return;

        const radioButton = radioButtonRefs?.current[selectedIndex];
        if(!radioButton) return;

        const system = new System();

        const containerRect = canvasRef.getBoundingClientRect();
        const radioButtonRect = radioButton.getBoundingClientRect();

        const radius = (radioButtonRect.width - 5.0);
        const x = radioButtonRect.x - containerRect.x + radioButtonRect.width / 2;
        const y = radioButtonRect.y - containerRect.y + radioButtonRect.height / 2;
        
        const ball = new Circle({x: x * SCALE_FACTOR, y: y * SCALE_FACTOR}, radius, {
          isCentered: true,
        });
        system.insert(ball);
        const ompfh = 5.0;
        let velocity = new SATVector(Math.random() * ompfh * 2.0 - ompfh, Math.random() * 2.0 * ompfh - ompfh);

        placePegsInRect(system, 0, cheight/3, cwidth, cheight / 3 * 2.5, 40, 30);


        system.createBox({x: 0, y: 0}, 2, cheight, {
          isStatic: true,
        });
        system.createBox({x: cwidth-2, y: 0}, 2, cheight, {
          isStatic: true,
        });

        system.createBox({x: 0, y: 0}, cwidth, 2, {
          isStatic: true,
        });
        system.createBox({x: 0, y: cheight-2}, cwidth, 2, {
          isStatic: true,
        });

        let isSettingUp = true;
        let setupPercentage = 0.0;
        

        system.createPolygon({x: 0, y: 0}, constructBoardPlygon(cwidth, cheight, options.length))

        ball.angle = Math.PI / 2;

        const triggers = [];
        for(let i = 0; i < options.length; ++i) {
          const w = cwidth / options.length;
          triggers.push(system.createBox({x: w * i, y: cheight-20}, w, 20, {
            isStatic: true,
            isTrigger: true,
          }))
        }
        
        const ref = setInterval(() => {
          context.clearRect(0, 0, cwidth, cheight);

          if(isSettingUp) {
            setupPercentage += 1.0/60.0 / 4.0;
            if(setupPercentage >= 1.0) {
              isSettingUp = false;
              setupPercentage = 1.0;
            }
          }
          
          if(!isSettingUp) {
            velocity.y += 0.1;
            
            ball.pos.add(velocity);
            ball.updateBody();
            ball.dirty = true;

            if(system.checkOne(ball, (collide) => {
              // velocity.reflectN(collide.overlapN);
              // velocity.x = 0;
              // velocity.y = 0;
              const trigger = collide.b;
              if(trigger.isTrigger ) {
                const index = triggers.indexOf(trigger);
                if(index === -1) return;
                onChange(index);
                return;
              }
              const normal = collide.overlapN.clone();
              normal.perp();
              velocity.reflect(normal);
              velocity.scale(0.9);

              ball.pos.sub(collide.overlapV);
            })) {
              console.log("Hit");
            }

            system.update();
          }

            context.strokeStyle = "black";
            system.traverse(x => {
              const isBall = x === ball;
              context.fillStyle = isBall ? "#0075FF" : "black";

              if(x.type === "Circle") {
                drawCircle(context, x, 1.0);
              }
              if(x.type === "Box") {
                // drawRectangleOutline(context, x);
              }
              if(x.type === "Polygon") {
                drawPolygon(context, x);
              }
              return false;
            })
            // system.data.children.forEach(x => {
            //   if(x.type === "Circle") {
            //     drawCircle(context, x);
            //   }
            // });
            // context.beginPath();
            // system.drawBVH(context);
            // context.stroke();
            // context.fillStyle = "#0075FF"
            // circleSpawn.vy += GRAVITY;
            // circleSpawn.y += circleSpawn.vy;
            // drawCircle(context, circleSpawn);
        }, 16);
        return () => clearInterval(ref);

    }, [canvasRef, options, onChange, selectedIndex, width, height])

    return {
        setCanvasRef,
    }
}


const drawCircle = (context, primitive, percentage) => {
  const { pos, r } = primitive
  context.beginPath();
  context.arc(pos.x, pos.y, r, 0, 2 * Math.PI * percentage);
  context.fill();
}

const strokeCircle = (context, primitive) => {
  const { x, y, radius } = primitive
  console.log("primitive", primitive);
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}

const drawPolygon = (context, primitive) => {
  const { points } = primitive
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach(point => {
    context.lineTo(point.x, point.y);
  }
  )
  context.fill();
}

const drawRectangleOutline = (context, primitive, percentage) => {
  const {pos, _width, _height } = primitive;
  const x = pos.x + 0.5;
  const y = pos.y + 0.5;
  const width = _width - 0.5;
  const height = _height - 0.5;
  context.lineWidth = 2.0;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.moveTo(x, y);
  // context.rect(pos.x, pos.y, _width, _height);
  context.stroke();
}

const drawLine = (context, primitive) => {
  const { x1, y1, x2, y2 } = primitive
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}