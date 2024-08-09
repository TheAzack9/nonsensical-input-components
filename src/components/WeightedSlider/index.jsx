import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    --rotation: 0deg;
    transform: rotate(var(--rotation));
`;

const clamp = (x, min, max) => x <= min ? min : x >= max ? max : x;

export function WeightedSlider(props) {
    const {min = 0, max = 100.0, ...rest} = props;
    const sliderRef = useRef();
    
    useEffect(() => {
        let animate = true;

        let rotation = 0;
        let rotationalVelocity = 0;
        let sliderSpeed = 0;
        // let value = 50;

        let dragHandlerInstalled = false;
        let isDragging = false;

        let mouseStart = {x: 0, y: 0};

        let value = 50.0;

        const mouseMove = (e) => {
            if(!isDragging) return;
            const dx = e.clientX - mouseStart.x;
            const dy = e.clientY - mouseStart.y;

            if(Math.sqrt(dx * dx + dy * dy) < 10.0) return;
            
            const sn = Math.sign(dx);
            rotation = clamp(sn * Math.atan2(dy, sn * dx) / Math.PI * 180.0, -90.0, 90.0);
            rotationalVelocity = 0;
        } 
        document.addEventListener("mousemove", mouseMove);

        const mouseUp = () => { isDragging = false; }
        document.addEventListener("mouseup", mouseUp);
        
        const startDrag = (e) => {
            e.stopPropagation();
            e.preventDefault();
            isDragging = true;
            const bounds = e.target.getBoundingClientRect()
            mouseStart = {x: bounds.x + bounds.width / 2.0, y: bounds.y + bounds.height / 2.0};
        }

        const loop = () => {
            const slider = sliderRef.current;
            
            if(slider) {
                if(!dragHandlerInstalled) {
                    slider.addEventListener("mousedown", startDrag);
                    dragHandlerInstalled = true;
                }

                const hmm = rotation / 180 * Math.PI;
                
                // Gravity
                // if(!isDragging) {
                //     const dotHit = value / (max - min) - 0.5;
                //     rotationalVelocity += Math.cos(hmm) * dotHit * 1.0;
                //     rotationalVelocity *= 0.95;
                //     rotation += rotationalVelocity;
                // }
                // if(rotation > 180) rotation = 180;
                // if(rotation < -180) rotation = -180;
                sliderSpeed += Math.sin(hmm) * 2.0;
                sliderSpeed *= 0.95;
                // let value = slider.value;
                let nextValue = value;
                nextValue += sliderSpeed;
                if(nextValue > max) {
                    nextValue = max;
                    sliderSpeed = 0;
                }
                if(nextValue < min) {
                    nextValue = min;
                    sliderSpeed = 0;
                }
                
                if(Math.abs(value - nextValue) > 0.001) {
                    value = nextValue;
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        'value').set;
                    nativeInputValueSetter.call(slider, Math.round(value));
                    const event = new Event('change', { bubbles: true });
                    slider.dispatchEvent(event);
                    const event2 = new Event('input', { bubbles: true });
                    slider.dispatchEvent(event2);
                }
                slider.style = `--rotation: ${rotation}deg;`
            }
            if(animate) requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        return () => { 
            animate = false; 
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);

            if(!sliderRef.current) return;
            sliderRef.current.removeEventListener("onmousedown", startDrag);
        }
    }, [sliderRef, min, max]);

    return (
        <StyledInput {...rest} type="range" ref={sliderRef} min={min} max={max} />
    )
}