import React, { useEffect, useRef } from "react";
import './Template.css';
import { Box, Card, Typography } from "@mui/material";

export const Template = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const cordenadas = useRef<{
    startX: number,
    starty: number,
    lastX: number,
    lastY: number,
  }>
    ({
      startX: 0,
      starty: 0,
      lastX: 0,
      lastY: 0,
    })

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      cordenadas.current.startX = e.clientX;
      cordenadas.current.starty = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      cordenadas.current.lastX = box.offsetLeft;
      cordenadas.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - cordenadas.current.startX + cordenadas.current.lastX;
      const nextY = e.clientY - cordenadas.current.starty + cordenadas.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [])

  return (
    <main>
      <Box ref={containerRef} className="container">
        <Card ref={boxRef} className="box">
          <Typography className="text"> top: {cordenadas.current.lastY}</Typography>
          <Typography className="text"> left: {cordenadas.current.lastX}</Typography>
        </Card>
      </Box>
    </main>
  )
}