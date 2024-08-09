import { autoUpdate, offset, size, useFloating } from '@floating-ui/react';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { usePachinko } from '../../hooks/usePachinko';


const Wrapper = styled.span`
    display: inline-flex;
    gap: 10px;
    &[data-active="true"] {
        height: 150px
    }
`;

const RadioButton = styled.input`
    &[data-simulated="true"] {
        appearance: none;
        width: 13px;
        height: 13px;
        box-sizing: border-box;
        border: solid 1px #0075FF;
        margin: 3px 3px 0px 5px;
        position: relative;
        padding: initial;
        border-radius: 100%;
    }
`;

const CanvasWrapper = styled.div`
    width: 100%;
    height: 30px;
    overflow: hidden;
    transition-delay: 1s;
    transition-property: height;
    transition-duration: 1s;
    /* transition: height 1s; */
    &[data-active="true"] {
        height: 150px;
    }
    pointer-events: none;
`;

const Canvas = styled.canvas`
    width: 100%;
    height: 150px;
`;

export function PachinkoSelect(props) {
    const { name, options } = props;
    
    const [height, setHeight] = useState(30);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [realSelected, setRealSelected] = useState(-1);
    const radioButtonRefs = useRef({});

    const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    open: selectedIndex !== -1,
    onOpenChange: () => {},
    whileElementsMounted: autoUpdate,
    middleware: [
        offset({
            mainAxis: -height
        }),
        size({
        apply({ rects, elements }) {
            setHeight(rects.reference.height);
            Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            });
        },
        }),
    ],
    });

    const setActiveCheckbox = useCallback((index) => {
        setSelectedIndex(index);
        setRealSelected(index);
    }, [radioButtonRefs]);

    const onChange = useCallback((index) => {
        setSelectedIndex(-1);
        setRealSelected(index);
    });

    const { setCanvasRef } = usePachinko({ selectedIndex, options, onChange, radioButtonRefs, width: refs.floating?.current?.clientWidth, height: refs.floating?.current?.clientHeight });

    return (
        <>
            <Wrapper ref={refs.setReference} data-active={selectedIndex !== -1}>
                {options.map((option, index) => {
                    return (
                        <span key={index}>
                            <RadioButton ref={(ref) => radioButtonRefs.current[index] = ref} checked={realSelected === index} data-simulated={selectedIndex === index} type="radio" disabled={selectedIndex !== -1} id={option.value} name={name} value={option.value} onChange={() => setActiveCheckbox(index)} />
                            <label htmlFor={option.value}>{option.label}</label>
                        </span>                
                    )
                })}
            </Wrapper>
            <CanvasWrapper data-active={selectedIndex !== -1} ref={refs.setFloating} style={floatingStyles}>
                <Canvas ref={setCanvasRef} />
            </CanvasWrapper>
        </>
    )
}