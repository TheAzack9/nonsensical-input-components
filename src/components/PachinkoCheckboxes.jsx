import { Box, Circle, Line, Point, Polygon, System } from 'detect-collisions'
import React, { useEffect, useRef } from 'react'


const createCircle = (x, y, radius) => (
  {
    shape: "circle",
    x,
    y,
    radius,
    friction: 0.9
  }
)

const createLine = (x1, y1, x2, y2) => (
  {
    shape: "line",
    x1,
    y1,
    x2,
    y2,
    friction: 0.5
  }
)

const createPolygon = (points) => (
  {
    shape: "polygon",
    points,
    friction: 0.5
  }
)
const collideCircleToCircle = (circle1, circle2) => {
  const system = new System()
  const satCircle1 = new Circle({ x: circle1.x, y: circle1.y }, circle1.radius)
  const satCircle2 = new Circle({ x: circle2.x, y: circle2.y }, circle2.radius)
  if (system.checkCollision(satCircle1, satCircle2)) {
    const response = system.response
    console.log(response)
    return {
      isColliding: true,
      nX: -response.overlapN.x,
      nY: -response.overlapN.y,
      distance: response.overlap
    }
  }

  return {
    isColliding: false,
  }
}

const collideLineToCircle = (line, circle) => {
  const { x1, y1, x2, y2 } = line
  const { x, y, radius } = circle

  const system = new System()
  const satCircle = new Circle({ x, y }, radius)
  const satLine = new Line({ x: x1, y: y1 }, { x: x2, y: y2 })

  if (system.checkCollision(satCircle, satLine)) {
    const response = system.response
    return {
      isColliding: true,
      nX: -response.overlapN.x,
      nY: -response.overlapN.y,
      distance: response.overlap
    }
  }

  return {
    isColliding: false,
  }
}

const collidePolygonToCircle = (polygon, circle) => {
  const { points } = polygon
  const { x, y, radius } = circle

  const system = new System()
  const satCircle = new Circle({ x, y }, radius)
  const satPolygon = new Polygon({ x: 0, y: 0 }, points)


  if (system.checkCollision(satCircle, satPolygon)) {
    const response = system.response
    return {
      isColliding: true,
      nX: -response.overlapN.x,
      nY: -response.overlapN.y,
      distance: response.overlap
    }
  }

  return {
    isColliding: false,
  }
}

const collidePointToRectangle = (point, rectangle) => {
  const { x, y } = point
  const { x1, y1, width, height } = rectangle

  const system = new System()
  const satPoint = new Point({ x, y })
  const satRectangle = new Box({ x: x1, y: y1 }, width, height)


  if (system.checkCollision(satPoint, satRectangle)) {
    const response = system.response
    return {
      isColliding: true,
      nX: -response.overlapN.x,
      nY: -response.overlapN.y,
      distance: response.overlap
    }
  }

  return {
    isColliding: false,
  }
}

const checkForCollision = (primitive1, primitive2) => {
  if (primitive1.shape === "circle" && primitive2.shape === "circle") {
    return collideCircleToCircle(primitive1, primitive2)
  }

  if ((primitive1.shape === "line" && primitive2.shape === "circle") || (primitive1.shape === "circle" && primitive2.shape === "line")) {
    if (primitive1.shape === "line")
      return collideLineToCircle(primitive1, primitive2)

    return collideLineToCircle(primitive2, primitive1)
  }

  if ((primitive1.shape === "polygon" && primitive2.shape === "circle") || (primitive1.shape === "circle" && primitive2.shape === "polygon")) {
    if (primitive1.shape === "polygon")
      return collidePolygonToCircle(primitive1, primitive2)

    return collidePolygonToCircle(primitive2, primitive1)
  }

  return {
    isColliding: false
  }
}

const constructBoardPlygon = (width, height) => {
  const y = height / 6 * 5
  const thirdW = width / 6
  const points = [
    { x: 0, y },
    { x: thirdW, y: height },
    { x: thirdW * 2, y: height },
    { x: thirdW * 3, y: y },
    { x: thirdW * 4, y: height },
    { x: thirdW * 5, y: height },
    { x: thirdW * 6, y: y },
    { x: thirdW * 6, y: height + 10 },
    { x: 0, y: height + 10 },
  ]

  return createPolygon(points)
}

function PachinkoCheckbox({ }) {
  const canvasRef = useRef(null)
  const circleActor = useRef({
    ...createCircle(200 * Math.random(), 20, 12),
    velX: 2 * Math.random() - 1.0,
    velY: 0
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d');
    let lastClick = {x: null, y: null}
    let lastHover = {x: null, y: null}

    const onClick = (e) => {
      lastClick = {x: e.offsetX, y: e.offsetY}
    }

    const onHover = (e) => {
      lastHover = {x: e.offsetX, y: e.offsetY}
      console.log(e)
    }

    if (context != null) {
      const interval = setInterval(() => {
        canvas.addEventListener("click", onClick)
        canvas.addEventListener("mousemove", onHover)
        render(context, lastClick, lastHover);
        lastClick = null;
      }, 1000 / 60);
      return () => {
        clearInterval(interval)
        canvas.removeEventListener("click", onClick)
        canvas.removeEventListener("mousemove", onHover)
      }
    }
  }, []);

  function render(context, lastClick, lastHover) {
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);

    const primitiveBuffer = placePegsInRect(5, height / 3, width, height / 3 * 2, 60, 30);
    const circle = circleActor.current;
    circle.velY = circle.velY + 0.1;

    const board = constructBoardPlygon(width, height);

    primitiveBuffer.push(board)
    handleStaticCollision(circle, primitiveBuffer);


    if (circle.x < circle.radius) {
      circle.velX *= -1;
      circle.x = circle.radius
    }

    if (circle.x > width - circle.radius) {
      circle.velX *= -1;
      circle.x = width - circle.radius
    }

    circle.y += circle.velY
    circle.x += circle.velX


    drawCircle(context, circle);

    drawPolygon(context, board);

    drawPrimitiveBuffer(context, primitiveBuffer)

    context.lineWidth = 2

    radioButton(context, 34, 28, "Yes", lastHover, lastClick)
    radioButton(context, 220, 28, "No", lastHover, lastClick)

    // context.fillStyle = "blue"
    // context.strokeStyle = "blue"
    // strokeCircle(context, createCircle(34, 25, 18));
    // // drawCircle(context, createCircle(34, 25, 12));
    // context.fillStyle = "black"

    // strokeCircle(context, createCircle(188, 25, 18));
    // // drawCircle(context, createCircle(188, 25, 12));
    // drawText(context, "No", 230, 40)
  }

  const radioButton = (context, x, y, text, lastHover, lastClick) => {
    const isHovered = collidePointToRectangle({ x: lastHover.x, y: lastHover.y }, { x: x-18, y: y-18, width: 150, height: 36 }).isColliding

    console.log("text", isHovered)

    const circle = circleActor.current;

    const isSelected = collidePointToRectangle({ x: lastClick?.x || -100, y: lastClick?.y || -100 }, { x: x-18, y: y-18, width: 150, height: 36 }).isColliding; 
    if(isSelected) {
      circle.x = x
      circle.y = y
      circle.velX = Math.random() * 2 - 1
      circle.velY = 0;
    }

    if(isSelected || isHovered) {
      context.fillStyle = "blue"
      context.strokeStyle = "blue"
    }
    else {
      context.fillStyle = "black"
      context.strokeStyle = "black"
    }
    strokeCircle(context, createCircle(x, y, 18));
    if(isSelected) {
      // drawCircle(context, createCircle(x, y, 12));
    }
    
    context.fillStyle = "black"
    context.strokeStyle = "black"
    drawText(context, text, x+44, y + 15)
  }


  const handleStaticCollision = (dynamicPrimitive, staticPrimitiveBuffer) => {
    staticPrimitiveBuffer.forEach(staticPrimitive => {
      const collision = checkForCollision(dynamicPrimitive, staticPrimitive)
      if (!collision.isColliding) return;
      const { nX, nY, distance } = collision
      const { velX, velY } = dynamicPrimitive

      const velocity = Math.sqrt(velX * velX + velY * velY) * staticPrimitive.friction;

      dynamicPrimitive.x += nX * (distance)
      dynamicPrimitive.y += nY * (distance)
      dynamicPrimitive.velX = nX * velocity;
      dynamicPrimitive.velY = nY * velocity;
    })
  }


  const placePegsInRect = (startX, startY, width, height, spacingX, spacingY) => {
    const pegs = []
    for (let y = startY; y < height; y += spacingY) {
      const idxY = Math.round(y / spacingY)
      for (let x = startX + spacingX / 2 * (idxY % 2); x < width; x += spacingX) {
        pegs.push(createCircle(x, y, 6))
      }
    }
    return pegs
  }

  const drawPrimitiveBuffer = (context, primitiveBuffer) => {
    primitiveBuffer.forEach(primitive => {
      drawPrimitive(context, primitive);
    })
  }


  const drawPrimitive = (context, primitive) => {
    switch (primitive.shape) {
      case "circle":
        drawCircle(context, primitive);
        break;
      case "line":
        drawLine(context, primitive);
        break;
      case "polygon":
        drawPolygon(context, primitive);
        break;
      default:
        throw Error(`Invalid primitive type "${primitive.shape}"`)
    }
  }

  const drawCircle = (context, primitive) => {
    const { x, y, radius } = primitive
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }

  const strokeCircle = (context, primitive) => {
    const { x, y, radius } = primitive
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

  const drawLine = (context, primitive) => {
    const { x1, y1, x2, y2 } = primitive
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }


  const drawRectangleOutline = (context, x, y, w, h) => {
    context.beginPath();
    context.rect(x, y, w, h);
    context.stroke();
  }

  const drawText = (context, text, x, y) => {
    context.font = '48px system-ui';
    context.fillText(text, x, y)
  }

  const drawRoundedRectangle = (context, x, y, w, h, r) => {
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + w - r, y);
    context.quadraticCurveTo(x + w, y, x + w, y + r);
    context.lineTo(x + w, y + h - r);
    context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    context.lineTo(x + r, y + h);
    context.quadraticCurveTo(x, y + h, x, y + h - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.stroke();
  }


  return (
    <div>
      <div>Receive hourly notification email?</div>
      <div>
        <canvas id="testing" ref={canvasRef} height={240} width={360}></canvas>
        <div>
          <span>
          Yes
          </span>
          <span>No</span>
          </div>
      </div>
    </div>
  )
}

export default PachinkoCheckbox