import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// Removed Tweakpane import - no settings panel needed
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Preloader from './Preloader';
import { animateScrambleText } from '@/utils/scrambleText';
import './ImageSlider.css';

interface SlideData {
  title: string;
  description: string;
  number: string;
  paragraphLines: string[];
  image: string;
  featuredImage?: string; // Optional featured image for center
}

interface ImageSliderProps {
  slides: SlideData[];
}

function hexToRgb(hex: string): [number, number, number] {
  if (hex.startsWith('#')) {
    return [
      Number.parseInt(hex.slice(1, 3), 16),
      Number.parseInt(hex.slice(3, 5), 16),
      Number.parseInt(hex.slice(5, 7), 16),
    ];
  }
  const match = hex.match(/\d+/g);
  return match
    ? [
        Number.parseInt(match[0]),
        Number.parseInt(match[1]),
        Number.parseInt(match[2]),
      ]
    : [255, 255, 255];
}

const ImageSlider = ({ slides }: ImageSliderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const handleNavigationRef = useRef<((direction: 'up' | 'down') => void) | null>(null);
  const stateRef = useRef<{
    currentImageIndex: number;
    isTransitioning: boolean;
    scrollingEnabled: boolean;
    lastScrollTimestamp: number;
    touchStartPosition: number;
    isTouchActive: boolean;
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    shaderMaterial: THREE.ShaderMaterial | null;
    slideTextures: THREE.Texture[];
    texturesLoaded: boolean;
    startTime: number;
  }>({
    currentImageIndex: 0,
    isTransitioning: false,
    scrollingEnabled: false,
    lastScrollTimestamp: 0,
    touchStartPosition: 0,
    isTouchActive: false,
    renderer: null,
    scene: null,
    camera: null,
    shaderMaterial: null,
    slideTextures: [],
    texturesLoaded: false,
    startTime: Date.now(),
  });

  useEffect(() => {
    if (!sliderRef.current || !canvasRef.current || slides.length === 0) return;

    const slider = sliderRef.current;
    const state = stateRef.current;
    const imageCollection = slides.map((slide) => slide.image);
    
    if (!slider || !canvasRef.current) return;

    const slideData = slides.map((slide, index) => ({
      title: slide.title,
      description: slide.description,
      number: slide.number || `∅${index + 1}`,
      paragraphLines: slide.paragraphLines || [],
      featuredImage: slide.featuredImage, // Include featured image
      prompt: '',
      caption: '',
    }));

    // Enhanced configuration with all settings including Analog Decay
    const config = {
      totalImages: imageCollection.length,
      transitionDuration: 1.8,
      scrollThrottleDelay: 1000,
      touchThreshold: 10,
      // Current state
      currentEffect: "datamosh",
      currentEffectPreset: "Default",
      // Global settings that affect all effects
      globalIntensity: 1.0,
      speedMultiplier: 1.0,
      colorShiftAmount: 0.3,
      distortionStrength: 1.0,
      noiseLevel: 0.5,
      // Effect-specific settings
      datamoshBlockSize: 1.0,
      datamoshCorruptionFreq: 1.0,
      datamoshQuantization: 1.0,
      datamoshDisplacement: 1.0,
      datamoshTemporal: 1.0,
      pixelSortDirection: 0.5,
      pixelSortThreshold: 1.0,
      pixelSortBandWidth: 1.0,
      pixelSortSeparation: 1.0,
      pixelSortSensitivity: 1.0,
      staticDensity: 1.0,
      staticWaveSpeed: 1.0,
      staticAnalogNoise: 1.0,
      staticChannelShift: 1.0,
      staticFlicker: 1.0,
      sweepWidth: 1.0,
      sweepLayers: 1.0,
      sweepChromaticAberration: 1.0,
      sweepEdgeGlow: 1.0,
      sweepFadeTiming: 1.0,
      wipeAngle: 0.0,
      wipeAberrationStrength: 1.0,
      wipeEdgeWidth: 1.0,
      wipeColorBleeding: 1.0,
      wipeTransitionCurve: 1.0,
      // Analog Decay settings
      analogGrain: 1.0,
      analogBleeding: 1.0,
      analogVSync: 1.0,
      analogScanlines: 1.0,
      analogVignette: 1.0,
      analogJitter: 1.0,
      analogChroma: 1.0
    };

    // Effect presets including Analog Decay
    const effectPresets = {
      datamosh: {
        Subtle: {
          datamoshBlockSize: 1.5,
          datamoshCorruptionFreq: 0.6,
          datamoshQuantization: 0.4,
          datamoshDisplacement: 0.3,
          datamoshTemporal: 0.8
        },
        Default: {
          datamoshBlockSize: 1.0,
          datamoshCorruptionFreq: 1.0,
          datamoshQuantization: 1.0,
          datamoshDisplacement: 1.0,
          datamoshTemporal: 1.0
        },
        Intense: {
          datamoshBlockSize: 0.5,
          datamoshCorruptionFreq: 1.8,
          datamoshQuantization: 1.6,
          datamoshDisplacement: 2.0,
          datamoshTemporal: 1.4
        },
        Minimal: {
          datamoshBlockSize: 2.0,
          datamoshCorruptionFreq: 0.3,
          datamoshQuantization: 0.2,
          datamoshDisplacement: 0.1,
          datamoshTemporal: 0.5
        }
      },
      pixelSort: {
        Gentle: {
          pixelSortDirection: 0.2,
          pixelSortThreshold: 0.6,
          pixelSortBandWidth: 1.4,
          pixelSortSeparation: 0.5,
          pixelSortSensitivity: 0.7
        },
        Default: {
          pixelSortDirection: 0.5,
          pixelSortThreshold: 1.0,
          pixelSortBandWidth: 1.0,
          pixelSortSeparation: 1.0,
          pixelSortSensitivity: 1.0
        },
        Chaos: {
          pixelSortDirection: 0.8,
          pixelSortThreshold: 1.5,
          pixelSortBandWidth: 0.6,
          pixelSortSeparation: 1.8,
          pixelSortSensitivity: 1.4
        },
        Ordered: {
          pixelSortDirection: 0.0,
          pixelSortThreshold: 0.8,
          pixelSortBandWidth: 1.8,
          pixelSortSeparation: 0.3,
          pixelSortSensitivity: 0.9
        }
      },
      digitalStatic: {
        Soft: {
          staticDensity: 0.6,
          staticWaveSpeed: 0.7,
          staticAnalogNoise: 0.5,
          staticChannelShift: 0.4,
          staticFlicker: 0.3
        },
        Default: {
          staticDensity: 1.0,
          staticWaveSpeed: 1.0,
          staticAnalogNoise: 1.0,
          staticChannelShift: 1.0,
          staticFlicker: 1.0
        },
        Storm: {
          staticDensity: 1.7,
          staticWaveSpeed: 2.0,
          staticAnalogNoise: 1.6,
          staticChannelShift: 1.8,
          staticFlicker: 1.5
        },
        Vintage: {
          staticDensity: 0.8,
          staticWaveSpeed: 0.4,
          staticAnalogNoise: 1.3,
          staticChannelShift: 0.2,
          staticFlicker: 0.8
        }
      },
      staticSweep: {
        Clean: {
          sweepWidth: 1.2,
          sweepLayers: 0.7,
          sweepChromaticAberration: 0.6,
          sweepEdgeGlow: 1.1,
          sweepFadeTiming: 0.8
        },
        Default: {
          sweepWidth: 1.0,
          sweepLayers: 1.0,
          sweepChromaticAberration: 1.0,
          sweepEdgeGlow: 1.0,
          sweepFadeTiming: 1.0
        },
        Brutal: {
          sweepWidth: 0.7,
          sweepLayers: 1.8,
          sweepChromaticAberration: 1.7,
          sweepEdgeGlow: 0.9,
          sweepFadeTiming: 1.5
        },
        Smooth: {
          sweepWidth: 1.5,
          sweepLayers: 0.5,
          sweepChromaticAberration: 0.4,
          sweepEdgeGlow: 1.3,
          sweepFadeTiming: 0.6
        }
      },
      glitchWipe: {
        Smooth: {
          wipeAngle: 15.0,
          wipeAberrationStrength: 0.6,
          wipeEdgeWidth: 1.3,
          wipeColorBleeding: 0.5,
          wipeTransitionCurve: 0.8
        },
        Default: {
          wipeAngle: 0.0,
          wipeAberrationStrength: 1.0,
          wipeEdgeWidth: 1.0,
          wipeColorBleeding: 1.0,
          wipeTransitionCurve: 1.0
        },
        Aggressive: {
          wipeAngle: -25.0,
          wipeAberrationStrength: 1.8,
          wipeEdgeWidth: 0.7,
          wipeColorBleeding: 1.6,
          wipeTransitionCurve: 1.4
        },
        Diagonal: {
          wipeAngle: 35.0,
          wipeAberrationStrength: 1.2,
          wipeEdgeWidth: 0.9,
          wipeColorBleeding: 1.1,
          wipeTransitionCurve: 1.1
        }
      },
      analogDecay: {
        Vintage: {
          analogGrain: 0.7,
          analogBleeding: 0.5,
          analogVSync: 0.3,
          analogScanlines: 0.8,
          analogVignette: 1.2,
          analogJitter: 0.4,
          analogChroma: 0.6
        },
        Default: {
          analogGrain: 1.0,
          analogBleeding: 1.0,
          analogVSync: 1.0,
          analogScanlines: 1.0,
          analogVignette: 1.0,
          analogJitter: 1.0,
          analogChroma: 1.0
        },
        Corrupted: {
          analogGrain: 1.8,
          analogBleeding: 1.6,
          analogVSync: 2.0,
          analogScanlines: 1.4,
          analogVignette: 0.8,
          analogJitter: 1.8,
          analogChroma: 1.5
        },
        Minimal: {
          analogGrain: 0.3,
          analogBleeding: 0.2,
          analogVSync: 0.1,
          analogScanlines: 0.5,
          analogVignette: 1.5,
          analogJitter: 0.2,
          analogChroma: 0.3
        }
      }
    };

    // Initialize state
    state.currentImageIndex = 0;
    state.isTransitioning = false;
    state.scrollingEnabled = false;
    state.lastScrollTimestamp = 0;
    state.touchStartPosition = 0;
    state.isTouchActive = false;
    state.renderer = null;
    state.scene = null;
    state.camera = null;
    state.shaderMaterial = null;
    state.slideTextures = [];
    state.texturesLoaded = false;
    state.startTime = Date.now();

    // Removed Tweakpane - no settings panel needed

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution;
      uniform vec2 uTexture1Size;
      uniform vec2 uTexture2Size;
      uniform float uTime;
      uniform int uEffectType;
      
      // Enhanced settings uniforms
      uniform float uGlobalIntensity;
      uniform float uSpeedMultiplier;
      uniform float uColorShiftAmount;
      uniform float uDistortionStrength;
      uniform float uNoiseLevel;
      
      // Datamosh uniforms
      uniform float uDatamoshBlockSize;
      uniform float uDatamoshCorruptionFreq;
      uniform float uDatamoshQuantization;
      uniform float uDatamoshDisplacement;
      uniform float uDatamoshTemporal;
      
      // Pixel Sort uniforms
      uniform float uPixelSortDirection;
      uniform float uPixelSortThreshold;
      uniform float uPixelSortBandWidth;
      uniform float uPixelSortSeparation;
      uniform float uPixelSortSensitivity;
      
      // Digital Static uniforms
      uniform float uStaticDensity;
      uniform float uStaticWaveSpeed;
      uniform float uStaticAnalogNoise;
      uniform float uStaticChannelShift;
      uniform float uStaticFlicker;
      
      // Static Sweep uniforms
      uniform float uSweepWidth;
      uniform float uSweepLayers;
      uniform float uSweepChromaticAberration;
      uniform float uSweepEdgeGlow;
      uniform float uSweepFadeTiming;
      
      // Glitch Wipe uniforms
      uniform float uWipeAngle;
      uniform float uWipeAberrationStrength;
      uniform float uWipeEdgeWidth;
      uniform float uWipeColorBleeding;
      uniform float uWipeTransitionCurve;
      
      // Analog Decay uniforms
      uniform float uAnalogGrain;
      uniform float uAnalogBleeding;
      uniform float uAnalogVSync;
      uniform float uAnalogDropout;
      uniform float uAnalogScanlines;
      uniform float uAnalogVignette;
      uniform float uAnalogJitter;
      uniform float uAnalogChroma;
      
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float random(float x) {
        return fract(sin(x) * 43758.5453123);
      }

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
      }

      vec4 sampleTexture(sampler2D tex, vec2 uv, vec2 texSize) {
        vec2 coverUV = getCoverUV(uv, texSize);
        coverUV = clamp(coverUV, 0.0, 1.0);
        return texture2D(tex, coverUV);
      }

      vec4 applyWhiteGlitchOverlay(vec4 color, vec2 uv, float intensity, float effectType) {
        float time = uTime * uSpeedMultiplier * 2.0;
        
        float glitchSize = 1500.0;
        vec2 glitchUV = floor(uv * glitchSize) / glitchSize;
        float glitchRandom = random(glitchUV + floor(time * 12.0));
        
        float whiteGlitch = step(0.98, glitchRandom) * uNoiseLevel;
        
        float fineNoise = random(uv * 3000.0 + time * 0.5);
        float whiteNoise = step(0.995, fineNoise) * uNoiseLevel;
        
        float scanlineGlitch = 0.0;
        float scanY = floor(uv.y * 800.0);
        float scanRandom = random(vec2(scanY, floor(time * 8.0)));
        if (scanRandom > 0.99) {
          float scanlineNoise = random(uv * vec2(2000.0, 1.0) + time);
          scanlineGlitch = step(0.7, scanlineNoise) * 0.3 * uNoiseLevel;
        }
        
        float glitchIntensity = 0.4 * uGlobalIntensity;
        
        float totalWhiteGlitch = (whiteGlitch + whiteNoise + scanlineGlitch) * glitchIntensity * intensity;
        
        vec3 result = color.rgb;
        result = mix(result, vec3(1.0), totalWhiteGlitch * 0.6);
        
        float grain = (random(uv * 2500.0 + time * 0.1) - 0.5) * 0.03 * uNoiseLevel;
        result += vec3(grain) * glitchIntensity * intensity;
        
        return vec4(result, color.a);
      }

      // Enhanced Datamosh Effect
      vec4 datamoshEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        float time = uTime * uSpeedMultiplier * 2.0 * uDatamoshTemporal;
        
        float corruptionIntensity;
        if (progress < 0.3) {
          corruptionIntensity = smoothstep(0.0, 0.3, progress);
        } else if (progress < 0.7) {
          corruptionIntensity = 1.0;
        } else {
          corruptionIntensity = 1.0 - smoothstep(0.7, 1.0, progress);
        }
        
        vec2 blockSize = vec2(32.0, 24.0) * uDatamoshBlockSize;
        vec2 blockUV = floor(uv * blockSize) / blockSize;
        float blockRand = random(blockUV);
        
        float corruptionThreshold = 1.0 - corruptionIntensity * 1.4 * uDatamoshCorruptionFreq;
        float isCorrupted = step(corruptionThreshold, blockRand) * corruptionIntensity;
        
        vec2 distortion = vec2(
          sin(blockRand * 6.28 + time * 3.0) * 0.075,
          cos(blockRand * 4.71 + time * 2.5) * 0.06
        ) * isCorrupted * uDatamoshDisplacement * uDistortionStrength;
        
        vec4 sourceImg = mix(img2, img1, step(progress, 0.5));
        vec4 corruptedImg;
        if (progress < 0.5) {
          corruptedImg = sampleTexture(uTexture1, uv + distortion, uTexture1Size);
        } else {
          corruptedImg = sampleTexture(uTexture2, uv + distortion, uTexture2Size);
        }
        
        if (isCorrupted > 0.1) {
          float colorCorrupt = random(blockUV.x + time * 0.1) * uColorShiftAmount;
          if (colorCorrupt < 0.3) {
            corruptedImg.rgb = corruptedImg.gbr;
          } else if (colorCorrupt < 0.6) {
            corruptedImg.rgb = corruptedImg.brg;
          }
          
          float quantLevels = 6.0 / uDatamoshQuantization;
          corruptedImg.rgb = floor(corruptedImg.rgb * quantLevels) / quantLevels;
        }
        
        vec4 result = mix(sourceImg, corruptedImg, isCorrupted);
        
        float finalBlend = smoothstep(0.0, 1.0, progress);
        if (corruptionIntensity < 0.1) {
          result = mix(img1, img2, finalBlend);
        }
        
        result = applyWhiteGlitchOverlay(result, uv, corruptionIntensity * 0.8 * uGlobalIntensity, 0.0);
        
        return result;
      }

      // Enhanced Pixel Sort Effect
      vec4 pixelSortEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        float time = uTime * uSpeedMultiplier * 1.5;
        
        float sortIntensity;
        if (progress < 0.2) {
          sortIntensity = smoothstep(0.0, 0.2, progress);
        } else if (progress < 0.8) {
          sortIntensity = 1.0;
        } else {
          sortIntensity = 1.0 - smoothstep(0.8, 1.0, progress);
        }
        
        float bandHeight = 0.08 * uPixelSortBandWidth;
        float bandIndex = floor(uv.y / bandHeight);
        float bandRandom = random(bandIndex + floor(time * 0.5));
        
        float sortThreshold = 1.0 - sortIntensity * uPixelSortThreshold;
        float shouldSort = step(sortThreshold, bandRandom);
        
        float imageMorphProgress = smoothstep(0.0, 1.0, progress);
        vec4 baseImg = mix(img1, img2, imageMorphProgress);
        
        vec2 sortedUV = uv;
        vec4 result = baseImg;
        
        if (shouldSort > 0.5 && sortIntensity > 0.1) {
          vec4 sortingSample1 = sampleTexture(uTexture1, uv, uTexture1Size);
          vec4 sortingSample2 = sampleTexture(uTexture2, uv, uTexture2Size);
          vec4 sortingSample = mix(sortingSample1, sortingSample2, imageMorphProgress);
          
          float brightness = dot(sortingSample.rgb, vec3(0.299, 0.587, 0.114)) * uPixelSortSensitivity;
          
          float sortDirection = mix(-1.0, 1.0, uPixelSortDirection);
          float sortOffset = (brightness - 0.5) * 0.25 * sortIntensity * sortDirection * uDistortionStrength;
          sortOffset += sin(uv.y * 15.0 + time * 2.0) * 0.08 * sortIntensity;
          
          sortedUV.x += sortOffset;
          
          vec4 sortedImg1 = sampleTexture(uTexture1, sortedUV, uTexture1Size);
          vec4 sortedImg2 = sampleTexture(uTexture2, sortedUV, uTexture2Size);
          vec4 sortedImg = mix(sortedImg1, sortedImg2, imageMorphProgress);
          
          float separation = 0.015 * sortIntensity * uPixelSortSeparation;
          
          vec4 sample1_r = sampleTexture(uTexture1, sortedUV + vec2(separation, 0.0), uTexture1Size);
          vec4 sample2_r = sampleTexture(uTexture2, sortedUV + vec2(separation, 0.0), uTexture2Size);
          float r = mix(sample1_r.r, sample2_r.r, imageMorphProgress);
          
          vec4 sample1_g = sampleTexture(uTexture1, sortedUV, uTexture1Size);
          vec4 sample2_g = sampleTexture(uTexture2, sortedUV, uTexture2Size);
          float g = mix(sample1_g.g, sample2_g.g, imageMorphProgress);
          
          vec4 sample1_b = sampleTexture(uTexture1, sortedUV - vec2(separation, 0.0), uTexture1Size);
          vec4 sample2_b = sampleTexture(uTexture2, sortedUV - vec2(separation, 0.0), uTexture2Size);
          float b = mix(sample1_b.b, sample2_b.b, imageMorphProgress);
          
          sortedImg = vec4(r, g, b, 1.0);
          
          result = sortedImg;
        }
        
        if (sortIntensity < 0.1) {
          result = mix(img1, img2, imageMorphProgress);
        }
        
        result = applyWhiteGlitchOverlay(result, uv, sortIntensity * 0.6 * uGlobalIntensity, 1.0);
        
        return result;
      }

      // Enhanced Digital Static Effect
      vec4 digitalStaticEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        float time = uTime * uSpeedMultiplier * 3.0 * uStaticWaveSpeed;
        
        float wavePos = progress * 1.4 - 0.2;
        float waveWidth = 0.3;
        float distanceFromWave = abs(uv.y - wavePos);
        float staticIntensity = 1.0 - smoothstep(0.0, waveWidth, distanceFromWave);
        
        float noise = random(uv * uResolution.xy + time * 0.1) * uStaticDensity;
        float staticMask = step(0.3, noise) * staticIntensity;
        
        float analogNoise = random(uv * 500.0 + time * 0.05) - 0.5;
        analogNoise *= staticIntensity * uStaticAnalogNoise;
        
        vec4 staticImg = img2;
        if (staticIntensity > 0.1) {
          staticImg.rgb = mix(staticImg.rgb, vec3(noise), staticMask * 0.8);
          staticImg.rgb += analogNoise * 0.3;
          
          float shift = sin(time + uv.y * 10.0) * 0.02 * staticIntensity * uStaticChannelShift;
          float r = sampleTexture(uTexture2, uv + vec2(shift, 0.0), uTexture2Size).r;
          float g = sampleTexture(uTexture2, uv, uTexture2Size).g;
          float b = sampleTexture(uTexture2, uv - vec2(shift, 0.0), uTexture2Size).b;
          staticImg = vec4(r, g, b, 1.0);
          
          // Gradually fade flicker based on wave position and intensity
          float flickerFade = staticIntensity * smoothstep(0.8, 0.2, progress);
          float flicker = sin(time * 30.0) * 0.1 * uStaticFlicker * flickerFade;
          staticImg.rgb *= (1.0 + flicker);
        }
        
        float reveal = step(uv.y, wavePos + waveWidth * 0.5);
        vec4 result = mix(img1, staticImg, reveal);
        
        result = applyWhiteGlitchOverlay(result, uv, staticIntensity * uGlobalIntensity, 2.0);
        
        return result;
      }

      // Enhanced Static Sweep Effect
      vec4 staticSweepEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        if (progress < 0.01 || progress > 0.99) {
          return mix(img1, img2, smoothstep(0.0, 1.0, progress));
        }
        
        float time = uTime * uSpeedMultiplier * 2.5;
        
        float sweepPos = progress * 1.4 - 0.2;
        float isRevealed = step(uv.x, sweepPos);
        
        float distanceFromSweep = abs(uv.x - sweepPos);
        float effectZoneWidth = 0.25 * uSweepWidth;
        
        float adjustedProgress = pow(progress, uSweepFadeTiming);
        
        float masterIntensity;
        if (adjustedProgress < 0.15) {
          masterIntensity = smoothstep(0.0, 0.15, adjustedProgress) * 0.4;
        } else if (adjustedProgress < 0.35) {
          masterIntensity = 0.4 + smoothstep(0.15, 0.35, adjustedProgress) * 0.5;
        } else if (adjustedProgress < 0.65) {
          masterIntensity = 0.9 + sin(adjustedProgress * 20.0) * 0.1 * uSweepLayers;
        } else if (adjustedProgress < 0.85) {
          masterIntensity = 0.9 - smoothstep(0.65, 0.85, adjustedProgress) * 0.6;
        } else {
          masterIntensity = 0.3 - smoothstep(0.85, 1.0, adjustedProgress) * 0.25;
        }
        
        float baseEffectStrength = (1.0 - smoothstep(0.0, effectZoneWidth, distanceFromSweep)) * masterIntensity * uGlobalIntensity;
        
        float staticNoise1 = random(uv * 120.0 * uSweepLayers + time * 0.8);
        float staticNoise2 = random(uv * 200.0 + time * 1.3);
        float staticNoise3 = random(uv * 80.0 + time * 0.5);
        float combinedStatic = mix(mix(staticNoise1, staticNoise2, 0.6), staticNoise3, 0.3);
        
        float staticMask = step(0.3, combinedStatic) * baseEffectStrength;
        
        float analogNoise = (random(uv * 300.0 + time * 0.1) - 0.5) * 2.0;
        analogNoise *= random(vec2(time * 0.02)) * baseEffectStrength;
        
        float rgbSeparationAmount = 0.04 * baseEffectStrength * uSweepChromaticAberration;
        float rgbTimeOffset = time * 3.0 + uv.y * 12.0;
        
        vec2 rgbOffset1 = vec2(sin(rgbTimeOffset) * rgbSeparationAmount, 0.0);
        vec2 rgbOffset2 = vec2(-sin(rgbTimeOffset * 1.3) * rgbSeparationAmount * 0.7, 0.0);
        vec2 rgbOffset3 = vec2(cos(rgbTimeOffset * 0.8) * rgbSeparationAmount * 0.5, 0.0);
        
        vec4 currentImg = mix(img1, img2, isRevealed);
        
        if (baseEffectStrength > 0.05) {
          float r, g, b;
          
          if (isRevealed > 0.5) {
            r = sampleTexture(uTexture2, uv + rgbOffset1, uTexture2Size).r;
            g = sampleTexture(uTexture2, uv + rgbOffset2, uTexture2Size).g;
            b = sampleTexture(uTexture2, uv + rgbOffset3, uTexture2Size).b;
          } else {
            r = sampleTexture(uTexture1, uv + rgbOffset1, uTexture1Size).r;
            g = sampleTexture(uTexture1, uv + rgbOffset2, uTexture1Size).g;
            b = sampleTexture(uTexture1, uv + rgbOffset3, uTexture1Size).b;
          }
          
          vec4 glitchedImg = vec4(r, g, b, 1.0);
          
          glitchedImg.rgb = mix(glitchedImg.rgb, vec3(combinedStatic), staticMask * 0.7);
          glitchedImg.rgb += vec3(analogNoise) * 0.25;
          
          float edgeGlow = 1.0 - smoothstep(0.0, 0.02, distanceFromSweep);
          glitchedImg.rgb += vec3(0.8, 0.4, 1.0) * edgeGlow * 0.5 * masterIntensity * uSweepEdgeGlow;
          
          currentImg = mix(currentImg, glitchedImg, baseEffectStrength);
        }
        
        currentImg = applyWhiteGlitchOverlay(currentImg, uv, masterIntensity * 1.2 * uGlobalIntensity, 3.0);
        
        return currentImg;
      }

      // Enhanced Glitch Wipe Effect
      vec4 glitchWipeEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        if (progress < 0.01 || progress > 0.99) {
          return mix(img1, img2, smoothstep(0.0, 1.0, progress));
        }
        
        float time = uTime * uSpeedMultiplier * 2.0;
        
        vec2 wipeUV = uv;
        float angleRad = radians(uWipeAngle);
        mat2 rotation = mat2(cos(angleRad), -sin(angleRad), sin(angleRad), cos(angleRad));
        wipeUV = rotation * (wipeUV - 0.5) + 0.5;
        
        float curvedProgress = pow(progress, uWipeTransitionCurve);
        
        float wipePos = curvedProgress * 1.2 - 0.1;
        float wipeEdge = wipePos + sin(wipeUV.y * 20.0 + time) * 0.02;
        float isRevealed = step(wipeUV.x, wipeEdge);
        
        float distanceFromWipe = abs(wipeUV.x - wipeEdge);
        
        float caIntensity;
        if (curvedProgress < 0.2) {
          caIntensity = smoothstep(0.0, 0.2, curvedProgress);
        } else if (curvedProgress < 0.75) {
          caIntensity = 1.0;
        } else {
          caIntensity = 1.0 - smoothstep(0.75, 0.95, curvedProgress);
        }
        
        float caZone = (1.0 - smoothstep(0.0, 0.12 * uWipeEdgeWidth, distanceFromWipe)) * caIntensity * uGlobalIntensity;
        
        vec4 currentImg = mix(img1, img2, isRevealed);
        
        if (caZone > 0.05) {
          float baseShift = sin(time * 3.0 + wipeUV.y * 15.0) * 0.035 * caZone * uWipeAberrationStrength;
          float secondaryShift = cos(time * 2.0 + wipeUV.x * 10.0) * 0.02 * caZone;
          
          float totalShift = baseShift + secondaryShift;
          
          float bleeding = uWipeColorBleeding;
          
          float r, g, b;
          if (isRevealed > 0.5) {
            r = sampleTexture(uTexture2, uv + vec2(totalShift * 2.5 * bleeding, totalShift * 0.5), uTexture2Size).r;
            g = sampleTexture(uTexture2, uv + vec2(totalShift * 0.5, -totalShift * 0.3), uTexture2Size).g;
            b = sampleTexture(uTexture2, uv - vec2(totalShift * 2.0 * bleeding, totalShift * 0.7), uTexture2Size).b;
          } else {
            r = sampleTexture(uTexture1, uv + vec2(totalShift * 2.5 * bleeding, totalShift * 0.5), uTexture1Size).r;
            g = sampleTexture(uTexture1, uv + vec2(totalShift * 0.5, -totalShift * 0.3), uTexture1Size).g;
            b = sampleTexture(uTexture1, uv - vec2(totalShift * 2.0 * bleeding, totalShift * 0.7), uTexture1Size).b;
          }
          
          vec4 chromaticImg = vec4(r, g, b, 1.0);
          
          float edgeGlow = 1.0 - smoothstep(0.0, 0.015, distanceFromWipe);
          chromaticImg.rgb += vec3(1.0, 0.6, 0.9) * edgeGlow * 0.4 * caIntensity;
          
          float digitalNoise = random(uv * 200.0 + time * 0.1) * uNoiseLevel;
          chromaticImg.rgb += vec3(digitalNoise - 0.5) * 0.1 * caZone;
          
          currentImg = mix(currentImg, chromaticImg, caZone);
        }
        
        currentImg = applyWhiteGlitchOverlay(currentImg, uv, caIntensity * 0.9 * uGlobalIntensity, 4.0);
        
        return currentImg;
      }

      // NEW: Analog Decay Effect
      vec4 analogDecayEffect(vec2 uv, float progress) {
        vec4 img1 = sampleTexture(uTexture1, uv, uTexture1Size);
        vec4 img2 = sampleTexture(uTexture2, uv, uTexture2Size);
        
        float time = uTime * uSpeedMultiplier * 1.8;
        
        // Basic image transition
        float transitionMask = smoothstep(0.4, 0.6, progress + sin(uv.y * 8.0 + time) * 0.1);
        vec4 baseImg = mix(img1, img2, transitionMask);
        
        // Analog Jitter - temporal instability
        vec2 jitteredUV = uv;
        if (uAnalogJitter > 0.1) {
          float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter;
          jitteredUV.x += jitterAmount;
          jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter;
        }
        
        // VHS-style vertical sync roll
        if (uAnalogVSync > 0.1) {
          float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync;
          float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
          jitteredUV.y += vsyncRoll * vsyncChance;
        }
        
        vec4 currentImg = mix(baseImg, mix(
          sampleTexture(uTexture1, jitteredUV, uTexture1Size),
          sampleTexture(uTexture2, jitteredUV, uTexture2Size),
          transitionMask
        ), 0.8);
        
        // Film grain
        if (uAnalogGrain > 0.1) {
          float grain = (random(uv * 1500.0 + time * 0.1) - 0.5) * 0.15 * uAnalogGrain;
          currentImg.rgb += vec3(grain);
        }
        
        // Color bleeding/channel separation
        if (uAnalogBleeding > 0.1) {
          float bleedAmount = 0.008 * uAnalogBleeding;
          float offsetPhase = time * 1.5 + uv.y * 20.0;
          
          vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
          vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
          
          float r = mix(
            sampleTexture(uTexture1, jitteredUV + redOffset, uTexture1Size).r,
            sampleTexture(uTexture2, jitteredUV + redOffset, uTexture2Size).r,
            transitionMask
          );
          float g = currentImg.g;
          float b = mix(
            sampleTexture(uTexture1, jitteredUV + blueOffset, uTexture1Size).b,
            sampleTexture(uTexture2, jitteredUV + blueOffset, uTexture2Size).b,
            transitionMask
          );
          
          currentImg = vec4(r, g, b, 1.0);
        }
        
        // Scanlines
        if (uAnalogScanlines > 0.1) {
          float scanlinePattern = sin(uv.y * 800.0) * 0.5 + 0.5;
          float scanlineIntensity = 0.05 * uAnalogScanlines;
          currentImg.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        }
        
        // Random dropouts (signal loss areas)
        if (uAnalogDropout > 0.1) {
          float dropoutSize = 100.0;
          vec2 dropoutUV = floor(uv * dropoutSize) / dropoutSize;
          float dropoutRandom = random(dropoutUV + floor(time * 8.0));
          
          float dropoutThreshold = 1.0 - uAnalogDropout * 0.02;
          float isDropout = step(dropoutThreshold, dropoutRandom);
          
          if (isDropout > 0.5) {
            float dropoutNoise = random(uv * 500.0 + time);
            currentImg.rgb = mix(currentImg.rgb, vec3(dropoutNoise * 0.3), 0.8);
          }
        }
        
        // Chromatic aberration
        if (uAnalogChroma > 0.1) {
          float chromaAmount = 0.01 * uAnalogChroma;
          float chromaPhase = time * 0.5 + uv.x * 5.0;
          
          vec2 chromaOffset = vec2(cos(chromaPhase) * chromaAmount, sin(chromaPhase) * chromaAmount * 0.5);
          
          float r = mix(
            sampleTexture(uTexture1, jitteredUV + chromaOffset, uTexture1Size).r,
            sampleTexture(uTexture2, jitteredUV + chromaOffset, uTexture2Size).r,
            transitionMask
          );
          float g = currentImg.g;
          float b = mix(
            sampleTexture(uTexture1, jitteredUV - chromaOffset, uTexture1Size).b,
            sampleTexture(uTexture2, jitteredUV - chromaOffset, uTexture2Size).b,
            transitionMask
          );
          
          currentImg = vec4(r, g, b, 1.0);
        }
        
        // Vignetting
        if (uAnalogVignette > 0.1) {
          vec2 vignetteUV = (uv - 0.5) * 2.0;
          float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette;
          currentImg.rgb *= vignette;
        }
        
        // Final analog-style overlay
        currentImg = applyWhiteGlitchOverlay(currentImg, uv, 0.3 * uGlobalIntensity, 5.0);
        
        return currentImg;
      }

      void main() {
        if (uEffectType == 0) {
          gl_FragColor = datamoshEffect(vUv, uProgress);
        } else if (uEffectType == 1) {
          gl_FragColor = pixelSortEffect(vUv, uProgress);
        } else if (uEffectType == 2) {
          gl_FragColor = digitalStaticEffect(vUv, uProgress);
        } else if (uEffectType == 3) {
          gl_FragColor = staticSweepEffect(vUv, uProgress);
        } else if (uEffectType == 4) {
          gl_FragColor = glitchWipeEffect(vUv, uProgress);
        } else {
          gl_FragColor = analogDecayEffect(vUv, uProgress);
        }
      }
    `;

    function getEffectIndex(effectName) {
      const effectMap = {
        datamosh: 0,
        pixelSort: 1,
        digitalStatic: 2,
        staticSweep: 3,
        glitchWipe: 4,
        analogDecay: 5
      };
      return effectMap[effectName] || 0;
    }

    // Removed Tweakpane setup - no settings panel needed

    function updateShaderUniforms() {
      if (!state.shaderMaterial) return;

      const uniforms = state.shaderMaterial.uniforms;

      // Global uniforms
      if (uniforms.uGlobalIntensity)
        uniforms.uGlobalIntensity.value = config.globalIntensity;
      if (uniforms.uSpeedMultiplier)
        uniforms.uSpeedMultiplier.value = config.speedMultiplier;
      if (uniforms.uColorShiftAmount)
        uniforms.uColorShiftAmount.value = config.colorShiftAmount;
      if (uniforms.uDistortionStrength)
        uniforms.uDistortionStrength.value = config.distortionStrength;
      if (uniforms.uNoiseLevel) uniforms.uNoiseLevel.value = config.noiseLevel;

      // Effect-specific uniforms
      if (uniforms.uDatamoshBlockSize)
        uniforms.uDatamoshBlockSize.value = config.datamoshBlockSize;
      if (uniforms.uDatamoshCorruptionFreq)
        uniforms.uDatamoshCorruptionFreq.value = config.datamoshCorruptionFreq;
      if (uniforms.uDatamoshQuantization)
        uniforms.uDatamoshQuantization.value = config.datamoshQuantization;
      if (uniforms.uDatamoshDisplacement)
        uniforms.uDatamoshDisplacement.value = config.datamoshDisplacement;
      if (uniforms.uDatamoshTemporal)
        uniforms.uDatamoshTemporal.value = config.datamoshTemporal;

      if (uniforms.uPixelSortDirection)
        uniforms.uPixelSortDirection.value = config.pixelSortDirection;
      if (uniforms.uPixelSortThreshold)
        uniforms.uPixelSortThreshold.value = config.pixelSortThreshold;
      if (uniforms.uPixelSortBandWidth)
        uniforms.uPixelSortBandWidth.value = config.pixelSortBandWidth;
      if (uniforms.uPixelSortSeparation)
        uniforms.uPixelSortSeparation.value = config.pixelSortSeparation;
      if (uniforms.uPixelSortSensitivity)
        uniforms.uPixelSortSensitivity.value = config.pixelSortSensitivity;

      if (uniforms.uStaticDensity)
        uniforms.uStaticDensity.value = config.staticDensity;
      if (uniforms.uStaticWaveSpeed)
        uniforms.uStaticWaveSpeed.value = config.staticWaveSpeed;
      if (uniforms.uStaticAnalogNoise)
        uniforms.uStaticAnalogNoise.value = config.staticAnalogNoise;
      if (uniforms.uStaticChannelShift)
        uniforms.uStaticChannelShift.value = config.staticChannelShift;
      if (uniforms.uStaticFlicker)
        uniforms.uStaticFlicker.value = config.staticFlicker;

      if (uniforms.uSweepWidth) uniforms.uSweepWidth.value = config.sweepWidth;
      if (uniforms.uSweepLayers)
        uniforms.uSweepLayers.value = config.sweepLayers;
      if (uniforms.uSweepChromaticAberration)
        uniforms.uSweepChromaticAberration.value =
          config.sweepChromaticAberration;
      if (uniforms.uSweepEdgeGlow)
        uniforms.uSweepEdgeGlow.value = config.sweepEdgeGlow;
      if (uniforms.uSweepFadeTiming)
        uniforms.uSweepFadeTiming.value = config.sweepFadeTiming;

      if (uniforms.uWipeAngle) uniforms.uWipeAngle.value = config.wipeAngle;
      if (uniforms.uWipeAberrationStrength)
        uniforms.uWipeAberrationStrength.value = config.wipeAberrationStrength;
      if (uniforms.uWipeEdgeWidth)
        uniforms.uWipeEdgeWidth.value = config.wipeEdgeWidth;
      if (uniforms.uWipeColorBleeding)
        uniforms.uWipeColorBleeding.value = config.wipeColorBleeding;
      if (uniforms.uWipeTransitionCurve)
        uniforms.uWipeTransitionCurve.value = config.wipeTransitionCurve;

      // NEW: Analog Decay uniforms
      if (uniforms.uAnalogGrain)
        uniforms.uAnalogGrain.value = config.analogGrain;
      if (uniforms.uAnalogBleeding)
        uniforms.uAnalogBleeding.value = config.analogBleeding;
      if (uniforms.uAnalogVSync)
        uniforms.uAnalogVSync.value = config.analogVSync;
      if (uniforms.uAnalogDropout)
        if (uniforms.uAnalogScanlines)
          uniforms.uAnalogScanlines.value = config.analogScanlines;
      if (uniforms.uAnalogVignette)
        uniforms.uAnalogVignette.value = config.analogVignette;
      if (uniforms.uAnalogJitter)
        uniforms.uAnalogJitter.value = config.analogJitter;
      if (uniforms.uAnalogChroma)
        uniforms.uAnalogChroma.value = config.analogChroma;
    }

    function loadImageTexture(src) {
      return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        const timeout = setTimeout(() => reject(new Error("Timeout")), 10000);
        loader.load(
          src,
          (texture) => {
            clearTimeout(timeout);
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.userData = {
              size: new THREE.Vector2(texture.image.width, texture.image.height)
            };
            resolve(texture);
          },
          undefined,
          (error) => {
            clearTimeout(timeout);
            reject(error);
          }
        );
      });
    }

    function createFeaturedImageWrapper(imageIndex, transitionDirection) {
      const featuredWrapper = document.createElement("div");
      featuredWrapper.className = "featured-image-wrapper";
      featuredWrapper.setAttribute("data-featured-wrapper", "");
      const featuredImage = document.createElement("img");
      // Use featuredImage from slide data if provided, otherwise use next image
      const currentSlide = slideData[imageIndex];
      const featuredImageSrc = currentSlide?.featuredImage || imageCollection[(imageIndex + 1) % imageCollection.length];
      featuredImage.src = featuredImageSrc;
      featuredImage.alt = `Featured image ${imageIndex + 1}`;
      featuredWrapper.appendChild(featuredImage);

      const initialClipPath =
        transitionDirection === "down"
          ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
          : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      featuredWrapper.style.clipPath = initialClipPath;
      return featuredWrapper;
    }

    // Updated createTextElements with ScrambleText integration
    function createTextElements(slideIndex, transitionDirection) {
      const newNumber = document.createElement("span");
      newNumber.textContent = slideData[slideIndex].number;
      gsap.set(newNumber, {
        y: transitionDirection === "down" ? 20 : -20
      });

      const newTitle = document.createElement("h1");
      newTitle.textContent = slideData[slideIndex].title;
      gsap.set(newTitle, {
        y: transitionDirection === "down" ? 60 : -60
      });

      const newDescription = document.createElement("p");
      newDescription.textContent = slideData[slideIndex].description;
      gsap.set(newDescription, {
        y: transitionDirection === "down" ? 24 : -24
      });

      // Create paragraph lines with larger movement values
      const newParagraphLines = slideData[slideIndex].paragraphLines.map(
        (lineText, index) => {
          const lineSpan = document.createElement("span");
          lineSpan.textContent = lineText;
          gsap.set(lineSpan, {
            y: transitionDirection === "down" ? 35 : -35
          });
          return lineSpan;
        }
      );

      return {
        newNumber,
        newTitle,
        newDescription,
        newParagraphLines
      };
    }

    function getNextImageIndex(direction) {
      if (direction === "down") {
        return state.currentImageIndex === config.totalImages - 1
          ? 0
          : state.currentImageIndex + 1;
      } else {
        return state.currentImageIndex === 0
          ? config.totalImages - 1
          : state.currentImageIndex - 1;
      }
    }

    // Updated executeSlideTransition with ScrambleText integration
    function executeSlideTransition(transitionDirection) {
      if (
        state.isTransitioning ||
        !state.scrollingEnabled ||
        !state.texturesLoaded
      )
        return;

      state.isTransitioning = true;
      state.scrollingEnabled = false;

      const nextIndex = getNextImageIndex(transitionDirection);

      const currentTexture = state.slideTextures[state.currentImageIndex];
      const nextTexture = state.slideTextures[nextIndex];
      if (!currentTexture || !nextTexture) return;

      // Get DOM elements
      const featuredImageContainer = slider.querySelector(
        "[data-featured-image]"
      );
      const currentFeaturedWrapper = featuredImageContainer.querySelector(
        "[data-featured-wrapper]"
      );

      const numberContainer = slider.querySelector("[data-slide-number]");
      const titleContainer = slider.querySelector("[data-slide-title]");
      const descriptionContainer = slider.querySelector(
        "[data-slide-description]"
      );
      const paragraphLine1Container = slider.querySelector(
        "[data-paragraph-line-1]"
      );
      const paragraphLine2Container = slider.querySelector(
        "[data-paragraph-line-2]"
      );

      const currentNumber = numberContainer.querySelector("span");
      const currentTitle = titleContainer.querySelector("h1");
      const currentDescription = descriptionContainer.querySelector("p");
      const currentParagraphLine1 = paragraphLine1Container.querySelector(
        "span"
      );
      const currentParagraphLine2 = paragraphLine2Container.querySelector(
        "span"
      );

      // Create new elements
      const newFeaturedWrapper = createFeaturedImageWrapper(
        nextIndex,
        transitionDirection
      );
      const {
        newNumber,
        newTitle,
        newDescription,
        newParagraphLines
      } = createTextElements(nextIndex, transitionDirection);

      // Add new elements to DOM
      featuredImageContainer.appendChild(newFeaturedWrapper);
      numberContainer.appendChild(newNumber);
      titleContainer.appendChild(newTitle);
      descriptionContainer.appendChild(newDescription);
      paragraphLine1Container.appendChild(newParagraphLines[0]);
      paragraphLine2Container.appendChild(newParagraphLines[1]);

      // Set initial position for featured image
      gsap.set(newFeaturedWrapper.querySelector("img"), {
        y: transitionDirection === "down" ? "-50%" : "50%"
      });

      // Update shader uniforms
      state.shaderMaterial.uniforms.uTexture1.value = currentTexture;
      state.shaderMaterial.uniforms.uTexture2.value = nextTexture;
      state.shaderMaterial.uniforms.uTexture1Size.value =
        currentTexture.userData.size;
      state.shaderMaterial.uniforms.uTexture2Size.value =
        nextTexture.userData.size;

      state.currentImageIndex = nextIndex;

      // Create transition timeline with ScrambleText
      const transitionTimeline = gsap.timeline({
        onComplete: () => {
          // Cleanup old elements
          [
            currentFeaturedWrapper,
            currentNumber,
            currentTitle,
            currentDescription,
            currentParagraphLine1,
            currentParagraphLine2
          ].forEach((element) => {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          });

          // Reset shader
          state.shaderMaterial.uniforms.uProgress.value = 0;
          state.shaderMaterial.uniforms.uTexture1.value = nextTexture;
          state.shaderMaterial.uniforms.uTexture1Size.value =
            nextTexture.userData.size;

          state.isTransitioning = false;
          setTimeout(() => {
            state.scrollingEnabled = true;
            state.lastScrollTimestamp = Date.now();
          }, 100);
        }
      });

      const featuredClipPath =
        transitionDirection === "down"
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";

      // Background shader transition
      transitionTimeline.fromTo(
        state.shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );

      // Featured image transitions
      transitionTimeline.to(
        newFeaturedWrapper,
        {
          clipPath: featuredClipPath,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );

      transitionTimeline.to(
        currentFeaturedWrapper.querySelector("img"),
        {
          y: transitionDirection === "down" ? "50%" : "-50%",
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );

      transitionTimeline.to(
        newFeaturedWrapper.querySelector("img"),
        {
          y: "0%",
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );

      // Text transitions with ScrambleText + movement
      // Number with scramble
      transitionTimeline.to(
        currentNumber,
        {
          y: transitionDirection === "down" ? -20 : 20,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );
      transitionTimeline.to(
        newNumber,
        {
          y: 0,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0
      );
      transitionTimeline.call(() => {
        animateScrambleText(
          newNumber,
          slideData[nextIndex].number,
          "∅øΩ§∆◊¶†‡0123456789",
          0.8,
          0.3,
          0.4
        );
      }, null, 0.2);

      // Title with scramble
      transitionTimeline.to(
        currentTitle,
        {
          y: transitionDirection === "down" ? -60 : 60,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.02
      );
      transitionTimeline.to(
        newTitle,
        {
          y: 0,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.02
      );
      transitionTimeline.call(() => {
        animateScrambleText(
          newTitle,
          slideData[nextIndex].title,
          "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          1.2,
          0.4,
          0.3
        );
      }, null, 0.3);

      // Description with scramble
      transitionTimeline.to(
        currentDescription,
        {
          y: transitionDirection === "down" ? -24 : 24,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.04
      );
      transitionTimeline.to(
        newDescription,
        {
          y: 0,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.04
      );
      transitionTimeline.call(() => {
        animateScrambleText(
          newDescription,
          slideData[nextIndex].description,
          "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz",
          1.0,
          0.5,
          0.35
        );
      }, null, 0.4);

      // Paragraph Line 1 with scramble
      transitionTimeline.to(
        currentParagraphLine1,
        {
          y: transitionDirection === "down" ? -35 : 35,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.06
      );
      transitionTimeline.to(
        newParagraphLines[0],
        {
          y: 0,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.06
      );
      transitionTimeline.call(() => {
        animateScrambleText(
          newParagraphLines[0],
          slideData[nextIndex].paragraphLines[0],
          "01!<>-_\\/[]{}—=+*^?#________",
          1.4,
          0.6,
          0.25
        );
      }, null, 0.5);

      // Paragraph Line 2 with scramble
      transitionTimeline.to(
        currentParagraphLine2,
        {
          y: transitionDirection === "down" ? -35 : 35,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.08
      );
      transitionTimeline.to(
        newParagraphLines[1],
        {
          y: 0,
          duration: config.transitionDuration,
          ease: "cubic-bezier(0.77,0,0.18,1)"
        },
        0.08
      );
      transitionTimeline.call(() => {
        animateScrambleText(
          newParagraphLines[1],
          slideData[nextIndex].paragraphLines[1],
          "01!<>-_\\/[]{}—=+*^?#________",
          1.4,
          0.7,
          0.25
        );
      }, null, 0.6);
    }

    function handleScrollInteraction(scrollDirection: 'up' | 'down') {
      const currentTimestamp = Date.now();
      if (state.isTransitioning || !state.scrollingEnabled) return;
      if (
        currentTimestamp - state.lastScrollTimestamp <
        config.scrollThrottleDelay
      )
        return;

      state.lastScrollTimestamp = currentTimestamp;
      executeSlideTransition(scrollDirection);
    }

    // Expose navigation function for buttons
    handleNavigationRef.current = handleScrollInteraction;

    async function initializeRenderer() {
      const canvas = slider.querySelector("[data-webgl-canvas]");
      if (!canvas) return;

      state.scene = new THREE.Scene();
      state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      state.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: false
      });
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create shader material with all uniforms including Analog Decay
      state.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0.0 },
          uTime: { value: 0.0 },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
          },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: getEffectIndex(config.currentEffect) },

          // Global uniforms
          uGlobalIntensity: { value: config.globalIntensity },
          uSpeedMultiplier: { value: config.speedMultiplier },
          uColorShiftAmount: { value: config.colorShiftAmount },
          uDistortionStrength: { value: config.distortionStrength },
          uNoiseLevel: { value: config.noiseLevel },

          // Datamosh uniforms
          uDatamoshBlockSize: { value: config.datamoshBlockSize },
          uDatamoshCorruptionFreq: { value: config.datamoshCorruptionFreq },
          uDatamoshQuantization: { value: config.datamoshQuantization },
          uDatamoshDisplacement: { value: config.datamoshDisplacement },
          uDatamoshTemporal: { value: config.datamoshTemporal },

          // Pixel Sort uniforms
          uPixelSortDirection: { value: config.pixelSortDirection },
          uPixelSortThreshold: { value: config.pixelSortThreshold },
          uPixelSortBandWidth: { value: config.pixelSortBandWidth },
          uPixelSortSeparation: { value: config.pixelSortSeparation },
          uPixelSortSensitivity: { value: config.pixelSortSensitivity },

          // Digital Static uniforms
          uStaticDensity: { value: config.staticDensity },
          uStaticWaveSpeed: { value: config.staticWaveSpeed },
          uStaticAnalogNoise: { value: config.staticAnalogNoise },
          uStaticChannelShift: { value: config.staticChannelShift },
          uStaticFlicker: { value: config.staticFlicker },

          // Static Sweep uniforms
          uSweepWidth: { value: config.sweepWidth },
          uSweepLayers: { value: config.sweepLayers },
          uSweepChromaticAberration: { value: config.sweepChromaticAberration },
          uSweepEdgeGlow: { value: config.sweepEdgeGlow },
          uSweepFadeTiming: { value: config.sweepFadeTiming },

          // Glitch Wipe uniforms
          uWipeAngle: { value: config.wipeAngle },
          uWipeAberrationStrength: { value: config.wipeAberrationStrength },
          uWipeEdgeWidth: { value: config.wipeEdgeWidth },
          uWipeColorBleeding: { value: config.wipeColorBleeding },
          uWipeTransitionCurve: { value: config.wipeTransitionCurve },

          // NEW: Analog Decay uniforms
          uAnalogGrain: { value: config.analogGrain },
          uAnalogBleeding: { value: config.analogBleeding },
          uAnalogVSync: { value: config.analogVSync },
          uAnalogScanlines: { value: config.analogScanlines },
          uAnalogVignette: { value: config.analogVignette },
          uAnalogJitter: { value: config.analogJitter },
          uAnalogChroma: { value: config.analogChroma }
        },
        vertexShader,
        fragmentShader
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, state.shaderMaterial);
      state.scene.add(mesh);

      // Load textures
      for (let i = 0; i < imageCollection.length; i++) {
        try {
          const texture = await loadImageTexture(imageCollection[i]);
          state.slideTextures.push(texture);
        } catch (error) {
          console.warn(`Failed to load image ${i}:`, error);
        }
      }

      if (state.slideTextures.length >= 2) {
        state.shaderMaterial.uniforms.uTexture1.value = state.slideTextures[0];
        state.shaderMaterial.uniforms.uTexture2.value = state.slideTextures[1];
        state.shaderMaterial.uniforms.uTexture1Size.value =
          state.slideTextures[0].userData.size;
        state.shaderMaterial.uniforms.uTexture2Size.value =
          state.slideTextures[1].userData.size;
        state.texturesLoaded = true;
        state.scrollingEnabled = true;
      }

      // Render loop
      const render = () => {
        requestAnimationFrame(render);
        state.shaderMaterial.uniforms.uTime.value =
          (Date.now() - state.startTime) * 0.001;
        state.renderer.render(state.scene, state.camera);
      };
      render();
    }

    let wheelHandler: ((e: WheelEvent) => void) | null = null;
    let touchStartHandler: ((e: TouchEvent) => void) | null = null;
    let touchMoveHandler: ((e: TouchEvent) => void) | null = null;
    let touchEndHandler: (() => void) | null = null;
    let resizeHandler: (() => void) | null = null;

    function initEventListeners() {
      // Mouse wheel - only handle if slider is visible and active
      wheelHandler = (wheelEvent: WheelEvent) => {
        // Check if slider exists and is in the DOM
        if (!slider || !document.body.contains(slider)) {
          return; // Don't prevent default if slider is not active
        }
        wheelEvent.preventDefault();
        const scrollDirection = wheelEvent.deltaY > 0 ? "down" : "up";
        handleScrollInteraction(scrollDirection);
      };
      window.addEventListener("wheel", wheelHandler, { passive: false });

      // Touch events
      touchStartHandler = (touchStartEvent: TouchEvent) => {
        if (!slider) return;
        state.touchStartPosition = touchStartEvent.touches[0].clientY;
        state.isTouchActive = true;
      };
      window.addEventListener("touchstart", touchStartHandler, { passive: false });

      touchMoveHandler = (touchMoveEvent: TouchEvent) => {
        if (!slider) return;
        touchMoveEvent.preventDefault();
        if (
          !state.isTouchActive ||
          state.isTransitioning ||
          !state.scrollingEnabled
        )
          return;

        const touchCurrentPosition = touchMoveEvent.touches[0].clientY;
        const touchDifference =
          state.touchStartPosition - touchCurrentPosition;

        if (Math.abs(touchDifference) > config.touchThreshold) {
          state.isTouchActive = false;
          const swipeDirection = touchDifference > 0 ? "down" : "up";
          handleScrollInteraction(swipeDirection);
        }
      };
      window.addEventListener("touchmove", touchMoveHandler, { passive: false });

      touchEndHandler = () => {
        state.isTouchActive = false;
      };
      window.addEventListener("touchend", touchEndHandler);

      // Removed keyboard shortcuts - no controls needed

      // Resize handler
      resizeHandler = () => {
        if (state.renderer && state.shaderMaterial) {
          state.renderer.setSize(window.innerWidth, window.innerHeight);
          state.shaderMaterial.uniforms.uResolution.value.set(
            window.innerWidth,
            window.innerHeight
          );
        }
      };
      window.addEventListener("resize", resizeHandler);
    }

    // Removed helper functions for presets and reset - no controls needed

    // Initialize everything
    // Functions are defined above, this was old code

    // All functions must be defined before use
    // ... (all function definitions will be here)
    
    // Initialize everything after preloader
    const initAfterPreloader = () => {
      setTimeout(() => {
        initializeRenderer();
        initEventListeners();
      }, 100);
    };

    // Handle preloader completion - check state from ref
    const shouldShowPreloader = showPreloader;
    if (shouldShowPreloader) {
      // Preloader will call onComplete when done
      return;
    }

    initAfterPreloader();

    return () => {
      // Cleanup event listeners
      if (wheelHandler) {
        window.removeEventListener("wheel", wheelHandler);
      }
      if (touchStartHandler) {
        window.removeEventListener("touchstart", touchStartHandler);
      }
      if (touchMoveHandler) {
        window.removeEventListener("touchmove", touchMoveHandler);
      }
      if (touchEndHandler) {
        window.removeEventListener("touchend", touchEndHandler);
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      
      // Cleanup WebGL resources
      if (state.renderer) {
        state.renderer.dispose();
      }
      if (state.shaderMaterial) {
        state.shaderMaterial.dispose();
      }
      state.slideTextures.forEach((tex) => tex.dispose());
      
      // Removed Tweakpane cleanup - no settings panel
    };
  }, [slides, showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <main
      ref={sliderRef}
      className={`image-slider ${isLoaded ? 'loaded' : ''}`}
      role="region"
      aria-label="Image carousel"
      data-image-slider-init
    >
      <canvas
        ref={canvasRef}
        className="webgl-canvas"
        data-webgl-canvas
        aria-hidden="true"
      />


      <section className="featured-image" data-featured-image>
        <div className="featured-image-wrapper" data-featured-wrapper>
          <img
            src={slides[0]?.featuredImage || slides[1]?.image || slides[0]?.image}
            alt={slides[0]?.title || 'Featured image'}
          />
        </div>
      </section>

      {/* Navigation buttons */}
      <button
        className="slider-nav-button slider-nav-prev"
        onClick={() => {
          if (handleNavigationRef.current) {
            handleNavigationRef.current('up');
          }
        }}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button
        className="slider-nav-button slider-nav-next"
        onClick={() => {
          if (handleNavigationRef.current) {
            handleNavigationRef.current('down');
          }
        }}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Back button */}
      <button
        className="slider-back-button"
        onClick={() => navigate('/')}
        aria-label={t('nav.back') || 'Back to home'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>{t('nav.back') || 'Назад'}</span>
      </button>

      <header className="slide-text" data-slide-text>
        <div className="slide-number" data-slide-number>
          <span>{slides[0]?.number || '∅1'}</span>
        </div>
        <div className="slide-title" data-slide-title>
          <h1>{slides[0]?.title || ''}</h1>
        </div>
        <div className="slide-description" data-slide-description>
          <p>{slides[0]?.description || ''}</p>
        </div>
      </header>

      <div className="slide-paragraph" data-slide-paragraph>
        <div className="slide-paragraph-line" data-paragraph-line-1>
          <span>{slides[0]?.paragraphLines[0] || ''}</span>
        </div>
        <div className="slide-paragraph-line" data-paragraph-line-2>
          <span>{slides[0]?.paragraphLines[1] || ''}</span>
        </div>
      </div>
    </main>
  );
};

export default ImageSlider;