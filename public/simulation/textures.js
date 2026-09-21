/**
 * AgriSarthi Procedural Textures
 * High-resolution canvas-generated textures for realistic farm soil, tires, metal, and sky.
 * No external image downloads needed; zero CORS issues, instant loading.
 */

const TextureGenerator = {
    // 1. Loamy Agricultural Soil Texture
    createSoilTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // Base earth tone
        ctx.fillStyle = '#4a331f';
        ctx.fillRect(0, 0, 1024, 1024);

        // Noise particles & soil grains
        for (let i = 0; i < 90000; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const size = Math.random() * 2.5 + 0.8;
            const gray = Math.floor(Math.random() * 60);
            ctx.fillStyle = `rgba(${75 + gray}, ${50 + gray * 0.7}, ${30 + gray * 0.4}, ${Math.random() * 0.4 + 0.1})`;
            ctx.fillRect(x, y, size, size);
        }

        // Soil Furrow Plow Lines (subtle horizontal plowing ridges)
        for (let y = 0; y < 1024; y += 32) {
            ctx.fillStyle = 'rgba(25, 15, 8, 0.25)';
            ctx.fillRect(0, y, 1024, 8);
            ctx.fillStyle = 'rgba(95, 68, 42, 0.15)';
            ctx.fillRect(0, y + 16, 1024, 6);
        }

        // Pebbles & small clods
        for (let i = 0; i < 400; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const r = Math.random() * 5 + 2;
            ctx.fillStyle = 'rgba(30, 20, 12, 0.5)';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(120, 90, 60, 0.3)';
            ctx.beginPath();
            ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        return texture;
    },

    // 2. Soil Normal / Bump Map
    createSoilBumpMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 512, 512);

        for (let i = 0; i < 40000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const val = Math.floor(Math.random() * 180);
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        return texture;
    },

    // 3. Realistic Agricultural Tire Chevron Tread Texture
    createTireTreadTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Dark matte rubber base
        ctx.fillStyle = '#1c1c1e';
        ctx.fillRect(0, 0, 512, 512);

        // Chevron V-shaped deep tractor treads
        ctx.fillStyle = '#0a0a0c';
        ctx.strokeStyle = '#050507';
        ctx.lineWidth = 4;

        const numLugs = 16;
        const spacing = 512 / numLugs;

        for (let i = 0; i < numLugs; i++) {
            const y = i * spacing;

            // Left chevron wing
            ctx.beginPath();
            ctx.moveTo(30, y);
            ctx.lineTo(240, y + spacing * 0.7);
            ctx.lineTo(240, y + spacing * 0.95);
            ctx.lineTo(30, y + spacing * 0.25);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Right chevron wing (alternating offset)
            ctx.beginPath();
            ctx.moveTo(482, y + spacing * 0.35);
            ctx.lineTo(272, y + spacing * 1.05);
            ctx.lineTo(272, y + spacing * 1.3);
            ctx.lineTo(482, y + spacing * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 2);
        return texture;
    },

    // 4. Brushed Aluminum Texture (Chassis rails & heatsinks)
    createBrushedMetalTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#9aa0a6';
        ctx.fillRect(0, 0, 512, 512);

        // Brushed streaks
        for (let i = 0; i < 20000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const len = Math.random() * 60 + 20;
            const brightness = Math.floor(Math.random() * 80);
            ctx.strokeStyle = `rgba(${160 + brightness}, ${160 + brightness}, ${165 + brightness}, 0.15)`;
            ctx.lineWidth = Math.random() * 1.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + len, y);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    },

    // 5. Realistic Leaf Texture with Veins
    createLeafTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Leaf blade background (Vibrant green with subtle gradient)
        const grad = ctx.createLinearGradient(0, 0, 256, 0);
        grad.addColorStop(0, '#15803d');
        grad.addColorStop(0.5, '#22c55e');
        grad.addColorStop(1, '#166534');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 512);

        // Central main vein
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(128, 512);
        ctx.quadraticCurveTo(128, 256, 128, 0);
        ctx.stroke();

        // Secondary lateral veins
        ctx.lineWidth = 2.5;
        for (let y = 60; y < 480; y += 36) {
            ctx.beginPath();
            ctx.moveTo(128, y);
            ctx.quadraticCurveTo(80, y - 20, 20, y - 45);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(128, y);
            ctx.quadraticCurveTo(176, y - 20, 236, y - 45);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    },

    // 6. Natural Sky Dome with Atmospheric Gradient & Soft Clouds
    createSkyDome() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Zenith to Horizon gradient (Deep blue zenith -> warm haze horizon -> earth bounce)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 512);
        skyGrad.addColorStop(0, '#1e40af'); // Zenith deep sky
        skyGrad.addColorStop(0.35, '#38bdf8'); // Mid sky
        skyGrad.addColorStop(0.72, '#bae6fd'); // Atmospheric haze
        skyGrad.addColorStop(0.88, '#fef08a'); // Warm morning sun glow
        skyGrad.addColorStop(1.0, '#4a331f'); // Earth ground blend
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // Soft cumulus clouds on horizon
        for (let i = 0; i < 18; i++) {
            const cx = (i * 70 + Math.random() * 40) % 1024;
            const cy = 260 + Math.sin(i * 1.5) * 40;
            const r = 50 + Math.random() * 40;

            const cloudGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
            cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
            cloudGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
            cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = cloudGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
};

window.TextureGenerator = TextureGenerator;
