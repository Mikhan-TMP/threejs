'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useKeyboardControls, KeyboardControls, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { rotate, xor } from 'three/tsl'

enum Controls {
    forward = 'forward',
    backward = 'backward',
    left = 'left',
    right = 'right',
    run = 'run',
    crouch = 'crouch',
    jump = 'jump',
}

// 1. Define Obstacles Globally so both Character and Debug view can use them

const obstacles = [
    { x: 2, z: 0, width: .5, depth: 2 }, { x: 2, z: 2, width: .5, depth: 2 },{ x: 2, z: 4, width: .5, depth: 2 },{ x: 2, z: 6, width: .5, depth: 2 },{ x: 2.5, z: 7, width: .5, depth: .5 },{ x: 3, z: 7.5, width: .5, depth: .5 },{ x: 3.5, z: 8, width: .5, depth: .5 },{ x: 4, z: 8.5, width: .5, depth: .5 },{ x: 4.5, z: 9, width: .5, depth: .5 },{ x : 5, z: 9.5, width: .5, depth: .5 },{ x: 5.5, z: 10, width: .5, depth: .5 },{ x: 6, z: 10, width: .5, depth: .5 },{ x: 6.5, z: 10, width: .5, depth: .5 },{ x: 7, z: 10, width: .5, depth: .5 },{ x: 7.5, z: 10, width: .5, depth: .5 },{ x: 8, z: 10, width: .5, depth: .5 },{ x: 8.5, z: 10, width: .5, depth: .5 },{ x: 9, z: 10, width: .5, depth: .5 },{ x: 9.5, z: 10, width: .5, depth: .5 },{ x: 10, z: 10, width: .5, depth: .5 },{ x: 10.5, z: 10, width: .5, depth: .5 },{ x: 11, z: 10, width: .5, depth: .5 },{ x: 11.5, z: 10, width: .5, depth: .5 },{ x: 12, z: 10, width: .5, depth: .5 },{ x: 12.5, z: 10, width: .5, depth: .5 },{ x: 13, z: 10, width: .5, depth: .5 },{ x: 13.5, z: 10, width: .5, depth: .5 },{ x: 14, z: 10, width: .5, depth: .5 },{ x: 14.5, z: 10, width: .5, depth: .5 },{ x: 15, z: 10, width: .5, depth: .5 },{ x: 15.5, z: 10, width: .5, depth: .5 },{ x: 16, z: 10, width: .5, depth: .5 },{ x: 16.5, z: 10, width: .5, depth: .5 },{ x: 17, z: 10, width: .5, depth: .5 },{ x: 17.5, z: 10, width: .5, depth: .5 },{ x: 18, z: 10, width: .5, depth: .5 },{ x: 18.5, z: 10, width: .5, depth: .5 },{ x: 19, z: 10, width: .5, depth: .5 },{ x: 19.5, z: 10, width: .5, depth: .5 },{ x: 20, z: 10, width: .5, depth: .5 },{ x: 20.5, z: 10, width: .5, depth: .5 },{ x: 21, z: 10, width: .5, depth: .5 },{ x: 21.5, z: 10, width: .5, depth: .5 },{ x: 22, z: 10, width: .5, depth: .5 },{ x: 22.5, z: 10, width: .5, depth: .5 },{ x: 23, z: 10, width: .5, depth: .5 },{ x: 23.5, z: 10, width: .5, depth: .5 },{ x: 24, z: 10, width: .5, depth: .5 },{ x: 24.5, z: 10, width: .5, depth: .5 },{ x: 25, z: 10, width: .5, depth: .5 },{ x: 25, z: 10.5, width: .5, depth: .5 },{ x: 25, z: 11, width: .5, depth: .5 },{ x: 25, z: 11.5, width: .5, depth: .5 },{ x: 25, z: 12, width: .5, depth: .5 },{ x: 25, z: 12.5, width: .5, depth: .5 },{ x: 25, z: 13, width: .5, depth: .5 },{ x: 25, z: 13.5, width: .5, depth: .5 },{ x: 25, z: 14, width: .5, depth: .5 },{ x: 25, z: 14.5, width: .5, depth: .5 },{ x: 25, z: 15, width: .5, depth: .5 },{ x: 25, z: 15.5, width: .5, depth: .5 },{ x: 25, z: 16, width: .5, depth: .5 },{ x: 25, z: 16.5, width: .5, depth: .5 },{ x: 25, z: 17, width: .5, depth: .5 },{ x: 25, z: 17.5, width: .5, depth: .5 },{ x: 25, z: 18, width: .5, depth: .5 },{ x: 25, z: 18.5, width: .5, depth: .5 },{ x: 25, z: 19, width: .5, depth: .5 },{ x: 25, z: 19.5, width: .5, depth: .5 },{ x: 25, z: 20, width: .5, depth: .5 },{ x: 25, z: 20.5, width: .5, depth: .5 },{ x: 25, z: 21, width: .5, depth: .5 },{ x: 25, z: 21.5, width: .5, depth: .5 },{ x: 25, z: 22, width: .5, depth: .5 },{ x: 25, z: 22.5, width: .5, depth: .5 },{ x: 25, z: 23, width: .5, depth: .5 },{ x: 25, z: 23.5, width: .5, depth: .5 },{ x: 25, z: 24, width: .5, depth: .5 },
    { x: 25, z: 24.5, width: .5, depth: .5 },{ x: 25.5, z: 24.5, width: .5, depth: .5 },{ x: 26, z: 24.5, width: .5, depth: .5 },{ x: 26.5, z: 24.5, width: .5, depth: .5 },{ x: 27, z: 24.5, width: .5, depth: .5 },{ x: 27.5, z: 24.5, width: .5, depth: .5 },{ x: 28, z: 24.5, width: .5, depth: .5 },{ x: 28.5, z: 24.5, width: .5, depth: .5 },{ x: 29, z: 24.5, width: .5, depth: .5 },{ x: 29.5, z: 24.5, width: .5, depth: .5 },{ x: 30, z: 24.5, width: .5, depth: .5 },{ x: 30.5, z: 24.5, width: .5, depth: .5 },{ x: 31, z: 24.5, width: .5, depth: .5 },{ x: 31.5, z: 24.5, width: .5, depth: .5 },{ x: 32, z: 24.5, width: .5, depth: .5 },{ x: 32.5, z: 24.5, width: .5, depth: .5 },{ x: 33, z: 24.5, width: .5, depth: .5 },{ x: 33.5, z: 24.5, width: .5, depth: .5 },{ x: 34, z: 24.5, width: .5, depth: .5 },{ x: 34.5, z: 24.5, width: .5, depth: .5 },{ x: 35, z: 24.5, width: .5, depth: .5 },{ x: 35, z: 25, width: .5, depth: .5 },{ x: 35, z: 25.5, width: .5, depth: .5 },{ x: 35, z: 26, width: .5, depth: .5 },
    { x: 25, z: 26.5, width: .5, depth: .5 },{ x: 25.5, z: 26.5, width: .5, depth: .5 },{ x: 26, z: 26.5, width: .5, depth: .5 },{ x: 26.5, z: 26.5, width: .5, depth: .5 },{ x: 27, z: 26.5, width: .5, depth: .5 },{ x: 27.5, z: 26.5, width: .5, depth: .5 },{ x: 28, z: 26.5, width: .5, depth: .5 },{ x: 28.5, z: 26.5, width: .5, depth: .5 },{ x: 29, z: 26.5, width: .5, depth: .5 },{ x: 29.5, z: 26.5, width: .5, depth: .5 },{ x: 30, z: 26.5, width: .5, depth: .5 },{ x: 30.5, z: 26.5, width: .5, depth: .5 },{ x: 31, z: 26.5, width: .5, depth: .5 },{ x: 31.5, z: 26.5, width: .5, depth: .5 },{ x: 32, z: 26.5, width: .5, depth: .5 },{ x: 32, z: 27, width: .5, depth: .5 },{ x: 32, z: 27.5, width: .5, depth: .5 },{ x: 32, z: 28, width: .5, depth: .5 },{ x: 32, z: 28.5, width: .5, depth: .5 },{ x: 32, z: 29, width: .5, depth: .5 },{ x: 32, z: 29.5, width: .5, depth: .5 },{ x: 32, z: 30, width: .5, depth: .5 },{ x: 32, z: 30.5, width: .5, depth: .5 },{ x: 32, z: 31, width: .5, depth: .5 },{ x: 32, z: 31.5, width: .5, depth: .5 },{ x: 32, z: 32, width: .5, depth: .5 },{ x: 32, z: 32.5, width: .5, depth: .5 },{ x: 32, z: 33, width: .5, depth: .5 },{ x: 32, z: 33.5, width: .5, depth: .5 },{ x: 32, z: 34, width: .5, depth: .5 },{ x: 32, z: 34.5, width: .5, depth: .5 },{ x: 32, z: 35, width: .5, depth: .5 },{ x: 32, z: 35.5, width: .5, depth: .5 },{ x: 32, z: 36, width: .5, depth: .5 },{ x: 32, z: 36.5, width: .5, depth: .5 },
    { x: 35, z: 26.5, width: .5, depth: .5 },{ x: 35, z: 27, width: .5, depth: .5 },{ x: 35, z: 27.5, width: .5, depth: .5 },{ x: 35, z: 28, width: .5, depth: .5 },{ x: 35, z: 28.5, width: .5, depth: .5 },{ x: 35, z: 29, width: .5, depth: .5 },{ x: 35, z: 29.5, width: .5, depth: .5 },{ x: 35, z: 30, width: .5, depth: .5 },{ x: 35, z: 30.5, width: .5, depth: .5 },{ x: 35, z: 31, width: .5, depth: .5 },{ x: 35, z: 31.5, width: .5, depth: .5 },{ x: 35, z: 32, width: .5, depth: .5 },{ x: 35, z: 32.5, width: .5, depth: .5 },{ x: 35, z: 33, width: .5, depth: .5 },{ x: 35, z: 33.5, width: .5, depth: .5 },{ x: 35, z: 34, width: .5, depth: .5 },{ x: 35, z: 34.5, width: .5, depth: .5 },{ x: 35, z: 35, width: .5, depth: .5 },{ x: 35, z: 35.5, width: .5, depth: .5 },{ x: 35, z: 36, width: .5, depth: .5 },{ x: 35, z: 36.5, width: .5, depth: .5 },
    { x: 25, z: 27, width: .5, depth: .5 },{ x: 25, z: 27.5, width: .5, depth: .5 },{ x: 25, z: 28, width: .5, depth: .5 },{ x: 25, z: 28.5, width: .5, depth: .5 },{ x: 25, z: 29, width: .5, depth: .5 },{ x: 25, z: 29.5, width: .5, depth: .5 },{ x: 25, z: 30, width: .5, depth: .5 },{ x: 25, z: 30.5, width: .5, depth: .5 },{ x: 25, z: 31, width: .5, depth: .5 },{ x: 25, z: 31.5, width: .5, depth: .5 },{ x: 25, z: 32, width: .5, depth: .5 },{ x: 25, z: 32.5, width: .5, depth: .5 },{ x: 25, z: 33, width: .5, depth: .5 },{ x: 25, z: 33.5, width: .5, depth: .5 },{ x: 25, z: 34, width: .5, depth: .5 },{ x: 25, z: 34.5, width: .5, depth: .5 },{ x: 25, z: 35, width: .5, depth: .5 },{ x: 25, z: 35.5, width: .5, depth: .5 },{ x: 25, z: 36, width: .5, depth: .5 },{ x: 25, z: 36.5, width: .5, depth: .5 },{ x: 25.5, z: 36.5, width: .5, depth: .5 },{ x: 26, z: 36.5, width: .5, depth: .5 },{ x: 26.5, z: 36.5, width: .5, depth: .5 },{ x: 27, z: 36.5, width: .5, depth: .5 },{ x: 27.5, z: 36.5, width: .5, depth: .5 },{ x: 28, z: 36.5, width: .5, depth: .5 },{ x: 28.5, z: 36.5, width: .5, depth: .5 },{ x: 29, z: 36.5, width: .5, depth: .5 },{ x: 29.5, z: 36.5, width: .5, depth: .5 },{ x: 30, z: 36.5, width: .5, depth: .5 },{ x: 30.5, z: 36.5, width: .5, depth: .5 },{ x: 31, z: 36.5, width: .5, depth: .5 },{ x: 31.5, z: 36.5, width: .5, depth: .5 },
    { x: 25, z: 38.5, width: .5, depth: .5 },{ x: 25, z: 39, width: .5, depth: .5 },{ x: 25, z: 39.5, width: .5, depth: .5 },{ x: 25, z: 40, width: .5, depth: .5 },{ x: 25, z: 40.5, width: .5, depth: .5 },{ x: 25, z: 41, width: .5, depth: .5 },{ x: 25, z: 41.5, width: .5, depth: .5 },{ x: 25, z: 42, width: .5, depth: .5 },{ x: 25, z: 42.5, width: .5, depth: .5 },{ x: 25, z: 43, width: .5, depth: .5 },{ x: 25, z: 43.5, width: .5, depth: .5 },{ x: 25, z: 44, width: .5, depth: .5 },{ x: 25, z: 44.5, width: .5, depth: .5 },{ x: 25, z: 45, width: .5, depth: .5 },{ x: 25, z: 45.5, width: .5, depth: .5 },{ x: 25, z: 46, width: .5, depth: .5 },{ x: 25, z: 46.5, width: .5, depth: .5 },{ x: 25, z: 47, width: .5, depth: .5 },{ x: 25, z: 47.5, width: .5, depth: .5 },{ x: 25, z: 48, width: .5, depth: .5 },{ x: 25, z: 48.5, width: .5, depth: .5 },{ x: 25, z: 49, width: .5, depth: .5 },{ x: 25, z: 49.5, width: .5, depth: .5 },{ x: 25.5, z: 38.5, width: .5, depth: .5 }, { x: 26, z: 38.5, width: .5, depth: .5 },{ x: 26.5, z: 38.5, width: .5, depth: .5 },{ x: 27, z: 38.5, width: .5, depth: .5 },{ x: 27.5, z: 38.5, width: .5, depth: .5 },{ x: 28, z: 38.5, width: .5, depth: .5 },{ x: 28.5, z: 38.5, width: .5, depth: .5 },{ x: 29, z: 38.5, width: .5, depth: .5 },{ x: 29.5, z: 38.5, width: .5, depth: .5 }, { x: 30, z: 38.5, width: .5, depth: .5 }, { x: 30.5, z: 38.5, width: .5, depth: .5 },{ x: 31, z: 38.5, width: .5, depth: .5 },{ x: 31.5, z: 38.5, width: .5, depth: .5 },{ x: 32, z: 38.5, width: .5, depth: .5 },{ x: 32, z: 39, width: .5, depth: .5 },{ x: 32, z: 39.5, width: .5, depth: .5 },{ x: 32, z: 40, width: .5, depth: .5 },{ x: 32, z: 40.5, width: .5, depth: .5 },{ x: 32, z: 41, width: .5, depth: .5 },{ x: 32, z: 41.5, width: .5, depth: .5 },{ x: 32, z: 42, width: .5, depth: .5 },{ x: 32, z: 42.5, width: .5, depth: .5 },{ x: 32, z: 43, width: .5, depth: .5 },{ x: 32, z: 43.5, width: .5, depth: .5 },{ x: 32, z: 44, width: .5, depth: .5 },{ x: 32, z: 44.5, width: .5, depth: .5 },{ x: 32, z: 45, width: .5, depth: .5 },{ x: 32, z: 45.5, width: .5, depth: .5 },{ x: 32, z: 46, width: .5, depth: .5 },{ x: 32, z: 46.5, width: .5, depth: .5 },{ x: 32, z: 47, width: .5, depth: .5 },{ x: 32, z: 47.5, width: .5, depth: .5 },{ x: 32, z: 48, width: .5, depth: .5 },{ x: 32, z: 48.5, width: .5, depth: .5 },{ x: 32, z: 49, width: .5, depth: .5 },{ x: 32, z: 49.5, width: .5, depth: .5 },
    { x: 35, z: 37, width: .5, depth: .5 },{ x: 35, z: 37.5, width: .5, depth: .5 },{ x: 35, z: 38, width: .5, depth: .5 },{ x: 35, z: 38.5, width: .5, depth: .5 },{ x: 35, z: 39, width: .5, depth: .5 },{ x: 35, z: 39.5, width: .5, depth: .5 },{ x: 35, z: 40, width: .5, depth: .5 },{ x: 35, z: 40.5, width: .5, depth: .5 },{ x: 35, z: 41, width: .5, depth: .5 },{ x: 35, z: 41.5, width: .5, depth: .5 },{ x: 35, z: 42, width: .5, depth: .5 },{ x: 35, z: 42.5, width: .5, depth: .5 },{ x: 35, z: 43, width: .5, depth: .5 },{ x: 35, z: 43.5, width: .5, depth: .5 },{ x: 35, z: 44, width: .5, depth: .5 },{ x: 35, z: 44.5, width: .5, depth: .5 },{ x: 35, z: 45, width: .5, depth: .5 },{ x: 35, z: 45.5, width: .5, depth: .5 },{ x: 35, z: 46, width: .5, depth: .5 },{ x: 35, z: 46.5, width: .5, depth: .5 },{ x: 35, z: 47, width: .5, depth: .5 },{ x: 35, z: 47.5, width: .5, depth: .5 },{ x: 35, z: 48, width: .5, depth: .5 },{ x: 35, z: 48.5, width: .5, depth: .5 },{ x: 35, z: 49, width: .5, depth: .5 },{ x: 35, z: 49.5, width: .5, depth: .5 },
    { x: -2, z: 0, width: .5, depth: 2 }, 
    { x: -2, z: 2, width: .5, depth: 2 },
    { x: -2, z: 4, width: .5, depth: 2 },
    { x: -2, z: 6, width: .5, depth: 2 },
    { x: -2, z: 8, width: .5, depth: 2 },
    { x: -2, z: 10, width: .5, depth: 2 },
    { x: -2, z: 12, width: .5, depth: 2 },
    { x: -2, z: 13.5, width: .5, depth: 1 },
    { x: -1.50, z: 13.75, width: .5, depth: .5 },
    { x: -1, z: 13.75, width: .5, depth: .5 },
    { x: -0.5, z: 13.75, width: .5, depth: .5 },
    { x: 0, z: 13.75, width: .5, depth: .5 },
    { x: 0.5, z: 13.75, width: .5, depth: .5 },
    { x: 1, z: 13.75, width: .5, depth: .5 },
    { x: 1.5, z: 13.75, width: .5, depth: .5 },
    { x: 2, z: 13.75, width: .5, depth: .5 },
    { x: 2.5, z: 13.75, width: .5, depth: .5 },
    { x: 3, z: 13.75, width: .5, depth: .5 },
    { x: 3.5, z: 13.75, width: .5, depth: .5 },
    { x: 4, z: 13.75, width: .5, depth: .5 },
    { x: 4.5, z: 13.75, width: .5, depth: .5 },
    { x: 5, z: 13.75, width: .5, depth: .5 },
    { x: 5.5, z: 13.75, width: .5, depth: .5 },
    { x: 6, z: 13.75, width: .5, depth: .5 },
    { x: 6.5, z: 13.75, width: .5, depth: .5 },
    { x: 7, z: 13.75, width: .5, depth: .5 },
    { x: 7.5, z: 13.75, width: .5, depth: .5 },
    { x: 8, z: 13.75, width: .5, depth: .5 },
    { x: 8.5, z: 13.75, width: .5, depth: .5 },
    { x: 9, z: 13.75, width: .5, depth: .5 },
    { x: 9.5, z: 13.75, width: .5, depth: .5 },
    { x: 10, z: 13.75, width: .5, depth: .5 },
    { x: 10.5, z: 13.75, width: .5, depth: .5 },
    { x: 11, z: 13.75, width: .5, depth: .5 },
    { x: 11.5, z: 13.75, width: .5, depth: .5 },
    { x: 12, z: 13.75, width: .5, depth: .5 },
    { x: 12.5, z: 13.75, width: .5, depth: .5 },
    { x: 13, z: 13.75, width: .5, depth: .5 },
    { x: 13.5, z: 13.75, width: .5, depth: .5 },
    { x: 14, z: 13.75, width: .5, depth: .5 },
    { x: 14.5, z: 13.75, width: .5, depth: .5 },
    { x: 15, z: 13.75, width: .5, depth: .5 },
    { x: 15.5, z: 13.75, width: .5, depth: .5 },
    { x: 16, z: 13.75, width: .5, depth: .5 },
    { x: 16.5, z: 13.75, width: .5, depth: .5 },
    { x: 17, z: 13.75, width: .5, depth: .5 },
    { x: 17.5, z: 13.75, width: .5, depth: .5 },
    { x: 18, z: 13.75, width: .5, depth: .5 },
    { x: 18.5, z: 13.75, width: .5, depth: .5 },
    { x: 19, z: 13.75, width: .5, depth: .5 },
    { x: 19.5, z: 13.75, width: .5, depth: .5 },
    { x: 20, z: 13.75, width: .5, depth: .5 },
    { x: 20.5, z: 13.75, width: .5, depth: .5 },
    { x: 21, z: 13.75, width: .5, depth: .5 },

    { x: 21, z: 14.25, width: .5, depth: .5 },
    { x: 21, z: 14.75, width: .5, depth: .5 },
    { x: 21, z: 15.25, width: .5, depth: .5 },
    { x: 21, z: 15.75, width: .5, depth: .5 },
    { x: 21, z: 16.25, width: .5, depth: .5 },
    { x: 21, z: 16.75, width: .5, depth: .5 },
    { x: 21, z: 17.25, width: .5, depth: .5 },
    { x: 21, z: 17.75, width: .5, depth: .5 },
    { x: 21, z: 18.25, width: .5, depth: .5 },
    { x: 21, z: 18.75, width: .5, depth: .5 },
    { x: 21, z: 19.25, width: .5, depth: .5 },
    { x: 21, z: 19.75, width: .5, depth: .5 },
    { x: 21, z: 20.25, width: .5, depth: .5 },
    { x: 21, z: 20.75, width: .5, depth: .5 },
    { x: 21, z: 21.25, width: .5, depth: .5 },
    { x: 21, z: 21.75, width: .5, depth: .5 },
    { x: 21, z: 22.25, width: .5, depth: .5 },
    { x: 21, z: 22.75, width: .5, depth: .5 },
    { x: 21, z: 23.25, width: .5, depth: .5 },
    { x: 21, z: 23.75, width: .5, depth: .5 },
    { x: 21, z: 24.25, width: .5, depth: .5 },
    { x: 21, z: 24.75, width: .5, depth: .5 },
    { x: 21, z: 25.25, width: .5, depth: .5 },
    { x: 21, z: 25.75, width: .5, depth: .5 },
    { x: 21, z: 26.25, width: .5, depth: .5 },
    { x: 21, z: 26.75, width: .5, depth: .5 },
    { x: 21, z: 27.25, width: .5, depth: .5 },
    { x: 21, z: 27.75, width: .5, depth: .5 },
    { x: 21, z: 28.25, width: .5, depth: .5 },
    { x: 21, z: 28.75, width: .5, depth: .5 },
    { x: 21, z: 29.25, width: .5, depth: .5 },
    { x: 21, z: 29.75, width: .5, depth: .5 },
    { x: 21, z: 30.25, width: .5, depth: .5 },

    { x: 21, z: 32.75, width: .5, depth: .5 },
    { x: 21, z: 33.25, width: .5, depth: .5 },
    { x: 21, z: 33.75, width: .5, depth: .5 },
    { x: 21, z: 34.25, width: .5, depth: .5 },
    { x: 21, z: 34.75, width: .5, depth: .5 },
    { x: 21, z: 35.25, width: .5, depth: .5 },
    { x: 21, z: 35.75, width: .5, depth: .5 },
    { x: 21, z: 36.25, width: .5, depth: .5 },
    { x: 21, z: 36.75, width: .5, depth: .5 },



]
const Character = ({ debugRef }: { debugRef: React.RefObject<HTMLDivElement | null> }) => {
    const ref = useRef<THREE.Group>(null)
    
    // 1. Load Walking animation
    const { scene, animations: walkAnimations } = useGLTF('/Model/male_slow_walk_40_frames_loop.glb')
    
    // 2. Load Idle 1 
    const { animations: idleAnimations } = useGLTF('/Model/idle_1_male_free_animation_200_frames_loop.glb') 

    // 3. Load Idle 2
    const { animations: idle2Animations } = useGLTF('/Model/idle_2_male_free_animation_220_frames_loop.glb') 

    // 4. Load Running animation
    const { animations: runAnimations } = useGLTF('/Model/male_running_20_frames_loop.glb')

    // Rename clips for easy access
    if (walkAnimations.length > 0) walkAnimations[0].name = 'Walk'
    if (idleAnimations.length > 0) idleAnimations[0].name = 'Idle'
    if (idle2Animations.length > 0) idle2Animations[0].name = 'Idle2'
    if (runAnimations.length > 0) runAnimations[0].name = 'Run'

    // Combine all animations
    const { actions } = useAnimations([...walkAnimations, ...idleAnimations, ...idle2Animations, ...runAnimations], ref)

    // Subscribe to keyboard controls
    const [, get] = useKeyboardControls<Controls>()
    
    // Track current animation state
    const [animation, setAnimation] = useState('Idle')
    
    // Jump state
    const jumpState = useRef({ 
        isJumping: false, 
        velocityY: 0,
        groundY: 0
    })

    // Handle Animation Transitions & Idle Switching
    useEffect(() => {
        const actionName = (animation === 'Crouch') ? 'Walk' : animation
        const action = actions[actionName]
        
        if (action) {
            action.reset().fadeIn(0.2).play()
            
            if (animation === 'Crouch') action.timeScale = 0.5
            else action.timeScale = 1.0

            let timer: NodeJS.Timeout
            if (animation === 'Idle' || animation === 'Idle2') {
                const timeToSwitch = Math.random() * 4000 + 4000 
                timer = setTimeout(() => {
                    setAnimation(prev => prev === 'Idle' ? 'Idle2' : 'Idle')
                }, timeToSwitch)
            }

            return () => {
                action.fadeOut(0.2)
                if (timer) clearTimeout(timer)
            }
        }
    }, [animation, actions])

    // Initialize position once on mount
    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(0, 0, 0)
        }
    }, [])

    // --- Camera Control Logic ---
    const cameraState = useRef({ yaw: 0, pitch: 0.5 })

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                cameraState.current.yaw -= e.movementX * 0.002
                cameraState.current.pitch += e.movementY * 0.002
                // Clamp pitch to avoid flipping (limit vertical look)
                cameraState.current.pitch = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, cameraState.current.pitch))
            }
        }
        
        const onMouseDown = () => {
            // Lock pointer on click
            document.body.requestPointerLock()
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mousedown', onMouseDown)
        
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mousedown', onMouseDown)
        }
    }, [])

    useFrame((state, delta) => {
        if (!ref.current) return

        const { forward, backward, left, right, run, crouch, jump } = get()
        const isMoving = forward || backward || left || right
        
        let speed = 0
        let nextAnimation = 'Idle' // Default target

        // Handle Jump Input
        if (jump && !jumpState.current.isJumping) {
            jumpState.current.isJumping = true
            jumpState.current.velocityY = 8 // Initial jump velocity
            jumpState.current.groundY = ref.current.position.y
        }

        // Apply Gravity and Update Y Position
        if (jumpState.current.isJumping) {
            const gravity = -20 // Gravity acceleration
            jumpState.current.velocityY += gravity * delta
            ref.current.position.y += jumpState.current.velocityY * delta

            // Check if landed
            if (ref.current.position.y <= jumpState.current.groundY) {
                ref.current.position.y = jumpState.current.groundY
                jumpState.current.isJumping = false
                jumpState.current.velocityY = 0
            }
        }

        // Determine State and Speed
        if (jumpState.current.isJumping) {
            nextAnimation = 'Run' // Use running animation for jump
            speed = isMoving ? (run ? 8 * delta : delta * 5) : 0
        } else if (crouch) {
            nextAnimation = 'Crouch'
            speed = isMoving ? 2 * delta : 0
        } else if (run && isMoving) {
            nextAnimation = 'Run'
            speed = 8 * delta
        } else if (isMoving) {
            nextAnimation = 'Walk'
            speed = delta * 0.75
        }

        // NEW: If we are not moving, preserve the specific idle state (Idle or Idle2)
        // This prevents the loop from forcing it back to 'Idle' every frame
        if (nextAnimation === 'Idle' && (animation === 'Idle' || animation === 'Idle2')) {
            nextAnimation = animation
        }

        // Only trigger state update if animation actually changes
        if (nextAnimation !== animation) {
            setAnimation(nextAnimation)
        }

        const currentPos = ref.current.position
        const { yaw, pitch } = cameraState.current

        // 1. Calculate intended movement (Relative to Camera)
        let moveX = 0
        let moveZ = 0

        if (isMoving) {
            // Calculate input angle relative to "forward"
            // forward (W) = 0, backward (S) = PI, left (A) = PI/2, right (D) = -PI/2
            const inputAngle = Math.atan2(
                (left ? 1 : 0) - (right ? 1 : 0), 
                (forward ? 1 : 0) - (backward ? 1 : 0)
            )
            
            // Adjust for camera yaw. 
            // Camera is at 'yaw'. Character forward is 'yaw + PI'.
            const targetRotation = inputAngle + yaw + Math.PI
            
            // Smooth rotation
            let rotDiff = targetRotation - ref.current.rotation.y
            // Normalize angle to -PI..PI to take shortest turn
            while (rotDiff > Math.PI) rotDiff -= Math.PI * 2
            while (rotDiff < -Math.PI) rotDiff += Math.PI * 2
            
            ref.current.rotation.y += rotDiff * 10 * delta // Interpolate rotation

            // Move in the direction of the target rotation
            moveX = Math.sin(targetRotation) * speed
            moveZ = Math.cos(targetRotation) * speed
        }

        // 2. Define Obstacle Data (REMOVED LOCAL DEFINITION, USING GLOBAL)
        
        const characterRadius = 0.3 
        
        // Helper function to check collision against ALL obstacles
        const checkCollision = (x: number, z: number) => {
            return obstacles.some(obs => {
                const overlapX = x > obs.x - obs.width/2 - characterRadius && 
                                 x < obs.x + obs.width/2 + characterRadius 
                const overlapZ = z > obs.z - obs.depth/2 - characterRadius && 
                                 z < obs.z + obs.depth/2 + characterRadius
                return overlapX && overlapZ
            })
        }

        // 3. Check X Axis Collision
        const nextX = currentPos.x + moveX
        if (!checkCollision(nextX, currentPos.z)) {
            currentPos.x = nextX
        }

        // 4. Check Z Axis Collision
        const nextZ = currentPos.z + moveZ
        if (!checkCollision(currentPos.x, nextZ)) {
            currentPos.z = nextZ
        }

        // Update Debug Display
        if (debugRef.current) {
            debugRef.current.innerText = `X: ${currentPos.x.toFixed(2)}\nY: ${currentPos.y.toFixed(2)}\nZ: ${currentPos.z.toFixed(2)}`
        }
        
        // --- Camera Update ---
        const dist = 5
        // Calculate camera position relative to target based on spherical coordinates
        const camX = currentPos.x + dist * Math.sin(yaw) * Math.cos(pitch)
        const camZ = currentPos.z + dist * Math.cos(yaw) * Math.cos(pitch)
        const camY = currentPos.y + dist * Math.sin(pitch)

        // Smoothly move camera to new position
        state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.2)
        // Look slightly above the character's feet (at the head/torso)
        state.camera.lookAt(currentPos.x, currentPos.y + 1, currentPos.z)
    })

    return (
        <group ref={ref} dispose={null}>
            <primitive object={scene} />
        </group>
    )
}

const useTreeModel = () => {
  return useGLTF('/Nature/low_poly_tree_pack.glb')
}

const Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#444" />
        </mesh>
    )
}

const ObstacleDebug = () => {
    return (
        <group>
            {obstacles.map((obs, i) => (
                <mesh key={i} position={[obs.x, 0.5, obs.z]}>
                    <boxGeometry args={[obs.width, 1, obs.depth]} />
                    <meshBasicMaterial color="cyan" wireframe />
                </mesh>
            ))}
        </group>
    )
}

const ThreeTrees = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_109' || name === 'Object_110'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const Tree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_106' || name === 'Object_107'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const Tree2 = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_103' || name === 'Object_104'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const BigTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_101' || name === 'Object_100' || name === 'Object_99'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const RoundTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_96' || name === 'Object_95' || name === 'Object_97'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const BigRoundTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_90' || name === 'Object_91' || name === 'Object_92'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const PineTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_86' || name === 'Object_87' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const BiggerRoundTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_84' || name === 'Object_83' || name === 'Object_82' ){
                    return <primitive key={name} object={node} />
                }   
            })}
        </group>
    )
}

const Cloud = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_74' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const Cloud2 = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_68' || name === 'Object_69' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const Tree3 = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_64' || name === 'Object_63' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const PineTree2 = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_61' || name === 'Object_60' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const PineTree3 = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_58' || name === 'Object_57' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const LeafyTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_53' ||  
                    name === 'branch_wit' || 
                    name === 'Object_51' ||  
                    name === 'branch_w07' ||  
                    name === 'Object_49' ||  
                    name === 'Object_47' ||  
                    name === 'Object_45' ||  
                    name === 'Object_43' ||  
                    name === 'Object_41' ||  
                    name === 'Object_39' ||  
                    name === 'Object_54' || 
                    name === 'Object_55'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const ThinThree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_34' || // 
                    name === 'Object_32' || // 
                    name === 'Object_31' || // 
                    name === 'Leaves_2_3' || // 
                    name === 'Object_29' || // 
                    name === 'Object_28' || // 
                    name === 'Leaves_2_2' || // THIN ASS TREE
                    name === 'Object_26' || // 
                    name === 'Object_25' || // 
                    name === 'Leaves_2_1' || // 
                    name === 'Object_35' || // 
                    name === 'Object_21' || // 
                    name === 'Object_19' || // 
                    name === 'Object_22' 
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const GoodTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_15' || // NC DAMN TREE
                    name === 'Object_14'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

const LeavelessTree = () => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_6' || 
                    name === 'Object_5'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export default function Main() {
const debugRef = useRef<HTMLDivElement>(null)
const map = [
    { name: Controls.forward, keys: ['ArrowUp', 'w', 'W'] },
    { name: Controls.backward, keys: ['ArrowDown', 's', 'S'] },
    { name: Controls.left, keys: ['ArrowLeft', 'a', 'A'] },
    { name: Controls.right, keys: ['ArrowRight', 'd', 'D'] },
    { name: Controls.run, keys: ['Shift'] },
    { name: Controls.crouch, keys: ['Control'] },
    { name: Controls.jump, keys: [' '] },
]

return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <div 
        ref={debugRef} 
        style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            color: 'white', 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            padding: '10px', 
            borderRadius: '5px',
            zIndex: 999,
            pointerEvents: 'none',
            whiteSpace: 'pre-line',
            fontFamily: 'monospace'
        }}
    >
        Position Info
    </div>
    <KeyboardControls map={map}>
        <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
        />
        
        <Character debugRef={debugRef} />
        <Ground />
        <ThreeTrees />
        <Tree />
        <Tree2 />
        <BigTree />
        <RoundTree />
        <BigRoundTree />
        <PineTree />
        <BiggerRoundTree />
        <Cloud />
        <Cloud2 />
        <Tree3 />
        <PineTree2 />
        <PineTree3 />
        <LeafyTree />
        <ThinThree />
        <GoodTree />
        <LeavelessTree />

        
        {/* Add the debug view here */}
        <ObstacleDebug />

        <gridHelper args={[100, 100]} />
        </Canvas>
    </KeyboardControls>
    </div>
)
}