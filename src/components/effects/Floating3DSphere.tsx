import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Mesh, Program, Sphere, Color } from 'ogl';

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec2 uv;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    uniform float uTime;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        // Add subtle displacement
        float displacement = sin(position.x * 2.0 + uTime) * cos(position.y * 2.0 + uTime) * 0.1;
        vec3 pos = position + normal * displacement;
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform vec3 uColor;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(-vPosition);
        
        // Fresnel effect for premium glass/plasma look
        float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
        
        // Glowing transition based on time
        float noise = sin(vUv.x * 10.0 + uTime) * cos(vUv.y * 10.0 + uTime);
        vec3 baseColor = uColor + vec3(0.1, 0.2, 0.4) * noise;
        
        vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.5);
        gl_FragColor = vec4(finalColor, 0.8 + fresnel * 0.2);
    }
`;

export const Floating3DSphere: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer({ alpha: true, antialias: true });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const camera = new Camera(gl, { fov: 35 });
        camera.position.z = 5;

        const scene = new Transform();

        const geometry = new Sphere(gl, {
            radius: 1.5,
            widthSegments: 64,
            heightSegments: 64,
        });

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color('#3B82F6') },
            },
            transparent: true,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        let animationId: number;
        const resize = () => {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };

        window.addEventListener('resize', resize);
        resize();

        const update = (t: number) => {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;

            mesh.rotation.y += 0.005;
            mesh.rotation.z += 0.003;

            renderer.render({ scene, camera });
        };

        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            container.removeChild(gl.canvas);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative z-10 flex items-center justify-center opacity-0 animate-in fade-in duration-1000 fill-mode-forwards"
        />
    );
};
